import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from '@/context/ModalContext'

import { validationRules } from '@/utils/validationRules'

import Field from '@/components/Field'
import Button from '@/components/Button'
import InputGroup from '@/modules/InputGroup'
import RegistrationModal from '@/modules/RegistrationModal'

import style from './index.module.scss'

const RestoreModal = () => {
  const t = useTranslations()
  const { showModal } = useModal()
  const [filter, setFilter] = useState({
    email: {
      value: '',
      isValid: false
    },
  })

  const handleChange = (field, { value, isValid }) => {
    setFilter((prevData) => ({
      ...prevData,
      [field]: { value, isValid },
    }))
  }

  const isFormValid = useMemo(() => {
    return Object.values(filter).every((field) => field.isValid)
  }, [filter])

  const openModal = () => {
    showModal(
      <RegistrationModal />
    )
  }

  return (
    <div className={style.block}>
      <h5 className={style.title}>{t('modal.restore')}</h5>
      <p className={style.subtitle}>{t('notification.restore')}</p>
      <form className={style.form}>
        <InputGroup
          label={t('email')}
          value={filter.email.value}
          rules={[
            validationRules.required,
            validationRules.email,
          ]}
          onValidationChange={(isValid) =>
            handleChange('email', { value: filter.email.value, isValid })
          }
        >
          <Field
            type={'email'}
            placeholder={t('email')}
            data={filter.email.value}
            onChange={(value) => handleChange('email', { value, isValid: filter.email.isValid })}
          />
        </InputGroup>
        <Button
          type={'submit'}
          classes={['primary', 'wide']}
          placeholder={t('restore')}
          isDisabled={!isFormValid}
        />
      </form>
      <p className={style.text}>{t('notification.login')}
        <button
          type={'button'}
          className={style.link}
          aral-label={t('modal.registration')}
          onClick={openModal}
        >
          {t('register')}
        </button>
      </p>
    </div>
  )
}

export default RestoreModal
