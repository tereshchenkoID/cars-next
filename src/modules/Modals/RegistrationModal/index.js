import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { validationRules } from 'utils/validationRules'

import { useModal } from 'context/ModalContext'
import { useFilterState } from 'hooks/useFilterState'

import Button from 'components/Button'
import Phone from 'components/Phone'
import Field from 'components/Field'
import Password from 'components/Password'
import Checkbox from 'components/Checkbox'
import Divider from 'modules/Divider'
import InputGroup from 'modules/InputGroup'
import LoginModal from 'modules/Modals/LoginModal'

import style from './index.module.scss'

const INITIAL_FILTER = {
  email: {
    value: '',
    isValid: false
  },
  password: {
    value: '',
    isValid: false
  },
  name: {
    value: '',
    isValid: false
  },
  surname: {
    value: '',
    isValid: false
  },
  phone: {
    value: '',
    isValid: false
  },
  terms: {
    value: false,
    isValid: false
  },
}

const RegistrationModal = () => {
  const t = useTranslations()
  const { showModal } = useModal()
  const { filter, handlePropsChange } = useFilterState(INITIAL_FILTER)

  const isFormValid = useMemo(() => {
    return Object.values(filter).every((field) => field.isValid)
  }, [filter])


  const openModal = () => {
    showModal(<LoginModal />)
  }

  return (
    <div className={style.block}>
      <h5 className={style.title}>{t('modal.registration')}</h5>
      <p className={style.text}>
        {t('notification.registration')}
        <button
          type={'button'}
          className={style.link}
          aria-label={t('login')}
          onClick={openModal}
        >
          {t('login')}
        </button>
      </p>
      <div className={style.social}>
        <Button
          classes={['alt', 'md', 'wide']}
          icon={'google'}
          placeholder="Google"
        />
        <Button
          classes={['alt', 'md', 'wide']}
          placeholder="Facebook"
          icon={'facebook'}
        />
      </div>
      <Divider data={'notification.via_email'} />
      <form className={style.form}>
        <InputGroup
          label={t('email')}
          value={filter.email.value}
          rules={[
            validationRules.required,
            validationRules.email,
          ]}
          onValidationChange={(isValid) =>
            handlePropsChange('email', { value: filter.email.value, isValid })
          }
        >
          <Field
            type={'email'}
            placeholder={t('email')}
            data={filter.email.value}
            onChange={(value) => handlePropsChange('email', { value, isValid: filter.email.isValid })}
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
            handlePropsChange('password', { value: filter.password.value, isValid })
          }
        >
          <Password
            placeholder={t('password')}
            data={filter.password.value}
            onChange={(value) => handlePropsChange('password', { value, isValid: filter.password.isValid })}
          />
        </InputGroup>
        <InputGroup
          label={t('phone')}
          value={filter.phone.value}
          rules={[
            validationRules.required,
          ]}
          onValidationChange={(isValid) =>
            handlePropsChange('phone', { value: filter.phone.value, isValid })
          }
        >
          <Phone
            data={filter.phone.value}
            onChange={(value) => handlePropsChange('phone', { value, isValid: filter.phone.isValid })}
          />
        </InputGroup>

        <div className={style.grid}>
          <InputGroup
            label={t('name')}
            value={filter.name.value}
            rules={[
              validationRules.required,
              validationRules.minLength(2),
              validationRules.noNumbers
            ]}
            onValidationChange={(isValid) =>
              handlePropsChange('name', { value: filter.name.value, isValid })
            }
          >
            <Field
              placeholder={t('name')}
              data={filter.name.value}
              onChange={(value) => handlePropsChange('name', { value, isValid: filter.name.isValid })}
            />
          </InputGroup>

          <InputGroup
            label={t('surname')}
            value={filter.surname.value}
            rules={[
              validationRules.required,
              validationRules.minLength(2),
              validationRules.noNumbers
            ]}
            onValidationChange={(isValid) =>
              handlePropsChange('surname', { value: filter.surname.value, isValid })
            }
          >
            <Field
              placeholder={t('surname')}
              data={filter.surname.value}
              onChange={(value) => handlePropsChange('surname', { value, isValid: filter.surname.isValid })}
            />
          </InputGroup>
        </div>
        <Checkbox
          placeholder={t('notification.terms')}
          data={filter.terms.value}
          onChange={(value) => handlePropsChange('terms', { value, isValid: value === '1' })}
        />
        <Button
          type="submit"
          classes={['primary', 'md', 'wide']}
          placeholder={t('register')}
          isDisabled={!isFormValid}
        />
      </form>
    </div>
  )
}

export default RegistrationModal
