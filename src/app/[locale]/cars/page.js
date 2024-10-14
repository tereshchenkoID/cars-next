"use client"

import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classNames from 'classnames'

import { ACTIVE, DEFAULT, NAVIGATION } from '@/constant/config'

import { setBrands } from '@/store/actions/brandsAction'
import { setSearch } from '@/store/actions/searchAction'

import Button from '@/components/Button'
import Field from '@/components/Field'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import Reference from '@/components/Reference'
import Icon from '@/components/Icon'
import Brands from '@/modules/Brands'
import Card from '@/modules/Card'
import Sort from '@/modules/Sort'
import Pagination from '@/modules/Pagination'

import style from './index.module.scss'

const TYPES = ["checkbox", "color"]
const TABS = [
  { icon: "sliders", text: "all" },
  { icon: "bookmark", text: "saved" },
  { icon: "history", text: "history" }
]

const Cars = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const filters = useSelector((state) => state.filters)
  const search = useSelector((state) => state.search)
  const brands = useSelector((state) => state.brands)
  const [active, setActive] = useState(0)

  const groupedFilters = {}
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString())
  years.unshift(DEFAULT)

  Object.keys(filters).forEach((key) => {
    const group = filters[key].group || key
    if (!groupedFilters[group]) {
      groupedFilters[group] = []
    }
    groupedFilters[group].push({ key, filter: filters[key].visible === ACTIVE ? filters[key] : null })
  })

  const generateParams = () => {
    const params = new URLSearchParams()

    brands.forEach((brand) => {
      let selectedOptions = brand.options
        .filter(option => option.selected === ACTIVE)
        .map(option => option.id)
  
      if (selectedOptions.includes(DEFAULT)) {
        selectedOptions = [DEFAULT]
      }
  
      if (selectedOptions.length > 0) {
        params.append(`make_${brand.id}`, selectedOptions)
      }
    })
  
    Object.keys(search).forEach((key) => {
      if(key.indexOf("make") === -1) {
        const filterValue = search[key]?.value;
        if (filterValue && filterValue.length > 0 && filterValue[0] !== DEFAULT) {
          params.append(key, filterValue.join(';'))
        }
      }
    })
  
    return params.toString()
  }

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
      const queryValue = paramsObject[key]

      date[key] = {
        value: queryValue ? queryValue.split(';') : value.default || [DEFAULT]
      }
    }
  
    return date
  }

  const handleChange = (type, key, value) => {
    const updatedFilters = JSON.parse(JSON.stringify(search))

    if (TYPES.includes(type)) {
      if (value === DEFAULT) {
        updatedFilters[key].value = [DEFAULT]
      } else {
        if (updatedFilters[key].value.includes(DEFAULT)) {
          updatedFilters[key].value = []
        }

        if (updatedFilters[key].value.includes(value)) {
          updatedFilters[key].value = updatedFilters[key].value.filter(item => item !== value)
        } else {
          updatedFilters[key].value = [...updatedFilters[key].value, value]
        }
      }

      if (updatedFilters[key].value.length === 0) {
        updatedFilters[key].value = [DEFAULT]
      }
    } else {
      const lastIndex = updatedFilters[key].value.length - 1

      if (value.length === 0) {
        updatedFilters[key].value[lastIndex] = DEFAULT
      } else {
        updatedFilters[key].value[lastIndex] = value
      }
    }

    dispatch(setSearch(updatedFilters))
  }

  const handleRemove = (type, key, value) => {
    handleChange(type, key, TYPES.includes(type) ? value : DEFAULT)
  }

  const handleReset = () => {
    dispatch(setSearch(generateSearchFromFilters(filters, null)))
  }

  useEffect(() => {
    dispatch(setSearch(generateSearchFromFilters(filters, searchParams)))
  }, [])

  useEffect(() => {
    router.push(`?${generateParams()}`, { scroll: false })
  }, [search])

  return (
    <div className={style.block}>
      <div className={style.filter}>
        <div className={style.header}>
          <div className={style.title}>
            <h6>{t('filter')}</h6>
            {
              searchParams.size > 0 &&
              <Button
                icon={'trash'}
                classes={['secondary', 'square', 'sm']}
                onChange={handleReset}
                title={t('remove')}
              />
            }
          </div>
          <div className={style.tab}>
            {
              TABS.map((el, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={t(el.text)}
                  title={t(el.text)}
                  className={classNames(style.option, active === idx && style.active)}
                  onClick={() => setActive(idx)}
                >
                  <Icon 
                    iconName={el.icon} 
                    width={24} 
                    height={24} 
                  />
                  <span className={style.label}>{t(el.text)}</span>
                </button>
              ))
            }
          </div>
        </div>
        <div className={style.content}>
          <div className={style.section}>
            <h6 className={style.subtitle}>{t('model')}</h6>
            <Brands />
          </div>
          {
            Object.keys(groupedFilters).map((group) => (
              <div
                key={group}
                className={style.section}
              >
                <h6 className={style.subtitle}>{t(`filters.${groupedFilters[group][0].key.split('_')[0]}.0`)}</h6>
                <div 
                  className={style.wrapper}
                  style={{
                    gridTemplateColumns: `repeat(${groupedFilters[group].length}, 1fr)`,
                  }}
                >
                  {
                    groupedFilters[group].map(({ key, filter }) => (
                      filter &&
                      <div
                        key={key}
                        className={style.wrapper}
                      >
                        {
                          key.split('_').length > 1 &&
                          <p className={style.label}>{t(key.split('_')[1])}:</p>
                        }

                        {filter.type === "select" && (
                          <div className={style.list}>
                            <Select
                              id={`select_${key}`}
                              options={
                                key.includes('year')
                                  ? 
                                    years.map(year => ({
                                      value: year === DEFAULT ? DEFAULT : year,
                                      label: year === DEFAULT ? t('all') : year,
                                    }))
                                  : 
                                    Object.entries(filter.options).map(([optionKey, optionValue]) => ({
                                        value: optionKey,
                                        label: optionKey === DEFAULT ? t('all') : (filter.translation === DEFAULT ? optionValue : t(`filters.${key}.${optionKey}`)),
                                      })
                                    )
                              }
                              data={search[key]?.value?.[search[key]?.value?.length - 1] || DEFAULT}
                              onChange={(value) => handleChange(filter.type, key, value)}
                            />
                          </div>
                        )}

                        {filter.type === "field" && (
                          <div className={style.grid}>
                            <Field
                              type="number"
                              placeholder={t('all')}
                              data={
                                search[key]?.value?.[search[key]?.value?.length - 1] === DEFAULT
                                  ? ''
                                  : search[key]?.value?.[search[key]?.value?.length - 1] || ''
                              }
                              onChange={(value) => handleChange(filter.type, key, value)}
                            />
                          </div>
                        )}

                        {filter.type === "checkbox" && (
                          <div className={style.list}>
                            {
                              Object.entries(filter.options).map(([optionKey, optionValue]) => (
                                <Checkbox
                                  key={optionKey}
                                  placeholder={optionKey === DEFAULT ? t('all') : t(`filters.${key}.${optionKey}`)}
                                  data={search[key]?.value?.includes(optionKey) ? ACTIVE : DEFAULT}
                                  onChange={() => handleChange(filter.type, key, optionKey)}
                                />
                              ))
                            }
                          </div>
                        )}

                        {filter.type === "color" && (
                          <div className={style.colors}>
                            {
                              Object.entries(filter.options).map(([optionKey, optionValue]) => (
                                <button
                                  key={optionKey}
                                  type="button"
                                  aria-label={t(`filters.${key}.${optionKey}`)}
                                  style={{ backgroundColor: optionValue }}
                                  title={optionKey === DEFAULT ? t('all') : t(`filters.${key}.${optionKey}`)}
                                  className={
                                    classNames(
                                      style.color,
                                      search[key]?.value?.includes(optionKey) && style.active
                                    )
                                  }
                                  onClick={() => handleChange(filter.type, key, optionKey)}
                                />
                              ))
                            }
                          </div>
                        )}
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
        <div className={style.footer}>
          <Button 
            classes={['primary', 'wide']} 
            placeholder={t('search')} 
          />
          <Reference 
            link={NAVIGATION.buy.link} 
            classes={['alt', 'wide']} 
            placeholder={t('detailed_search')} 
          />
        </div>
      </div>

      <div className={style.content}>
        {
          searchParams.size > 0 &&
          <div className={style.searches}>
            <button
              type="button"
              className={
                classNames(
                  style.search,
                  style.gold
                )
              }
              aria-label={t('save_search')}
              title={t('save_search')}
            >
              <Icon 
                iconName="bell" 
                className={style.close} 
                width={16} 
                height={16} 
              />
              <span>{t('save_search')}</span>
            </button>
            {
              Object.keys(search)?.map((key) =>
                !key.includes('make') &&
                search[key]?.value?.map((el, idx) =>
                  el !== DEFAULT && (
                    <button
                      key={idx}
                      type="button"
                      className={style.search}
                      aria-label={key}
                      title={t('remove')}
                      onClick={() => handleRemove(filters[key].type, key, el)}
                    >
                      <span>
                        {
                          key.indexOf('to') !== -1 || key.indexOf('from') !== -1
                          ?
                            <>{t(`filters.${key.split('_')[0]}.0`)} {t(key.split('_')[1])}</>
                          :
                            t(`filters.${key}.0`)
                        }
                        : <strong>{filters[key].options?.[el] || el}</strong>
                      </span>
                      <Icon 
                        iconName="xmark" 
                        className={style.close} 
                        width={12} 
                        height={12} 
                      />
                    </button>
                  )
                )
              )
            }
          </div>
        }

        <h4>Verified cars</h4>
        <div className={style.meta}>
          <Sort />
          <Pagination />
        </div>

        <div className={style.cards}>
          <Card />
        </div>

        {/* <pre className={style.pre}>{JSON.stringify(search, null, 2)}</pre> */}
      </div>
    </div>
  )
}

export default Cars
