"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { DEFAULT, ACTIVE, NAVIGATION } from "constant/config"

import classNames from 'classnames'

import useFilters from 'hooks/useFilters'
import { getYears } from 'helpers/getYears'

import Button from 'components/Button'
import Reference from 'components/Reference'
import Container from "components/Container"
import Checkbox from 'components/Checkbox'
import Label from 'components/Label'
import Field from 'components/Field'
import Select from 'components/Select'
import Brands from 'modules/Brands'
import BrandsModal from 'modules/BrandsModal'

import style from './index.module.scss'

const SectionAdvancedSearch = ({ options }) => {
  const t = useTranslations()
  const {
    handleChange,
    handleReset,
    auth,
    filters,
    search,
  } = useFilters()
  const [showBrand, setShowBrands] = useState(false)

  return (
    <>
      <section className={style.block}>
        <Container classes={style.container}>
          {/* <pre className={style.pre}>{JSON.stringify(generateTranslate(), null, 2)}</pre> */}
          {/* <pre className={style.pre}>{JSON.stringify(search, null, 2)}</pre> */}

          {
            showBrand &&
            <BrandsModal
              show={showBrand}
              setShow={setShowBrands}
            />
          }

          <div className={style.header}>
            <Reference
              link={NAVIGATION.buy.link}
              icon={'angle-left'}
              classes={['reference', 'sm', style.back]}
              placeholder={(t('actions.back'))}
            />
            <h1>{t('detailed_search')}</h1>
          </div>

          <div className={style.wrapper}>
            <div className={style.head}>
              <h3 className={style.title}>{t('basic_info')}</h3>
            </div>
            <div className={style.section}>
              <Label data={t('model')} />
              <Brands
                show={showBrand}
                setShow={setShowBrands}
              />
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
                  <Label data={t('filters.state.0')} />
                  <Select
                    id={`select_state`}
                    options={
                      Object.entries(filters.state.options).map(([optionKey, optionValue]) => ({
                        value: optionKey,
                        label: optionKey === DEFAULT ? t('all') : (filters.translation === DEFAULT ? optionValue : t(`filters.state.${optionKey}`)),
                      }))
                    }
                    data={search['state']?.value[0] || DEFAULT}
                    onChange={(value) => handleChange(filters.state, 'state', value)}
                  />
                </div>
                <div>
                  <Label data={t('filters.category.0')} />
                  <Select
                    id={`select_category`}
                    options={
                      Object.entries(filters.category.options).map(([optionKey, optionValue]) => ({
                        value: optionKey,
                        label: optionKey === DEFAULT ? t('all') : (filters.translation === DEFAULT ? optionValue : t(`filters.category.${optionKey}`)),
                      }))
                    }
                    data={search['category']?.value[0] || DEFAULT}
                    onChange={(value) => handleChange(filters.category, 'category', value)}
                  />
                </div>
              </div>
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
                  <Label data={`${t('filters.price.0')} (${auth?.account?.currency?.code || '$'})`} />
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
                  <Label data={t('filters.mileage.0')} />
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
                  <Label data={t('filters.year.0')} />
                  <Select
                    id={`select_year_from`}
                    options={
                      getYears().map(year => ({
                        value: year === DEFAULT ? DEFAULT : year,
                        label: year === DEFAULT ? t('from') : year,
                      }))
                    }
                    data={search['year_from']?.value[0] || DEFAULT}
                    onChange={(value) => handleChange(filters.year_from, 'year_from', value)}
                  />
                </div>
                <Select
                  id={`select_year_to`}
                  options={
                    getYears().map(year => ({
                      value: year === DEFAULT ? DEFAULT : year,
                      label: year === DEFAULT ? t('to') : year,
                    }))
                  }
                  data={search['year_to']?.value[0] || DEFAULT}
                  onChange={(value) => handleChange(filters.year_to, 'year_to', value)}
                />
              </div>
            </div>
          </div>

          <div className={style.wrapper}>
            <div className={style.head}>
              <h3 className={style.title}>{t('filters.body.0')}</h3>
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
                  Object.entries(filters.body.options).map(([optionKey]) => (
                    (optionKey !== '0' && optionKey !== '5') &&
                    <Checkbox
                      key={optionKey}
                      classes={['image']}
                      image={{
                        url: `/images/body/${optionKey}.webp`,
                        width: 108,
                        height: 48,
                        alt: t(`filters.body.${optionKey}`)
                      }}
                      placeholder={optionKey === DEFAULT ? t('all') : t(`filters.body.${optionKey}`)}
                      data={search['body']?.value?.includes(optionKey) ? ACTIVE : DEFAULT}
                      onChange={() => handleChange(filters.body.type, 'body', optionKey)}
                    />
                  ))
                }
              </div>
            </div>
            <div className={style.section}>
              <Label data={t('filters.color.0')} />
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
              <h3 className={style.title}>{t('engine')}</h3>
            </div>
            <div className={style.section}>
              <Label data={t('filters.fuel_type.0')} />
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
              <Label data={t('filters.transmission.0')} />
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
              <Label data={t('filters.eco.0')} />
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
              <h3 className={style.title}>{t('equipment')}</h3>
            </div>
            {
              options.map((el, idx) =>
                <div
                  key={idx}
                  className={style.section}
                >
                  <Label data={t(`features.${el.id}.0`)} />
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
      </section>
      <section className={style.footer}>
        <Container classes={style.nav}>
          <Button
            classes={['reference']}
            placeholder={(t('reset_filters'))}
            onChange={() => handleReset()}
          />
          <Button
            placeholder={(t('search'))}
          />
        </Container>
      </section>
    </>
  )
}

export default SectionAdvancedSearch
