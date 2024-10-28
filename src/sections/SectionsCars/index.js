"use client"

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classNames from 'classnames'

import { postData } from '@/helpers/api'
import { getSearch } from '@/helpers/getSearch'
import { setSearch } from '@/store/actions/searchAction'
import { setToastify } from '@/store/actions/toastifyAction'

import { DEFAULT, TYPES } from '@/constant/config'

import Container from '@/components/Container'
import Icon from '@/components/Icon'
import Pagination from './Pagination'
import Filters from './Filters'
import Card from './Card'
import Sort from './Sort'

import style from './index.module.scss'

const SectionsCars = ({ initialData }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const filters = useSelector((state) => state.filters)
  const search = useSelector((state) => state.search)
  const [data, setData] = useState(initialData)
  const [show, setShow] = useState(false)
  const [pagination, setPagination] = useState({
    page: initialData.page,
    pages: initialData.pages,
    quantity: initialData.quantity,
    results: initialData.results,
  })

  const handleLoad = (page) => {
    setShow(false)

    const formData = new FormData()
    formData.append('data', JSON.stringify(search))
    formData.append('page', page)

    postData('filters/search/', formData).then(json => {
      if (json) {
        setData(json)
        setPagination({
          page: json.page,
          pages: json.pages,
          quantity: json.quantity,
          results: json.results,
        })
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          })
        )
      }
    })
  }

  const handlePagination = (fieldName, fieldValue) => {
    setPagination(prevPagination => ({
      ...prevPagination,
      [fieldName]: fieldValue,
    }))
    handleLoad(fieldValue)
  }

  const handlePrev = () => {
    const prev = pagination.page > 0 ? pagination.page - 1 : 0
    // handlePagination('page', prev)

    let a = JSON.parse(JSON.stringify(search))
    a = {
      ...a,
      page: {
        value: [
          prev
        ]
      }
    }

    dispatch(setSearch(a))
    handlePagination('page', prev)
  }

  const handleNext = () => {
    const next = pagination.page < pagination.pages ? pagination.page + 1 : pagination.pages

    let a = JSON.parse(JSON.stringify(search))
    a = {
      ...a,
      page: {
        value: [
          next
        ]
      }
    }

    dispatch(setSearch(a))
    handlePagination('page', next)
  }

  const handleRemove = (type, key, value) => {
    dispatch(setSearch(getSearch(JSON.parse(JSON.stringify(search)), type, key, TYPES.includes(type) ? value : DEFAULT)))

    if(key === 'page') {
      console.log(value)
      handlePagination('page', 0)
    }
  }

  return (
    <Container>
      <div className={style.block}>
        <Filters
          show={show}
          setShow={setShow}
          handleLoad={handleLoad}
        />
        <div className={style.content}>
          <div className={style.searches}>
            <button
              type="button"
              className={
                classNames(
                  style.search,
                  style.blue
                )
              }
              onClick={() => setShow(!show)}
              aria-label={t('filter')}
              title={t('filter')}
            >
              <Icon
                iconName="filters"
                width={14}
                height={14}
              />
              <span>{t('filter')}</span>
            </button>
            {
              searchParams.size > 0 &&
              <div className={style.list}>
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
          </div>

          <h4>Verified cars</h4>
          {/* <pre className={style.pre}>{JSON.stringify(search, null, 2)}</pre> */}

          <div className={style.meta}>
            <Sort 
              pagination={pagination} 
              handleLoad={() => handleLoad()}
            />
            {
              data?.data?.length > 0 &&
              <Pagination
                pagination={pagination}
                handlePrev={() => handlePrev()}
                handleNext={() => handleNext()}
              />
            }
          </div>

          <div className={style.cards}>
            {
              data?.data?.map((el, idx) =>
                <Card
                  key={idx}
                  data={el}
                />
              )
            }
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SectionsCars
