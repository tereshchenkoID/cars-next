import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from 'context/ModalContext'
import { useDispatch } from 'react-redux'
import { signIn } from 'next-auth/react'

import { validationRules } from 'utils/validationRules'

import { setToastify } from 'store/actions/toastifyAction'

import Button from 'components/Button'
import Field from 'components/Field'
import Password from 'components/Password'
import InputGroup from 'modules/InputGroup'
import Divider from 'modules/Divider'
import RegistrationModal from 'modules/Modals/RegistrationModal'
import RestoreModal from 'modules/Modals/RestoreModal'

import style from './index.module.scss'

const LoginModal = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { showModal } = useModal()
  const [filter, setFilter] = useState({
    username: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  })

  const openModal = (type) => {
    const ModalComponent = type === 0 ? RegistrationModal : RestoreModal
    showModal(<ModalComponent />)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await signIn("login", {
      username: filter.username.value,
      password: filter.password.value,
      redirect: false
    })

    if (result?.ok) {
      window.location.reload()
    }
    else {
      dispatch(
        setToastify({
          type: 'error',
          text: t('notification.wrong_auth'),
        })
      )
    }
  }

  const handleChange = (field, { value, isValid }) => {
    setFilter((prevData) => ({
      ...prevData,
      [field]: { value, isValid },
    }))
  }

  const isFormValid = useMemo(() => {
    return Object.values(filter).every((field) => field.isValid)
  }, [filter])

  const handleSignIn = async (provider) => {
    await signIn(provider)
  }

  return (
    <div className={style.block}>
      <h5 className={style.title}>{t('modal.login')}</h5>
      <div className={style.social}>
        <Button
          classes={['alt', 'md', 'wide']}
          icon={'google'}
          placeholder="Google"
          onChange={() => handleSignIn('google')}
        />
        <Button
          classes={['alt', 'md', 'wide']}
          placeholder="Facebook"
          icon={'facebook'}
          onChange={() => handleSignIn('facebook')}
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
      <Divider data={'notification.via_email'} />
      <form onSubmit={handleSubmit} className={style.form}>
        <InputGroup
          label={t('username')}
          value={filter.username.value}
          rules={[
            validationRules.required,
            validationRules.minLength(5),
          ]}
          onValidationChange={(isValid) =>
            handleChange('username', { value: filter.username.value, isValid })
          }
        >
          <Field
            placeholder={t('username')}
            data={filter.username.value}
            onChange={(value) => handleChange('username', { value, isValid: filter.username.isValid })}
          />
        </InputGroup>

        <InputGroup
          label={t('password')}
          value={filter.password.value}
          rules={[
            validationRules.required,
            validationRules.minLength(5),
          ]}
          onValidationChange={(isValid) =>
            handleChange('password', { value: filter.password.value, isValid })
          }
        >
          <Password
            placeholder={t('password')}
            data={filter.password.value}
            onChange={(value) => handleChange('password', { value, isValid: filter.password.isValid })}
          />
        </InputGroup>

        <button
          type="button"
          className={style.restore}
          aria-label={t('notification.forgot_password')}
          onClick={() => openModal(1)}
        >
          {t('notification.forgot_password')}
        </button>
        <Button
          type={'submit'}
          classes={['primary', 'md', 'wide']}
          placeholder={t('login')}
          isDisabled={!isFormValid}
        />
      </form>
    </div>
  )
}

export default LoginModal
