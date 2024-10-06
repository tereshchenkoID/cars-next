import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useModal } from '@/context/ModalContext'

// import { getData } from 'helpers/api'

// import Phone from '@/components/Phone'
import Field from '@/components/Field'
import Button from '@/components/Button'
// import Select from '@/components/Select'
import Password from '@/components/Password'
import Checkbox from '@/components/Checkbox'
import LoginModal from '@/modules/LoginModal'

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
    }
  ])

  const [formData, setFormData] = useState({
    login: '',
    password: '',
    name: '',
    surname: '',
    postal: '',
    country: '',
    phone: '',
    terms: false,
  })

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

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
          aria-label={'Registration'}
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
        <label className={style.label}>{t('login')}</label>
        <Field
          type="email"
          placeholder={t('email')}
          data={formData.login}
          onChange={(value) => handleChange('login', value)}
        />
        <Password
          placeholder={t('password')}
          data={formData.password}
          onChange={(value) => handleChange('password', value)}
        />
        <label className={style.label}>{t('personal_data')}</label>
        <div className={style.grid}>
          <Field
            placeholder={t('name')}
            data={formData.name}
            onChange={(value) => handleChange('name', value)}
          />
          <Field
            placeholder={t('surname')}
            data={formData.surname}
            onChange={(value) => handleChange('surname', value)}
          />
        </div>
        {/* <Phone
          data={formData.phone}
          onChange={value => handleChange('phone', value)}
          isRequired={true}
        /> */}
        <div className={style.grid}>
          {/* <Select
            placeholder={t('select_countries')}
            options={countries.map(item => ({
              value: item.alpha_2,
              label: item.name,
            }))}
            data={formData.country}
            isRequired={true}
            onChange={(value) => handleChange('country', value)}
          /> */}
          <Field
            placeholder={t('postal_code')}
            data={formData.postal}
            onChange={(value) => handleChange('postal', value)}
          />
        </div>
        <Checkbox
          placeholder={t('notification.terms')}
          data={formData.terms}
          onChange={(value) => handleChange('terms', value)}
        />
        <Button
          type="submit"
          classes={['primary', 'wide']}
          placeholder={t('register')}
        />
      </form>
    </div>
  )
}

export default RegistrationModal