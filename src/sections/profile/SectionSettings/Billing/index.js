import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Button from 'components/Button'
import Field from 'components/Field'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Accordion from 'modules/Accordion'
import Divider from 'modules/Divider'

import style from '../index.module.scss'

const Billing = ({ type, filter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)
  const [vat, setVat] = useState("0")
  const [countries, setCountries] = useState([
    {
      "alpha_2": "GR",
      "alpha_3": "GER",
      "name": "Germany"
    },
    {
      "alpha_2": "MZ",
      "alpha_3": "MOZ",
      "name": "Mozambique"
    },
    {
      "alpha_2": "UA",
      "alpha_3": "UKR",
      "name": "Ukraine"
    }
  ])

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'file'}
      placeholder={t('billing_information')}
    >
      <div className={style.form}>
        {
          type === 1 &&
          <>
            <div className={style.grid}>
              <Field
                placeholder={t('company_id')}
                data={filter.company_id}
                onChange={(value) => handlePropsChange('billing_info.company_id', value)}
                isRequired={true}
                isLabel={true}
              />
              <Field
                placeholder={t('company_name')}
                data={filter.company_name}
                onChange={(value) => handlePropsChange('billing_info.company_name', value)}
                isRequired={true}
                isLabel={true}
              />
              <div className={style.wrapper}>
                <Checkbox
                  placeholder={t('vat_player')}
                  data={vat}
                  onChange={(value) => setVat(value)}
                />
              </div>
              <div />
              {
                vat === "1" &&
                <Field
                  placeholder={t('vat_id')}
                  data={filter.vat_id}
                  onChange={(value) => handlePropsChange('billing_info.vat_id', value)}
                  isRequired={true}
                  isLabel={true}
                />
              }
            </div>
          </>
        }
        <Divider data={'billing_address'} />
        <div className={style.grid}>
          <Field
            placeholder={t('city')}
            data={filter.city}
            onChange={(value) => handlePropsChange('billing_info.city', value)}
            isRequired={true}
            isLabel={true}
          />
          <Select
            placeholder={t('actions.select_countries')}
            options={countries.map(item => ({
              value: item.alpha_2,
              label: item.name,
            }))}
            onChange={(value) => handlePropsChange('billing_info.country', value)}
            data={filter.country}
            isRequired={true}
            isLabel={true}
          />
          <Field
            placeholder={t('street')}
            data={filter.street}
            onChange={(value) => handlePropsChange('billing_info.street', value)}
            isRequired={true}
            isLabel={true}
          />
          <div className={style.grid}>
            <Field
              placeholder={t('house_number')}
              data={filter.house_number}
              onChange={(value) => handlePropsChange('billing_info.house_number', value)}
              isRequired={true}
              isLabel={true}
            />
            <Field
              placeholder={t('postal_code')}
              data={filter.postal_code}
              onChange={(value) => handlePropsChange('billing_info.postal_code', value)}
              isRequired={true}
              isLabel={true}
            />
          </div>
        </div>
        <div className={style.footer}>
          <Button
            classes={['primary', 'md']}
            placeholder={t('actions.save')}
          />
        </div>
      </div>
    </Accordion>
  )
}

export default Billing
