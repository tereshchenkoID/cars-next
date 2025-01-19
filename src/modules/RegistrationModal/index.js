import { useTranslations } from 'next-intl'
import { useState, useMemo } from 'react'

import { validationRules } from '@/utils/validationRules'

import { useModal } from '@/context/ModalContext'

// import { getData } from 'helpers/api'

import Phone from '@/components/Phone'
import Field from '@/components/Field'
import Button from '@/components/Button'
import Password from '@/components/Password'
import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import LoginModal from '@/modules/LoginModal'
import InputGroup from '@/modules/InputGroup'

import style from './index.module.scss'

const RegistrationModal = () => {
  const t = useTranslations()
  const { showModal } = useModal()
  const [countries, setCountries] = useState([
    {
      "alpha_2": "GR",
      "alpha_3": "GER",
      "name": "Germany"
    },
    {
      "alpha_2": "MZ",
      "alpha_3": "MOZ",
      "name": "Mozambique"
    },
    {
      "alpha_2": "UA",
      "alpha_3": "UKR",
      "name": "Ukraine"
    },
  ])

  const [filter, setFilter] = useState({
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
    postal_code: {
      value: '',
      isValid: false
    },
    country: {
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

  // useEffect(() => {
  //   getData('countries/').then(json => {
  //     setCountries(json)
  //   })
  // }, [])

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
      <div className={style.divider}>{t('notification.via_email')}</div>
      <form className={style.form}>
        {/* <label className={style.label}>{t('login')}</label> */}
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
              handleChange('name', { value: filter.name.value, isValid })
            }
          >
            <Field
              placeholder={t('name')}
              data={filter.name.value}
              onChange={(value) => handleChange('name', { value, isValid: filter.name.isValid })}
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
              handleChange('surname', { value: filter.surname.value, isValid })
            }
          >
            <Field
              placeholder={t('surname')}
              data={filter.surname.value}
              onChange={(value) => handleChange('surname', { value, isValid: filter.surname.isValid })}
            />
          </InputGroup>
        </div>

        <InputGroup
          label={t('phone')}
          value={filter.phone.value}
          rules={[
            validationRules.required,
          ]}
          onValidationChange={(isValid) =>
            handleChange('phone', { value: filter.phone.value, isValid })
          }
        >
          <Phone
            data={filter.phone.value}
            onChange={(value) => handleChange('phone', { value, isValid: filter.phone.isValid })}
          />
        </InputGroup>

        <div className={style.grid}>
          <InputGroup
            label={t('country')}
            value={filter.country.value}
            rules={[
              validationRules.required,
            ]}
            onValidationChange={(isValid) =>
              handleChange('country', { value: filter.country.value, isValid })
            }
          >
            <Select
              placeholder={t('select_countries')}
              options={countries.map(item => ({
                value: item.alpha_2,
                label: item.name,
              }))}
              data={filter.country.value}
              onChange={(value) => handleChange('country', { value, isValid: filter.country.isValid })}
            />
          </InputGroup>

          <InputGroup
            label={t('postal_code')}
            value={filter.postal_code.value}
            rules={[
              validationRules.required,
              validationRules.noLetters
            ]}
            onValidationChange={(isValid) =>
              handleChange('postal_code', { value: filter.postal_code.value, isValid })
            }
          >
            <Field
              placeholder={t('postal_code')}
              data={filter.postal_code.value}
              onChange={(value) => handleChange('postal_code', { value, isValid: filter.postal_code.isValid })}
            />
          </InputGroup>
        </div>
        <Checkbox
          placeholder={t('notification.terms')}
          data={filter.terms.value}
          onChange={(value) => handleChange('terms', { value, isValid: filter.terms.isValid })}
        />
        <Button
          type="submit"
          classes={['primary', 'wide']}
          placeholder={t('register')}
          isDisabled={!isFormValid}
        />
      </form>
    </div>
  )
}

export default RegistrationModal