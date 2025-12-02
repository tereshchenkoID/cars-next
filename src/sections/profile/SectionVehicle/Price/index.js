import { useState } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { DEFAULT } from 'constant/config'

import { useSettingsStore } from 'stores/settingsStore'
import { useFiltersStore } from 'stores/filtersStore'

import { useAuth } from 'hooks/useAuth'
import { getFormatPrice } from 'helpers/getFormatPrice'

import Button from 'components/Button'
import Field from 'components/Field'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Accordion from 'modules/Accordion'
import Comparison from 'modules/Comparison'

import style from '../index.module.scss'

const Price = ({ filter, handlePropsChange, isDisable, handleSave }) => {
  const t = useTranslations()
  const { auth } = useAuth()
  const { settings } = useSettingsStore()
  const { filters} = useFiltersStore()

  const [toggle, setToggle] = useState(false)
  const [vat, setVat] = useState("0")

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'file'}
      placeholder={t('price')}
      isDisabled={isDisable}
    >
      <form
        className={style.grid}
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
      >
        <div
          className={
            classNames(
              style.list,
              style.bottom
            )
          }
        >
          <div className={style.row}>
            <Field
              type={'number'}
              placeholder={t('price')}
              data={filter.price_data.price}
              onChange={(value) => handlePropsChange('price.price_data.price', value)}
              isRequired={true}
              isLabel={true}
            />
            <Select
              id={`select_currency`}
              options={
                settings?.currencies?.map(item => ({
                  value: item.code,
                  label: item.code,
                }))
              }
              data={filter.currency.code || DEFAULT}
              onChange={(value) => {
                const selected = settings?.currencies?.find(c => c.code === value)
                handlePropsChange('price.currency', { code: value, text: selected.text, symbol: selected.symbol })
              }}
              isRequired={true}
            />
          </div>
          <Select
            id={'select_mileage_unit'}
            options={
              Object.entries(filters?.price_type?.options)
                .map(([key, _]) => ({
                  value: key,
                  label: t(`filters.price_type.${key}`),
                }))
            }
            data={filter?.price_data?.price_type?.id}
            onChange={(value) => handlePropsChange('price.price_data.price_type', { id: value, name: t(`filters.price_type.${value}`) })}
          />
          <div className={style.wrapper}>
            <Checkbox
              placeholder={t('vat_player')}
              data={vat}
              onChange={(value) => setVat(value)}
            />
          </div>
        </div>
        {
          vat === '1' &&
          <div className={style.list}>
            <Field
              type={'number'}
              placeholder={t('vat')}
              data={filter.price_data.vat_rate}
              onChange={(value) => handlePropsChange('price.price_data.vat_rate', value)}
              label={`${t('vat')} (%)`}
              isLabel={true}
              max={100}
            />
          </div>
        }
        {
          (filter.price_score && filter.price_data.price_recommended) &&
          <>
            <div className={style.accept}>
              <div>
                <p>{t('price_recommendation')}</p>
                <h5>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, filter?.price_data?.price_recommended)}</h5>
              </div>
              <Button
                classes={['primary', 'md']}
                placeholder={t('accept_price')}
                onChange={() => handlePropsChange('price.price_data.price', filter.price_data.price_recommended)}
              />
            </div>
            <Comparison data={filter} />
          </>
        }
        <div className={style.footer}>
          <Button
            type={'submit'}
            classes={['primary', 'md']}
            placeholder={t('actions.next')}
          />
        </div>
      </form>
    </Accordion>
  )
}

export default Price
