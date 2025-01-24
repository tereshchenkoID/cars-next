import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { DEFAULT, NAVIGATION } from '@/constant/config'

import classNames from 'classnames'

import { overflowBody } from '@/helpers/overflowBody'
import { getYears } from '@/helpers/getYears'

import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Select from '@/components/Select'
import Reference from '@/components/Reference'
import Checkbox from '@/components/Checkbox'
import Backdrop from '@/modules/Backdrop'
import Brands from '@/modules/Brands'
import FiltersMultiSelect from '@/modules/FiltersMultiSelect'
import FiltersColorSelect from '@/modules/FiltersColorSelect'
import History from './History'
import Saved from './Saved'

import style from './index.module.scss'

const TABS = [
  { icon: "sliders", text: "all" },
  { icon: "bookmark", text: "saved" },
  { icon: "history", text: "history" }
]

const Filters = ({
  show,
  setShow,
  filtersProps,
  showBrand,
  setShowBrands
}) => {
  const t = useTranslations()
  const [active, setActive] = useState(0)
  const {
    handleLoad,
    handleChange,
    handleReset,
    filters,
    search,
    searchParams,
  } = filtersProps

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
          setShow(false)
          handleLoad(0)
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
              (searchParams.size > 0 && active === 0) &&
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
                <Brands
                  show={showBrand}
                  setShow={setShowBrands}
                  isWide={true}
                />
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.state.0')}</h6>
                <div className={style.wrapper}>
                  <Select
                    id={'select_state'}
                    options={
                      Object.entries(filters.state.options).map(([optionKey, _]) => ({
                        value: optionKey,
                        label: optionKey === DEFAULT ? t('all') : t(`filters.state.${optionKey}`),
                      }))
                    }
                    data={search.state?.value[0] || DEFAULT}
                    onChange={(value) => handleChange('select', 'state', value)}
                  />
                </div>
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.price.0')}</h6>
                <div
                  className={style.wrapper}
                  style={{
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  }}
                >
                  <Field
                    type={"number"}
                    placeholder={t('from')}
                    data={search.price_from?.value[0] !== DEFAULT ? search.price_from?.value[0] : ''}
                    onChange={(value) => handleChange('field', 'price_from', value)}
                  />
                  <Field
                    type={"number"}
                    placeholder={t('to')}
                    data={search.price_to?.value[0] !== DEFAULT ? search.price_to?.value[0] : ''}
                    onChange={(value) => handleChange('field', 'price_to', value)}
                  />
                </div>
              </div>

              <div className={style.section}>
                <Checkbox
                  placeholder={t('filters.vat_reclaimable.0')}
                  data={search.vat_reclaimable?.value[0]}
                  onChange={(value) => handleChange('select', 'vat_reclaimable', value)}
                />
              </div>
              <div className={style.section}>
                <Checkbox
                  placeholder={t('filters.discount.0')}
                  data={search.discount?.value[0]}
                  onChange={(value) => handleChange('select', 'discount', value)}
                />
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.category.0')}</h6>
                <FiltersMultiSelect
                  placeholder={'category'}
                  options={filters.category.options}
                  data={search.category}
                  onChange={handleChange}
                />
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.body.0')}</h6>
                <FiltersMultiSelect
                  placeholder={'body'}
                  options={filters.body.options}
                  data={search.body}
                  onChange={handleChange}
                />
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.mileage.0')}</h6>
                <div
                  className={style.wrapper}
                  style={{
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  }}
                >
                  <Field
                    type={"number"}
                    placeholder={t('from')}
                    data={search.mileage_from?.value[0] !== DEFAULT ? search.mileage_from?.value[0] : ''}
                    onChange={(value) => handleChange('field', 'mileage_from', value)}
                  />
                  <Field
                    type={"number"}
                    placeholder={t('to')}
                    data={search.mileage_to?.value[0] !== DEFAULT ? search.mileage_to?.value[0] : ''}
                    onChange={(value) => handleChange('field', 'mileage_to', value)}
                  />
                </div>
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.year.0')}</h6>
                <div
                  className={style.wrapper}
                  style={{
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  }}
                >
                  <Select
                    id={'select_year_from'}
                    options={
                      getYears().map(year => ({
                        value: year === DEFAULT ? DEFAULT : year,
                        label: year === DEFAULT ? t('from') : year,
                      }))
                    }
                    data={search.year_from?.value[0] || DEFAULT}
                    onChange={(value) => handleChange('select', 'year_from', value)}
                  />
                  <Select
                    id={'select_year_to'}
                    options={
                      getYears().map(year => ({
                        value: year === DEFAULT ? DEFAULT : year,
                        label: year === DEFAULT ? t('to') : year,
                      }))
                    }
                    data={search.year_to?.value[0] || DEFAULT}
                    onChange={(value) => handleChange('select', 'year_to', value)}
                  />
                </div>
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.fuel_type.0')}</h6>
                <FiltersMultiSelect
                  placeholder={'fuel_type'}
                  options={filters.fuel_type.options}
                  data={search.fuel_type}
                  onChange={handleChange}
                />
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.transmission.0')}</h6>
                <FiltersMultiSelect
                  placeholder={'transmission'}
                  options={filters.transmission.options}
                  data={search.transmission}
                  onChange={handleChange}
                />
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.eco.0')}</h6>
                <FiltersMultiSelect
                  placeholder={'eco'}
                  options={filters.eco.options}
                  data={search.eco}
                  onChange={handleChange}
                />
              </div>

              <div className={style.section}>
                <h6 className={style.subtitle}>{t('filters.color.0')}</h6>
                <FiltersColorSelect
                  placeholder={'color'}
                  options={filters.color.options}
                  data={search.color}
                  onChange={handleChange}
                />
              </div>
            </>
          }

          {
            active === 1 &&
            <Saved 
              filtersProps={filtersProps} 
              setActive={setActive}
              setShow={setShow}
            />
          }

          {
            active === 2 &&
            <History 
              filtersProps={filtersProps} 
              setActive={setActive}
              setShow={setShow}
            />
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
