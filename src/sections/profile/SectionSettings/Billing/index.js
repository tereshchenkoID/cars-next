import { useTranslations } from 'next-intl'
import { useState, useMemo, useEffect } from 'react'

import { validationRules } from 'utils/validationRules'

import classNames from 'classnames'

import Field from 'components/Field'
import Select from 'components/Select'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import InputGroup from 'modules/InputGroup'

import style from '../index.module.scss'

const Billing = () => {
  const t = useTranslations()
  const [active, setActive] = useState(0)
  const [vat, setVat] = useState("0")
  const [filter, setFilter] = useState({
    street: {
      value: '',
      isValid: false
    },
    city: {
      value: '',
      isValid: false
    },
    postal_code: {
      value: '',
      isValid: false
    },
    house_number: {
      value: '',
      isValid: false
    },
    country: {
      value: '',
      isValid: false
    }
  })

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
    }
  ])

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

  useEffect(() => {
    setFilter((prevFilter) => {
      return active === 1
        ?
          {
            ...prevFilter,
            company_id: { value: '', isValid: false },
            company_name: { value: '', isValid: false }
          }
        :
          Object.fromEntries(
            Object.entries(prevFilter).filter(
              ([key]) => key !== 'company_id' && key !== 'company_name'
            )
          )
    })
  }, [active])

  useEffect(() => {
    setFilter((prevFilter) => {
      return vat === "1"
        ?
          {
            ...prevFilter,
            vat_id: { value: '', isValid: false },
          }
        :
          Object.fromEntries(
            Object.entries(prevFilter).filter(
              ([key]) => key !== 'vat_id'
            )
          )
    })
  }, [vat])

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {/* <pre className={style.pre}>{JSON.stringify(filter, null, 2)}</pre> */}

      <div className={style.switcher}>
        <button
          type="button"
          className={
            classNames(
              style.button,
              active === 0 && style.active
            )
          }
          aria-label={t('consumer')}
          title={t('consumer')}
          onClick={() => setActive(0)}
        >
          {t('consumer')}
        </button>
        <button
          type="button"
          className={
            classNames(
              style.button,
              active === 1 && style.active
            )
          }
          aria-label={t('company')}
          title={t('company')}
          onClick={() => setActive(1)}
        >
          {t('company')}
        </button>
      </div>

      {
        (active === 1 && filter.company_id && filter.company_name) &&
        <>
          <div className={style.grid}>
            <Checkbox
              placeholder={t('vat_player')}
              data={vat}
              onChange={(value) => setVat(value)}
            />
          </div>
          <div className={style.grid}>
            <InputGroup
              label={t('company_id')}
              value={filter.company_id.value}
              rules={[
                validationRules.required,
              ]}
              onValidationChange={(isValid) =>
                handleChange('company_id', { value: filter.company_id.value, isValid })
              }
            >
              <Field
                placeholder={t('company_id')}
                data={filter.company_id.value}
                onChange={(value) => handleChange('company_id', { value, isValid: filter.company_id.isValid })}
              />
            </InputGroup>

            <InputGroup
              label={t('company_name')}
              value={filter.company_name.value}
              rules={[
                validationRules.required,
              ]}
              onValidationChange={(isValid) =>
                handleChange('company_name', { value: filter.company_name.value, isValid })
              }
            >
              <Field
                placeholder={t('company_name')}
                data={filter.company_name.value}
                onChange={(value) => handleChange('company_name', { value, isValid: filter.company_name.isValid })}
              />
            </InputGroup>

            {
              (vat === "1" && filter.vat_id) &&
              <InputGroup
                label={t('vat_id')}
                value={filter.vat_id.value}
                rules={[
                  validationRules.required,
                ]}
                onValidationChange={(isValid) =>
                  handleChange('vat_id', { value: filter.vat_id.value, isValid })
                }
              >
                <Field
                  placeholder={t('vat_id')}
                  data={filter.vat_id.value}
                  onChange={(value) => handleChange('vat_id', { value, isValid: filter.vat_id.isValid })}
                />
              </InputGroup>
            }
          </div>
        </>
      }

      <div className={style.divider}>
        {t('billing_address')}
      </div>

      <div className={style.grid}>
        <InputGroup
          label={t('city')}
          value={filter.city.value}
          rules={[
            validationRules.required,
            validationRules.minLength(2),
            validationRules.noNumbers
          ]}
          onValidationChange={(isValid) =>
            handleChange('city', { value: filter.city.value, isValid })
          }
        >
          <Field
            placeholder={t('city')}
            data={filter.city.value}
            onChange={(value) => handleChange('city', { value, isValid: filter.city.isValid })}
          />
        </InputGroup>

        <InputGroup
          label={t('country')}
          value={filter.country.value}
          rules={[
            validationRules.required,
            validationRules.minLength(2),
          ]}
          onValidationChange={(isValid) =>
            handleChange('country', { value: filter.country.value, isValid })
          }
        >
          <Select
            placeholder={t('actions.select_countries')}
            options={countries.map(item => ({
              value: item.alpha_2,
              label: item.name,
            }))}
            data={filter.country.value}
            isRequired={true}
            onChange={(value) => handleChange('country', { value, isValid: filter.country.isValid })}
          />
        </InputGroup>


        <InputGroup
          label={t('street')}
          value={filter.street.value}
          rules={[
            validationRules.required,
            validationRules.minLength(2),
            validationRules.noNumbers
          ]}
          onValidationChange={(isValid) =>
            handleChange('street', { value: filter.street.value, isValid })
          }
        >
          <Field
            placeholder={t('street')}
            data={filter.street.value}
            onChange={(value) => handleChange('street', { value, isValid: filter.street.isValid })}
          />
        </InputGroup>

        <div className={style.grid}>
          <InputGroup
            label={t('house_number')}
            value={filter.house_number.value}
            rules={[
              validationRules.required,
              validationRules.maxLength(12),
            ]}
            onValidationChange={(isValid) =>
              handleChange('house_number', { value: filter.house_number.value, isValid })
            }
          >
            <Field
              placeholder={t('house_number')}
              data={filter.house_number.value}
              onChange={(value) => handleChange('house_number', { value, isValid: filter.house_number.isValid })}
            />
          </InputGroup>

          <InputGroup
            label={t('postal_code')}
            value={filter.postal_code.value}
            rules={[
              validationRules.required,
              validationRules.minLength(4),
              validationRules.maxLength(8),
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

export default Billing
