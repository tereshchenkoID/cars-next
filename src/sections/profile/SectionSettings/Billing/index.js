import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useFilterState } from 'hooks/useFilterState'

import Button from 'components/Button'
import Field from 'components/Field'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Label from 'components/Label'
import Debug from 'modules/Debug'
import Accordion from 'modules/Accordion'
import Divider from 'modules/Divider'

import style from '../index.module.scss'

const INITIAL_FILTER = {
  billing_info: {
    street: '',
    city: "",
    postal_code: "",
    house_number: "",
    country: "GR",
    vat_id: "",
    company_id: "",
    company_name: "",
  }
}

const Billing = ({ active }) => {
  const t = useTranslations()

  const { filter, handlePropsChange } = useFilterState(INITIAL_FILTER)
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
      <form className={style.form}>
        <Debug data={filter} />
        {
          active === 1 &&
          <>
            <div className={style.grid}>
              <Field
                placeholder={t('company_id')}
                data={filter.billing_info.company_id}
                onChange={(value) => handlePropsChange('billing_info.company_id', value)}
                isRequired={true}
                isLabel={true}
              />
              <Field
                placeholder={t('company_name')}
                data={filter.billing_info.company_name}
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
                  data={filter.billing_info.vat_id}
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
            data={filter.billing_info.city}
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
            data={filter.billing_info.country}
            isRequired={true}
            isLabel={true}
          />
          <Field
            placeholder={t('street')}
            data={filter.billing_info.street}
            onChange={(value) => handlePropsChange('billing_info.street', value)}
            isRequired={true}
            isLabel={true}
          />
          <div className={style.grid}>
            <Field
              placeholder={t('house_number')}
              data={filter.billing_info.house_number}
              onChange={(value) => handlePropsChange('billing_info.house_number', value)}
              isRequired={true}
              isLabel={true}
            />
            <Field
              placeholder={t('postal_code')}
              data={filter.billing_info.postal_code}
              onChange={(value) => handlePropsChange('billing_info.postal_code', value)}
              isRequired={true}
              isLabel={true}
            />
          </div>
        </div>
        <div className={style.footer}>
          <Button
            type={'submit'}
            classes={['primary', 'md']}
            placeholder={t('actions.save')}
          />
        </div>
      </form>
    </Accordion>
  )
}

export default Billing
