"use client"

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import { getFormatPrice } from '@/helpers/getFormatPrice'

import Label from '@/components/Label'
import Field from '@/components/Field'
import Select from '@/components/Select'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Accordion from '@/modules/Accordion'
import Comparison from '@/modules/Comparison'

import style from '../index.module.scss'

const Price = ({
  data,
  toggle,
  handleToggle,
  handleChange
}) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const filters = useSelector((state) => state.filters)
  const [vat, setVat] = useState("0")

  return (
    <Accordion
      data={toggle[3]}
      action={() => handleToggle(3)}
      icon={'file'}
      placeholder={t('price')}
    >
      <div className={style.grid}>
        <div
          className={style.list}
          style={{
            alignItems: 'flex-end'
          }}
        >
          <div className={style.wrapper}>
            <Label
              data={t('price')}
              isRequired={true}
            />
            <Field
              type={'number'}
              placeholder={t('price')}
              data={data.price_data.price}
              onChange={(value) => handleChange('price_data.price', value)}
            />
          </div>
          <div className={style.wrapper}>
            <Select
              id={'select_mileage_unit'}
              options={
                Object.entries(filters.price_type.options)
                  .map(([optionKey, optionValue]) => ({
                    value: optionKey,
                    label: optionValue,
                  }))
              }
              data={data.price_data.price_type.id}
              onChange={(value) => handleChange('price_data.price_type', {
                id: value,
                name: t(`filters.price_type.${value}`)
              })}
            />
          </div>
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
            <div className={style.wrapper}>
              <Label
                data={`${t('vat')} (%)`}
                isRequired={true}
              />
              <Field
                type={'number'}
                placeholder={t('vat')}
                data={data.price_data.vat_rate}
                onChange={(value) => handleChange('price_data.vat_rate', value)}
                max={100}
              />
            </div>
          </div>
        }
        <div className={style.accept}>
          <div>
            <p>{t('price_recommendation')}</p>
            <h5>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price_recommended)}</h5>
          </div>
          <Button
            classes={['primary', style.button]}
            placeholder={t('accept_price')}
            onChange={() => handleChange('price_data.price', data.price_data.price_recommended)}
          />
        </div>
        {
          data.price_score &&
          <Comparison data={data} />
        }
        <div className={style.footer}>
          <Button
            classes={['primary', style.button]}
            placeholder={t('actions.save')}
          />
        </div>
      </div>
    </Accordion>
  )
}

export default Price