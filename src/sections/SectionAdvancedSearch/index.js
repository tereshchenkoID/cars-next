"use client"

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classNames from 'classnames'

import { DEFAULT, ACTIVE } from "@/constant/config"

import { getSearch } from '@/helpers/getSearch'
import { setBrands } from '@/store/actions/brandsAction'
import { setSearch } from '@/store/actions/searchAction'

import Container from "@/components/Container"
import Checkbox from '@/components/Checkbox'
import Field from '@/components/Field'
import Button from '@/components/Button'
import Brands from '@/modules/Brands'

import style from './index.module.scss'

  // const generateTranslate = () => {
  //   const a = {}

  //   options.map((el, idx) => {
  //     let s = {
  //       "0": el.name + " PT"
  //     }

  //     el.options.map((el_o, idx_o) => {
  //       s[el_o.id] = el_o.name + " PT"
  //     })

  //     a[el.id] = s
  //   })

  //   return a
  // }

const SectionAdvancedSearch = ({ options }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const filters = useSelector((state) => state.filters)
  const search = useSelector((state) => state.search)
  const brands = useSelector((state) => state.brands)

  const generateSearchFromFilters = (filters, query) => {
    const date = {}
    const paramsObject = query ? Object.fromEntries(query.entries()) : {}
    const makes = JSON.parse(JSON.stringify(brands))

    if(query) {
      for (const [key, value] of Object.entries(paramsObject)) {
        if(key.indexOf("make") !== -1) {
          const brandId = key.replace('make_', '')

          date[key] = {
            value: value.split(',')
          }

          makes.forEach((brand) => {
            if (brand.id === brandId) {
              brand.options.forEach((option) => {
                option.selected = value.split(',').includes(option.id) ? ACTIVE : DEFAULT
              })
            }
          })
        }
      }
    }
    else {
      makes.forEach((brand) => {
        brand.options.forEach((option) => {
          option.selected = DEFAULT
        })
      })
    }

    dispatch(setBrands(makes))  

    for (const [key, value] of Object.entries(filters)) {
      const queryValue = paramsObject[key] || DEFAULT
      const queryArray = queryValue?.split(';')
      
      date[key] = {
        value: queryArray
      }
    }
  
    return date
  }

  const handleChange = (type, key, value) => {
    dispatch(setSearch(getSearch(JSON.parse(JSON.stringify(search)), type, key, value)))
  }

  useEffect(() => {
    dispatch(setSearch(generateSearchFromFilters(filters, searchParams)))
  }, [])

  return (
    <>
      <Container classes={style.block}>
        {/* <pre className={style.pre}>{JSON.stringify(generateTranslate(), null, 2)}</pre> */}
        {/* <pre className={style.pre}>{JSON.stringify(search, null, 2)}</pre> */}

        <div className={style.header}>
          <Button
            icon={'angle-left'}
            classes={['reference', 'sm']}
            placeholder={(t('back'))}
            onChange={() => router.back()}
          />
          <h2>Detailed search</h2>
        </div>

        <div className={style.wrapper}>
          <div className={style.head}>
            <h3 className={style.title}>Basic information</h3>
          </div>
          <div className={style.section}>
            <h6 className={style.subtitle}>{t('model')}</h6>
            <Brands />
          </div>
          <div className={style.section}>
            <div 
              className={
                classNames(
                  style.options,
                  style.end
                )
              }
            >
              <div>
                <h6 className={style.subtitle}>{t('filters.price.0')}</h6>
                <Field
                  type="number"
                  placeholder={t('from')}
                  data={search['price_from']?.value[0] === DEFAULT ? '' : search['price_from']?.value[0]}
                  onChange={(value) => handleChange(filters.price_from.type, 'price_from', value)}
                />
              </div>
              <Field
                type="number"
                placeholder={t('to')}
                data={search['price_to']?.value[0] === DEFAULT ? '' : search['price_to']?.value[0]}
                onChange={(value) => handleChange(filters.price_to.type, 'price_to', value)}
              />
              <div>
                <h6 className={style.subtitle}>{t('filters.mileage.0')}</h6>
                <Field
                  type="number"
                  placeholder={t('from')}
                  data={search['mileage_from']?.value[0] === DEFAULT ? '' : search['mileage_from']?.value[0]}
                  onChange={(value) => handleChange(filters.mileage_from.type, 'mileage_from', value)}
                />
              </div>
              <Field
                type="number"
                placeholder={t('to')}
                data={search['mileage_to']?.value[0] === DEFAULT ? '' : search['mileage_to']?.value[0]}
                onChange={(value) => handleChange(filters.mileage_to.type, 'mileage_to', value)}
              />
            </div>
          </div>
        </div>

        <div className={style.wrapper}>
          <div className={style.head}>
            <h3 className={style.title}>Vehicle type</h3>
          </div>
          <div className={style.section}>
            <div 
              className={
                classNames(
                  style.options,
                  style.center
                )
              }
            >
              {
                Object.entries(filters.vehicle_type.options).map(([optionKey]) => (
                  <Checkbox
                    key={optionKey}
                    classes={['image']}
                    image={
                      optionKey !== '0' 
                      ?
                        {
                          url: `/images/vehicle-type/${optionKey}.webp`,
                          width: 108,
                          height: 48,
                          alt: t(`filters.vehicle_type.${optionKey}`)
                        }
                      :
                        null
                    }
                    placeholder={optionKey === DEFAULT ? t('all') : t(`filters.vehicle_type.${optionKey}`)}
                    data={search['vehicle_type']?.value?.includes(optionKey) ? ACTIVE : DEFAULT}
                    onChange={() => handleChange(filters.vehicle_type.type, 'vehicle_type', optionKey)}
                  />
                ))
              }
            </div>
          </div>
          <div className={style.section}>
            <h6 className={style.subtitle}>{t('filters.color.0')}</h6>
            <div className={style.colors}>
              {
                Object.entries(filters.color.options).map(([optionKey, optionValue]) => (
                  <button
                    key={optionKey}
                    type="button"
                    aria-label={t(`filters.color.${optionKey}`)}
                    style={{ backgroundColor: optionValue }}
                    title={optionKey === DEFAULT ? t('all') : t(`filters.color.${optionKey}`)}
                    className={
                      classNames(
                        style.color,
                        search['color']?.value?.includes(optionKey) && style.active
                      )
                    }
                    onClick={() => handleChange(filters.color.type, 'color', optionKey)}
                  />
                ))
              }
            </div>
          </div>
        </div>

        <div className={style.wrapper}>
          <div className={style.head}>
            <h3 className={style.title}>Engine</h3>
          </div>
          <div className={style.section}>
            <h6 className={style.subtitle}>{t('filters.fuel_type.0')}</h6>
            <div className={style.list}>
              {
                Object.entries(filters.fuel_type.options).map(([optionKey]) => (
                  <Checkbox
                    key={optionKey}
                    placeholder={optionKey === DEFAULT ? t('all') : t(`filters.fuel_type.${optionKey}`)}
                    data={search['fuel_type']?.value?.includes(optionKey) ? ACTIVE : DEFAULT}
                    onChange={() => handleChange(filters.fuel_type.type, 'fuel_type', optionKey)}
                  />
                ))
              }
            </div>
          </div>
          <div className={style.section}>
            <h6 className={style.subtitle}>{t('filters.transmission.0')}</h6>
            <div className={style.list}>
              {
                Object.entries(filters.transmission.options).map(([optionKey]) => (
                  <Checkbox
                    key={optionKey}
                    placeholder={optionKey === DEFAULT ? t('all') : t(`filters.transmission.${optionKey}`)}
                    data={search['transmission']?.value?.includes(optionKey) ? ACTIVE : DEFAULT}
                    onChange={() => handleChange(filters.transmission.type, 'transmission', optionKey)}
                  />
                ))
              }
            </div>
          </div>
          <div className={style.section}>
            <h6 className={style.subtitle}>{t('filters.eco.0')}</h6>
            <div className={style.list}>
              {
                Object.entries(filters.eco.options).map(([optionKey]) => (
                  <Checkbox
                    key={optionKey}
                    placeholder={optionKey === DEFAULT ? t('all') : t(`filters.eco.${optionKey}`)}
                    data={search['eco']?.value?.includes(optionKey) ? ACTIVE : DEFAULT}
                    onChange={() => handleChange(filters.eco.type, 'eco', optionKey)}
                  />
                ))
              }
            </div>
          </div>
        </div>

        <div className={style.wrapper}>
          <div className={style.head}>
            <h3 className={style.title}>Equipment</h3>
          </div>
          {
            options.map((el, idx) =>
              <div
                key={idx}
                className={style.section}
              >
                <h6 className={style.subtitle}>{el.name}</h6>
                <div className={style.options}>
                  {
                    el.options.map((el_option, idx_option) =>
                      <Checkbox
                        key={idx_option}
                        classes={['lg']}
                        placeholder={t(`features.${el.id}.${el_option.id}`)}
                        data={search['features']?.value.includes(el_option.id) ? ACTIVE : DEFAULT}
                        onChange={() => handleChange(filters.features.type, 'features', el_option.id)}
                      />
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      </Container>
    
      <div className={style.footer}>
        <Container classes={style.container}>
          <Button
            classes={['reference']}
            placeholder={(t('reset_filters'))}
          />
          <Button
            placeholder={(t('search'))}
          />
        </Container>
      </div>
    </>
  )
}

export default SectionAdvancedSearch