import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from '@/context/ModalContext'

import Field from '@/components/Field'
import Button from '@/components/Button'
import RegistrationModal from '@/modules/RegistrationModal'

import style from './index.module.scss'

const RestoreModal = () => {
  const t = useTranslations()
  const { showModal } = useModal()
  const [login, setLogin] = useState('')

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
        <Field
          type={'email'}
          placeholder={t('email')}
          data={login}
          onChange={setLogin}
        />
        <Button
          type={'submit'}
          classes={['primary', 'wide']}
          placeholder={t('restore')}
        />
      </form>
      <p className={style.text}>{t('notification.login')}
        <button
          type={'button'}
          className={style.link}
          aral-label={'Registration'}
          onClick={openModal}
        >
          {t('register')}
        </button>
      </p>
    </div>
  )
}

export default RestoreModal
