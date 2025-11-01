"use client"

import { useTranslations } from 'next-intl'

import Label from 'components/Label'
import Field from 'components/Field'
import Accordion from 'modules/Accordion'
import Button from 'components/Button'

import style from '../index.module.scss'

const Contact = ({
  data,
  toggle,
  handleToggle,
  handleChange
}) => {
  const t = useTranslations()

  return (
    <Accordion
      data={toggle[4]}
      action={() => handleToggle(4)}
      icon={'user'}
      placeholder={t('contact')}
    >
      <div className={style.grid}>
        <div className={style.list}>
          <div className={style.wrapper}>
            <Label
              data={t('name')}
              isRequired={true}
            />
            <Field
              placeholder={t('name')}
              data={data.contact.name}
              onChange={(value) => handleChange('contact.name', value)}
            />
          </div>
          <div className={style.wrapper}>
            <Label
              data={t('surname')}
              isRequired={true}
            />
            <Field
              placeholder={t('surname')}
              data={data.contact.surname}
              onChange={(value) => handleChange('contact.surname', value)}
            />
          </div>
        </div>
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

export default Contact
