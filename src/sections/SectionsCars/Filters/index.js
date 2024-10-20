import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { 
  ACTIVE, 
  DEFAULT, 
  NAVIGATION,
} from '@/constant/config'

import classNames from 'classnames'

import { getSearch } from '@/helpers/getSearch'
import { overflowBody } from '@/helpers/overflowBody'
import { setBrands } from '@/store/actions/brandsAction'
import { setSearch } from '@/store/actions/searchAction'

import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import Reference from '@/components/Reference'
import Backdrop from '@/modules/Backdrop'
import SavedCard from './SavedCard'
import Brands from './Brands'

import style from './index.module.scss'

const TABS = [
  { icon: "sliders", text: "all" },
  { icon: "bookmark", text: "saved" },
  { icon: "history", text: "history" }
]

const Filters = ({ show, setShow, handleLoad }) => {
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
    if(filters[key].visible === ACTIVE) {
      const group = filters[key].group || key
      if (!groupedFilters[group]) {
        groupedFilters[group] = []
      }

      groupedFilters[group].push({ key, filter: filters[key] })
    }
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

  const handleReset = () => {
    dispatch(setSearch(generateSearchFromFilters(filters, null)))
  }

  useEffect(() => {
    dispatch(setSearch(generateSearchFromFilters(filters, searchParams)))
  }, [])

  useEffect(() => {
    router.push(`?${generateParams()}`, { scroll: false })
  }, [search])

  useEffect(() => {
    overflowBody(show)
  }, [show])

  return (
    <>
      {
        show &&
        <Backdrop onChange={() => setShow(false)} />
      }
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          handleLoad()
        }}
        className={
          classNames(
            style.block,
            show && style.active
          )
        }
      >
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
          {
            active === 0 &&
            <>
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
            </>
          }

          {
            active === 1 &&
            <SavedCard isExists={true} />
          }

          {
            active === 2 &&
            <SavedCard isExists={false} />
          }
        </div>
        {
          active === 0 &&
          <div className={style.footer}>
            <Button
              type={"submit"}
              classes={['primary', 'wide']}
              placeholder={t('search')}
            />
            <Reference
              link={NAVIGATION.advanced_search.link}
              classes={['alt', 'wide']}
              placeholder={t(NAVIGATION.advanced_search.text)}
            />
          </div>
        }
      </form>
    </>
  )
}

export default Filters
