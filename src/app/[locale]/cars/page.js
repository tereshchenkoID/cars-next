"use client"

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWindowWidth } from '@/context/WindowWidthContext'

import classNames from 'classnames'

import { getSearch } from '@/helpers/getSearch'
import { setSearch } from '@/store/actions/searchAction'

import { DEFAULT, TYPES, BREAKPOINTS } from '@/constant/config'

import Icon from '@/components/Icon'
import Card from '@/modules/Card'
import Sort from '@/modules/Sort'
import Filters from '@/modules/Filters'
import Pagination from '@/modules/Pagination'

import style from './index.module.scss'

const Cars = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { windowWidth } = useWindowWidth()
  const searchParams = useSearchParams()
  const filters = useSelector((state) => state.filters)
  const search = useSelector((state) => state.search)
  const [show, setShow] = useState(false)
  const isMobile = windowWidth < BREAKPOINTS.lg

  const handleRemove = (type, key, value) => {
    dispatch(setSearch(getSearch(JSON.parse(JSON.stringify(search)), type, key, TYPES.includes(type) ? value : DEFAULT)))
  }

  return (
    <div className={style.block}>
      <Filters
        show={show}
        setShow={setShow}
      />
      <div className={style.content}>
        <div className={style.searches}>
          {
            isMobile &&
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
          }
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
        <div className={style.meta}>
          <Sort />
          {
            !isMobile &&
            <Pagination />
          }
        </div>

        <div className={style.cards}>
          <Card />
          <Card />
        </div>

        {/* <pre className={style.pre}>{JSON.stringify(search, null, 2)}</pre> */}
      </div>
    </div>
  )
}

export default Cars
