"use client"

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslations } from 'next-intl'
import { useFilterState } from 'hooks/useFilterState'

import { setToastify } from 'store/actions/toastifyAction'

import { postData } from 'helpers/api'

import Container from 'components/Container'
import Switcher from 'modules/Switcher'
import Debug from 'modules/Debug'
import Contact from './Contact'
import Security from './Security'
import Billing from './Billing'
import Verified from './Verified'
import Notification from './Notification'

import style from './index.module.scss'

const INITIAL_FILTER = {
  contact: {
    name: "",
    surname: "",
    email: {
      status: '0',
      data: ""
    },
    phone: [
      {
        status: '1',
        data: "+380666666666"
      },
      {
        status: '2',
        data: "380999999999"
      }
    ],
    messengers: {
      whatsapp: "",
      telegram: ""
    },
    company: {
      name: "",
      logo: "",
      registration_code: "",
      tax_code: "",
      website: "",
      address: "",
      schedule: ""
    }
  },
  documents: [
    {
      type: '0',
      data: [
        "https://storage.alpha-analytics.cz/get/ad545fed-4982-4e86-9e33-04c9685fec64?ts=1730375600",
        "https://storage.alpha-analytics.cz/get/1a08761d-86b8-4596-b7e7-892c5a2736b6?ts=1730376905",
        "https://storage.alpha-analytics.cz/get/2673ddeb-d792-43d6-bbd5-ecde502cbb41?ts=1730376903",
        "https://storage.alpha-analytics.cz/get/129f0443-b4f1-4abb-9cc9-3830a966f11d?ts=1730375890",
      ],
      uploaded: [],
      status: '0',
    },
    {
      type: '1',
      data: [
        "https://storage.alpha-analytics.cz/get/129f0443-b4f1-4abb-9cc9-3830a966f11d?ts=1730375890",
      ],
      uploaded: [],
      status: '1',
    },
    {
      type: '2',
      data: [
        "https://storage.alpha-analytics.cz/get/1a08761d-86b8-4596-b7e7-892c5a2736b6?ts=1730376905",
        "https://storage.alpha-analytics.cz/get/2673ddeb-d792-43d6-bbd5-ecde502cbb41?ts=1730376903"
      ],
      uploaded: [],
      status: '2',
    },
    {
      type: '3',
      data: [
        "https://storage.alpha-analytics.cz/get/ad545fed-4982-4e86-9e33-04c9685fec64?ts=1730375600",
      ],
      uploaded: [],
      status: '3',
    }
  ],
  billing_info: {
    street: '',
    city: "",
    postal_code: "",
    house_number: "",
    country: "GR",
    vat_id: "",
    company_id: "",
    company_name: "",
  },
  security: {
    old: '',
    new: ''
  },
  notification: {
    favorite: '0',
    saved: '0'
  }
}

const SectionSettings = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { filter, handlePropsChange } = useFilterState(INITIAL_FILTER)
  const [type, setType] = useState(0)

  const handleSave = () => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(filter))

    postData('/', formData).then(json => {
      if (json) {
        dispatch(
          setToastify({
            type: 'success',
            text: t('saved'),
          })
        )
      }
    })
  }

  return (
    <section className={style.block}>
      <Container>
        <div className={style.container}>
          <h1>{t('my_profile')}</h1>
          <Debug data={filter} />
          <Switcher
            data={['consumer', 'company']}
            active={type}
            setActive={setType}
          />
          <Contact
            type={type}
            filter={filter.contact}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
          <Billing
            type={type}
            filter={filter.billing_info}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
          <Verified
            type={type}
            filter={filter.documents}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
          <Security
            filter={filter.security}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
          <Notification
            filter={filter.notification}
            handlePropsChange={handlePropsChange}
            handleSave={handleSave}
          />
        </div>
      </Container>
    </section>
  )
}

export default SectionSettings
