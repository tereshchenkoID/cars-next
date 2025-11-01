import { useTranslations } from 'next-intl'
import { useState, useMemo } from 'react'

import classNames from 'classnames'

import { validationRules } from 'utils/validationRules'

import Button from 'components/Button'
import Password from 'components/Password'
import InputGroup from 'modules/InputGroup'

import style from '../index.module.scss'

const Security = () => {
  const t = useTranslations()
  const [filter, setFilter] = useState({
    old: {
      value: '',
      isValid: false
    },
    new: {
      value: '',
      isValid: false
    }
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
          label={t('current_password')}
          value={filter.old.value}
          rules={[
            validationRules.required,
            validationRules.minLength(5),
          ]}
          onValidationChange={(isValid) =>
            handleChange('old', { value: filter.old.value, isValid })
          }
        >
          <Password
            placeholder={t('current_password')}
            data={filter.old.value}
            onChange={(value) => handleChange('old', { value, isValid: filter.old.isValid })}
          />
        </InputGroup>
        <InputGroup
          label={t('new_password')}
          value={filter.new.value}
          rules={[
            validationRules.required,
            validationRules.minLength(5),
          ]}
          onValidationChange={(isValid) =>
            handleChange('new', { value: filter.new.value, isValid })
          }
        >
          <Password
            placeholder={t('new_password')}
            data={filter.new.value}
            onChange={(value) => handleChange('new', { value, isValid: filter.new.isValid })}
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
          placeholder={t('actions.save')}
          isDisabled={!isFormValid}
        />
      </div>
    </form>
  )
}

export default Security
