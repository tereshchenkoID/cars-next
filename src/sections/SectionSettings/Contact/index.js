import { useTranslations } from 'next-intl'
import { useState, useMemo } from 'react'

import { validationRules } from '@/utils/validationRules'

import classNames from 'classnames'

import Field from '@/components/Field'
import Phone from '@/components/Phone'
import Button from '@/components/Button'
import InputGroup from '@/modules/InputGroup'

import style from '../index.module.scss'

const Contact = () => {
  const t = useTranslations()
  const [filter, setFilter] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault()

    alert("Send")
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {/* <pre className={style.pre}>{JSON.stringify(filter, null, 2)}</pre> */}
      
      <div className={style.grid}>
        <InputGroup
          label={t('name')}
          value={filter.name.value}
          rules={[
            validationRules.required,
            validationRules.minLength(2),
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

        <InputGroup
          label={t('phone')}
          value={filter.phone.value}
          rules={[
            validationRules.required,
            validationRules.minLength(8),
            validationRules.maxLength(15),
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
      </div>
      <div
        className={
          classNames(
            style.grid,
            style.lg
          )
        }
      >
        <Button
          type="submit"
          classes={['primary', 'wide', style.submit]}
          placeholder={t('save')}
          isDisabled={!isFormValid}
        />
      </div>
    </form>
  )
}

export default Contact