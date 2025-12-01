import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Button from 'components/Button'
import Field from 'components/Field'
import Textarea from 'components/Textarea'
import Accordion from 'modules/Accordion'
import Divider from 'modules/Divider'
import EmailVerify from 'modules/EmailVerify'
import PhoneVerify from 'modules/PhoneVerify'

import style from '../index.module.scss'

const Contact = ({ type, filter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)

  const handleAddPhone = () => {
    handlePropsChange('contact.phone', [
      ...filter.phone,
      {
        status: '0',
        data: ''
      }
    ])
  }

  const handleRemovePhone = (idx) => {
    const updated = filter.phone.filter((_, i) => i !== idx)
    handlePropsChange('contact.phone', updated)
  }

  const handleUpdatePhone = (idx, value) => {
    const updated = [...filter.phone]

    updated[idx] = {
      ...updated[idx],
      data: value
    }

    handlePropsChange('contact.phone', updated)
  }

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'user'}
      placeholder={t('contact_information')}
    >
      <div className={style.form}>
        <div className={style.grid}>
          <Field
            placeholder={t('name')}
            data={filter.name}
            onChange={(value) => handlePropsChange('contact.name', value)}
            isRequired={true}
            isLabel={true}
          />
          <Field
            placeholder={t('surname')}
            data={filter.surname}
            onChange={(value) => handlePropsChange('contact.surname', value)}
            isRequired={true}
            isLabel={true}
          />
        </div>
        <EmailVerify
          name={'contact.email'}
          filter={filter.email}
          handlePropsChange={handlePropsChange}
        />
        {
          filter.phone.map((el, idx) =>
            <PhoneVerify
              key={idx}
              idx={idx}
              filter={el}
              handleRemovePhone={() => handleRemovePhone(idx)}
              handlePropsChange={(value) => handleUpdatePhone(idx, value)}
            />
          )
        }
        <div className={style.grid}>
          <Button
            classes={['primary', 'sm']}
            placeholder={t('actions.add')}
            onChange={handleAddPhone}
          />
        </div>
        {
          type === 1 &&
          <>
            <Divider data={'about_company'} />
            <div className={style.grid}>
              <Field
                placeholder={t('name')}
                data={filter.company.name}
                onChange={(value) => handlePropsChange('contact.company.name', value)}
                isRequired={true}
                isLabel={true}
              />
              <Field
                placeholder={t('website')}
                data={filter.company.website}
                onChange={(value) => handlePropsChange('contact.company.website', value)}
                isLabel={true}
              />
              <Field
                placeholder={t('registration_code')}
                data={filter.company.registration_code}
                onChange={(value) => handlePropsChange('contact.company.registration_code', value)}
                isRequired={true}
                isLabel={true}
              />
              <Field
                placeholder={t('tax_code')}
                data={filter.company.tax_code}
                onChange={(value) => handlePropsChange('contact.company.tax_code', value)}
                isRequired={true}
                isLabel={true}
              />
              <Textarea
                placeholder={t('address')}
                data={filter.company.address}
                onChange={(value) => handlePropsChange('contact.company.address', value)}
                isLabel={true}
              />
              <Textarea
                placeholder={t('schedule')}
                data={filter.company.schedule}
                onChange={(value) => handlePropsChange('contact.company.schedule', value)}
                isLabel={true}
              />
              <Field
                placeholder={'WhatsApp'}
                data={filter.messengers.whatsapp}
                onChange={(value) => handlePropsChange('contact.messengers.whatsapp', value)}
                isLabel={true}
              />
              <Field
                placeholder={'Telegram'}
                data={filter.messengers.telegram}
                onChange={(value) => handlePropsChange('contact.messengers.telegram', value)}
                isLabel={true}
              />
            </div>
          </>
        }
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

export default Contact
