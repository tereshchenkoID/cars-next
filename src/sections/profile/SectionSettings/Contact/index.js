import { useTranslations } from 'next-intl'
import { useState } from 'react'
import classNames from 'classnames'

import { useFilterState } from 'hooks/useFilterState'

import Button from 'components/Button'
import Field from 'components/Field'
import Phone from 'components/Phone'
import Textarea from 'components/Textarea'
import Accordion from 'modules/Accordion'
import Debug from 'modules/Debug'
import Divider from 'modules/Divider'

import style from '../index.module.scss'

const INITIAL_FILTER = {
  contact: {
    name: '',
    surname: "",
    email: "",
    phone: [""],
    messengers: {
      whatsapp: "",
      telegram: ""
    },
    company: {
      name: "",
      registration_code: "",
      tax_code: "",
      website: "",
      address: "",
      schedule: "",
    }
  }
}

const Contact = ({ active }) => {
  const t = useTranslations()

  const { filter, handlePropsChange } = useFilterState(INITIAL_FILTER)
  const [toggle, setToggle] = useState(false)

  const handleAddPhone = () => {
    handlePropsChange('contact.phone', [...filter.contact.phone, ''])
  }

  const handleRemovePhone = (idx) => {
    const updated = filter.contact.phone.filter((_, i) => i !== idx)
    handlePropsChange('contact.phone', updated)
  }

  const handleUpdatePhone = (idx, value) => {
    const updated = [...filter.contact.phone]
    updated[idx] = value
    handlePropsChange('contact.phone', updated)
  }

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'user'}
      placeholder={t('contact_information')}
    >
      <form className={style.form}>
        <Debug data={filter} />
        <div className={style.grid}>
          <Field
            placeholder={t('name')}
            data={filter.contact.name}
            onChange={(value) => handlePropsChange('contact.name', value)}
            isRequired={true}
            isLabel={true}
          />
          <Field
            placeholder={t('surname')}
            data={filter.contact.surname}
            onChange={(value) => handlePropsChange('contact.surname', value)}
            isRequired={true}
            isLabel={true}
          />
          <Field
            type={'email'}
            placeholder={t('email')}
            data={filter.contact.email}
            onChange={(value) => handlePropsChange('contact.email', value)}
            isRequired={true}
            isLabel={true}
          />
        </div>
        <div
          className={
            classNames(
              style.grid,
              style.bottom
            )
          }
        >
          <div className={style.list}>
            {
              filter.contact.phone.map((el, idx) =>
                <div
                  key={idx}
                  className={style.phone}
                >
                  <Phone
                    data={el}
                    onChange={(value) => handleUpdatePhone(idx, value)}
                    isRequired={idx === 0}
                    isLabel={idx === 0}
                    label={t('phone')}
                  />
                  {
                    idx > 0 &&
                    <Button
                      icon={'trash'}
                      classes={['secondary', 'square', 'sm']}
                      title={t('remove')}
                      onChange={() => handleRemovePhone(idx)}
                    />
                  }
                </div>
              )
            }
          </div>
          <Button
            classes={['primary', 'sm']}
            placeholder={t('actions.add')}
            onChange={handleAddPhone}
          />
        </div>
        {
          active === 1 &&
          <>
            <Divider data={'about_company'} />
            <div className={style.grid}>
              <Field
                placeholder={t('name')}
                data={filter.contact.company.name}
                onChange={(value) => handlePropsChange('contact.company.name', value)}
                isRequired={true}
                isLabel={true}
              />
              <Field
                placeholder={t('website')}
                data={filter.contact.company.website}
                onChange={(value) => handlePropsChange('contact.company.website', value)}
                isLabel={true}
              />
              <Field
                placeholder={t('registration_code')}
                data={filter.contact.company.registration_code}
                onChange={(value) => handlePropsChange('contact.company.registration_code', value)}
                isRequired={true}
                isLabel={true}
              />
              <Field
                placeholder={t('tax_code')}
                data={filter.contact.company.tax_code}
                onChange={(value) => handlePropsChange('contact.company.tax_code', value)}
                isRequired={true}
                isLabel={true}
              />
              <Textarea
                placeholder={t('address')}
                data={filter.contact.company.address}
                onChange={(value) => handlePropsChange('contact.company.address', value)}
                isLabel={true}
              />
              <Textarea
                placeholder={t('schedule')}
                data={filter.contact.company.schedule}
                onChange={(value) => handlePropsChange('contact.company.schedule', value)}
                isLabel={true}
              />
              <Field
                placeholder={'WhatsApp'}
                data={filter.contact.messengers.whatsapp}
                onChange={(value) => handlePropsChange('contact.messengers.whatsapp', value)}
                isLabel={true}
              />
              <Field
                placeholder={'Telegram'}
                data={filter.contact.messengers.telegram}
                onChange={(value) => handlePropsChange('contact.messengers.telegram', value)}
                isLabel={true}
              />
            </div>
          </>
        }
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

export default Contact
