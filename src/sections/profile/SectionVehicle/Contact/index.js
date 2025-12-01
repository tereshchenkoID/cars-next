import { useState } from 'react'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import Button from 'components/Button'
import Field from 'components/Field'
import Phone from 'components/Phone'
import Accordion from 'modules/Accordion'

import style from '../index.module.scss'

const Contact = ({ filter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)

  const handleAddPhone = () => {
    handlePropsChange('contact.phone', [
      ...filter.phone,
      {
        isVerified: false,
        data: ""
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
      placeholder={t('contact')}
    >
      <form
        className={style.grid}
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
      >
        <div className={style.list}>
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
        <div
          className={
            classNames(
              style.list,
              style.bottom
            )
          }
        >
          <div className={style.grid}>
            {
              filter.phone.map((el, idx) =>
                <div
                  key={idx}
                  className={style.phone}
                >
                  <Phone
                    data={el.data}
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
        <div className={style.list}>
          <Field
            type={'email'}
            placeholder={t('email')}
            data={filter.email.data}
            onChange={(value) => handlePropsChange('contact.email.data', value)}
            isRequired={true}
            isLabel={true}
          />
          <div className={style.wrapper} />
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

export default Contact
