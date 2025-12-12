"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from 'context/ModalContext'

import { DEFAULT, TYPES } from 'constant/config'

import { useFilters } from 'hooks/useFilters'
import { useAuth } from 'hooks/useAuth'

import Button from 'components/Button'
import Container from 'components/Container'
import Pagination from 'modules/Pagination'
import BrandsModal from 'modules/Modals/BrandsModal'
import HistoryModal from 'modules/Modals/HistoryModal'
import LoginModal from 'modules/Modals/LoginModal'
import VehicleCard from 'modules/Cards/VehicleCard'
import Filters from './Filters'
import Sort from './Sort'

import style from './index.module.scss'

const getLastPart = (key) => {
  const parts = key.split('_')
  return parts[parts.length - 1]
}

const formatPlaceholderText = (key, el, filters, t) => {
  let prefix = ''

  if (key.endsWith('_to') || key.endsWith('_from')) {
    const base = key.split('_').slice(0, -1).join('_')
    const last = getLastPart(key)

    prefix = `${t(`filters.${base}.0`)} ${t(last)}: `
  }

  if (key === 'page' || key === 'doors' || key === 'seats') {
    prefix = `${t(`filters.${key}.0`)}: `
  }

  const value = (key === 'vat_reclaimable' || key === 'discount')
    ? t(`filters.${key}.0`)
    : filters[key].options?.[el] || el

  return `${prefix}${value}`
}

const SectionsCars = ({ initialData }) => {
  const t = useTranslations()
  const filtersProps = useFilters(initialData)
  const { isAuth } = useAuth()
  const { showModal } = useModal()
  const {
    handleChange,
    handleReset,
    getSearchParams,
    filters,
    search,
    data,
    loading,
    searchParams
  } = filtersProps

  const [show, setShow] = useState(false)
  const [showBrand, setShowBrands] = useState(false)

  const handleSaveSearch = () => {
    if (isAuth) {
      showModal(
        <HistoryModal
          type={'0'}
          data={{
            params: getSearchParams()
          }}
        />,
        t('save_search')
      )
    }
    else {
      showModal(<LoginModal />)
    }
  }

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
            <Button
              classes={['primary', 'xs', style.toggle]}
              icon={'sliders'}
              placeholder={t('filter')}
              onChange={() => setShow(!show)}
            />
            {
              searchParams.size > 0 &&
              <div className={style.list}>
                <Button
                  classes={['gold', 'xs']}
                  icon={'bell'}
                  placeholder={t('save_search')}
                  onChange={handleSaveSearch}
                />
                {
                  Object.entries(search)
                  .filter(([key]) => !key.includes('make'))
                  .flatMap(([key, item]) =>
                    item?.value
                      .filter((v) => v !== DEFAULT)
                      .map((el, idx) => (
                        <Button
                          key={`${key}-${idx}`}
                          classes={['blue', 'xs', 'reverse']}
                          icon="xmark"
                          placeholder={formatPlaceholderText(key, el, filters, t)}
                          onChange={() => handleChange(filters[key].type, key, TYPES.includes(filters[key].type) ? el : DEFAULT, true)}
                        />
                      ))
                  )
                }
              </div>
            }
          </div>

          <h4>{t('verified_cars')}</h4>
          <div className={style.meta}>
            <Sort filtersProps={filtersProps} />
            <Pagination filtersProps={filtersProps} />
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
                  <h6>{t('notification.whoops')}</h6>
                  <p>{t('notification.not_found_car')}</p>
                  <Button
                    classes={['reference', 'sm']}
                    placeholder={t('actions.reset_filters')}
                    onChange={handleReset}
                  />
                </div>
          }
        </div>
      </Container>
    </section>
  )
}

export default SectionsCars
