"use client"

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { useModal } from '@/context/ModalContext'
import useFilters from '@/hooks/useFilters'

import classNames from 'classnames'

import { DEFAULT, TYPES } from '@/constant/config'

import { overflowBody } from '@/helpers/overflowBody'

import Container from '@/components/Container'
import Icon from '@/components/Icon'
import BrandsModal from '@/modules/BrandsModal'
import HistoryModal from '@/modules/HistoryModal'
import Skeleton from '@/modules/Skeleton'
import Card from '@/modules/Card'
import Pagination from '@/modules/Pagination'
import Filters from './Filters'
import Sort from './Sort'

import style from './index.module.scss'

const SectionsCars = ({ initialData }) => {
  const t = useTranslations()
  const filtersProps = useFilters(initialData)
  const { showModal } = useModal()
  const {
    handleChange,
    getSearchParams,
    filters,
    search,
    data,
    loading,
    searchParams
  } = filtersProps

  const [show, setShow] = useState(false)
  const [showBrand, setShowBrands] = useState(false)

  useEffect(() => {
    overflowBody(showBrand)
  }, [showBrand])

  return (
    <section className={style.block}>
      <Container classes={style.container}>
        {
          showBrand &&
          <BrandsModal
            show={showBrand}
            setShow={setShowBrands}
          />
        }
        <Filters
          show={show}
          setShow={setShow}
          filtersProps={filtersProps}
          showBrand={showBrand}
          setShowBrands={setShowBrands}
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
                  onClick={() => {
                    showModal(
                      <HistoryModal
                        type={'0'}
                        data={{
                          params: getSearchParams()
                        }}
                      />,
                      t('save_search')
                    )
                  }}
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
                          onClick={() => handleChange(filters[key].type, key, TYPES.includes(filters[key].type) ? el : DEFAULT, true)}
                        >
                          <span>
                            {
                              (key.indexOf('_to') !== -1 || key.indexOf('_from') !== -1) &&
                              <>{t(`filters.${key.split('_')[0]}.0`)} {t(key.split('_')[1])}: </>
                            }
                            {
                              key === 'page' && <>{t(`filters.${key}.0`)}: </>
                            }
                            <strong>
                              {
                                (key === 'vat_reclaimable' || key === 'discount')
                                  ?
                                  <>{t(`filters.${key}.0`)}</>
                                  :
                                  <>{filters[key].options?.[el] || el}</>
                              }
                            </strong>
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

          <h4>{t('verified_cars')}</h4>
          {/* <pre className={style.pre}>{JSON.stringify(search, null, 2)}</pre> */}

          <div className={style.meta}>
            <Sort filtersProps={filtersProps} />
            {
              data?.data?.length > 0 &&
              <Pagination filtersProps={filtersProps} />
            }
          </div>
          {
            data.data
              ?
              <>
                <div className={style.cards}>
                  {
                    data?.data?.map((el, idx) =>
                      loading
                        ?
                        <Skeleton key={idx} />
                        :
                        <Card
                          key={idx}
                          data={el}
                        />
                    )
                  }
                </div>
                <Pagination filtersProps={filtersProps} />
              </>
              :
              <div className={style.empty}>
                <h6>Whoops!</h6>
                <p>None of our cars matches your search parameters.</p>
              </div>
          }
        </div>
      </Container>
    </section>
  )
}

export default SectionsCars
