"use client"

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { useModal } from 'context/ModalContext'
import useFilters from 'hooks/useFilters'

import classNames from 'classnames'

import { DEFAULT, TYPES } from 'constant/config'

import { overflowBody } from 'helpers/overflowBody'

import Container from 'components/Container'
import Icon from 'components/Icon'
import Pagination from 'modules/Pagination'
import BrandsModal from 'modules/Modals/BrandsModal'
import HistoryModal from 'modules/Modals/HistoryModal'
import VehicleCard from 'modules/Cards/VehicleCard'
import Filters from './Filters'
import Sort from './Sort'

import style from './index.module.scss'

const TYPE = {
  state: 'select',
  vat_reclaimable: 'select',
  discount: 'select',
  year_from: 'select',
  year_to: 'select',
  price_from: 'field',
  price_to: 'field',
  mileage_from: 'field',
  mileage_to: 'field',
  category: 'checkbox',
  body: 'checkbox',
  fuel_type: 'checkbox',
  transmission: 'checkbox',
  eco: 'checkbox',
  color: 'color'
}

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
          loading={loading}
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
                          onClick={() => handleChange(TYPE[key], key, TYPES.includes(TYPE[key]) ? el : DEFAULT, true)}
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
          {/* <pre className={style.pre}>{JSON.stringify(search.color, null, 2)}</pre> */}

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
                        <VehicleCard
                          key={idx}
                          data={el}
                          isLoading={loading}
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
