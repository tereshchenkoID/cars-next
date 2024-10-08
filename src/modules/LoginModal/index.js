"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { useModal } from '@/context/ModalContext'

import { postData } from '@/helpers/api'
import { setAuth } from '@/store/actions/authAction'
import { setToastify } from '@/store/actions/toastifyAction'

import Field from '@/components/Field'
import Button from '@/components/Button'
import Password from '@/components/Password'
import RegistrationModal from '@/modules/RegistrationModal'
import RestoreModal from '@/modules/RestoreModal'

import style from './index.module.scss'

const LoginModal = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { showModal, closeModal } = useModal()
  const [filter, setFilter] = useState({
    username: '',
    password: '',
  })

  const handlePropsChange = (fieldName, fieldValue) => {
    setFilter((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }))
  }

  const openModal = (type) => {
    const ModalComponent = type === 0 ? RegistrationModal : RestoreModal
    showModal(<ModalComponent />)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', filter.username)
    formData.append('password', filter.password)

    postData('login/', formData).then(json => {
      if (json.id) {
        dispatch(setAuth(json)).then(() => {
          closeModal()
          // i18n.changeLanguage(json?.account?.language?.code)
        })
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
    })
  }

  const isFormValid = () => {
    const { ...requiredFields } = filter

    return (
      Object.values(requiredFields).every(field => field.trim() !== '' && field.length > 3)
    )
  }

  return (
    <div className={style.block}>
      <h5 className={style.title}>{t('modal.login')}</h5>
      <div className={style.social}>
        <Button
          classes={['alt', 'wide']}
          icon={'google'}
          placeholder="Google"
        />
        <Button
          classes={['alt', 'wide']}
          placeholder="Facebook"
          icon={'facebook'}
        />
      </div>
      <p className={style.text}>
        {t('notification.login')}
        <button
          type="button"
          className={style.link}
          aria-label={t('register')}
          onClick={() => openModal(0)}
        >
          {t('register')}
        </button>
      </p>
      <div className={style.divider}>{t('notification.via_email')}</div>
      <form onSubmit={handleSubmit} className={style.form}>
        <label className={style.label}>{t('login')}</label>
        <Field
          placeholder={t('username')}
          data={filter.login}
          onChange={(value) => handlePropsChange('username', value)}
        />
        <Password
          placeholder={t('password')}
          data={filter.password}
          onChange={(value) => handlePropsChange('password', value)}
        />
        <button
          type="button"
          className={style.restore}
          aria-label={t('notification.forgot_password')}
          onClick={() => openModal(1)}
        >
          {t('notification.forgot_password')}
        </button>
        <Button
          type="submit"
          classes={['primary', 'wide']}
          aria-label={t('login')}
          placeholder={t('login')}
          isDisabled={!isFormValid()}
        />
      </form>
    </div>
  )
}

export default LoginModal