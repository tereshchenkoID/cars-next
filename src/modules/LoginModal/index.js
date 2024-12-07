import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from '@/context/ModalContext'
import { useDispatch } from 'react-redux'
import { signIn, getSession } from 'next-auth/react'

import { validationRules } from '@/utils/validationRules'

import { setToastify } from '@/store/actions/toastifyAction'
import { setAuth } from '@/store/actions/authAction'

import Field from '@/components/Field'
import Button from '@/components/Button'
import Password from '@/components/Password'
import InputGroup from '@/modules/InputGroup'
import RegistrationModal from '@/modules/RegistrationModal'
import RestoreModal from '@/modules/RestoreModal'

import style from './index.module.scss'

const LoginModal = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { showModal, closeModal } = useModal()
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

    try {
      const result = await signIn('login', {
        redirect: false,
        username: filter.username.value,
        password: filter.password.value,
      })

      if (result?.ok) {
        const session = await getSession()

        dispatch(setAuth(session))
        dispatch(
          setToastify({
            type: 'success',
            text: `${t('modal.login')} ${filter.username.value}`,
          }),
        )

        // Need tested
        window.location.reload()
        closeModal()
      }
      else {
        dispatch(
          setToastify({
            type: 'error',
            text: 'An error occurred while logging in.',
          }),
        );
      }
    } catch (error) {
      dispatch(
        setToastify({
          type: 'error',
          text: 'An unexpected error occurred.',
        }),
      );
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
    // const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    // const params = new URLSearchParams({
    //   client_id: "214317679965-e10brq593pt679qb424glitrlmc4i6t8.apps.googleusercontent.com",
    //   redirect_uri: `http://localhost:3000/api/auth/callback/${provider}`,
    //   response_type: 'token',
    //   scope: 'openid email profile',
    //   prompt: 'select_account',
    //   include_granted_scopes: true,
    // });

    // const width = 550
    // const height = 600
    // const left = window.screenX + (window.innerWidth - width) / 2
    // const top = window.screenY + (window.innerHeight - height) / 2
    // const authWindow = window.open(
    //                     `${oauth2Endpoint}?${params.toString()}`, 
    //                     'SignIn', 
    //                     `width=${width},height=${height},top=${top},left=${left}`
    //                   )
  
    // const interval = setInterval(() => {
    //   if (authWindow.closed) {
    //     clearInterval(interval)
    //     console.error('User closed the login window without completing sign-in.')
    //     return
    //   }
    //   try {
    //     const hash = authWindow.location.hash
    //     const params = new URLSearchParams(hash.substring(1))
    //     const token = params.get('access_token')
          
    //     if (token) {
    //       alert('Access Token:', token)

    //       fetch('/api/auth/callback/google', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ token }),
    //       })
    //       .then(response => {
    //         console.log(response)
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //       })
    //       .then(data => {
    //         console.log('Session saved:', data);
    //         authWindow.close();
    //       })
    //       .catch(error => {
    //         console.error('Error saving session:', error);
    //       });
    //     } else {
    //       alert('Token not found');
    //     }
    //   }
    //   catch (error) {
    //     console.log("Error")
    //     clearInterval(interval)
    //   }

    // }, 1000);

    await signIn(provider)
  }

  return (
    <div className={style.block}>
      <h5 className={style.title}>{t('modal.login')}</h5>
      <div className={style.social}>
        <Button
          classes={['alt', 'wide']}
          icon={'google'}
          placeholder="Google"
          onChange={() => handleSignIn('google')}
        />
        <Button
          classes={['alt', 'wide']}
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
      <div className={style.divider}>{t('notification.via_email')}</div>
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
          classes={['primary', 'wide']}
          placeholder={t('login')}
          isDisabled={!isFormValid}
        />
      </form>
    </div>
  )
}

export default LoginModal