"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Container from "@/components/Container"
import Accordion from '@/modules/Accordion'
import Contact from './Contact'
import Security from './Security'
import Billing from './Billing'
import Notification from './Notification'

import style from './index.module.scss'

const SectionSettings = () => {
  const t = useTranslations()
  const [show, setShow] = useState({})

  const handleToggle = (index) => {
    setShow((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <section className={style.block}>
      <Container>
        <div className={style.container}>
          <h1>{t('my_profile')}</h1>
          <Accordion
            data={show[0]}
            action={() => handleToggle(0)}
            icon={'user'}
            placeholder={t('contact_information')}
          >
            <Contact />
          </Accordion>

          <Accordion
            data={show[1]}
            action={() => handleToggle(1)}
            icon={'file'}
            placeholder={t('billing_information')}
          >
            <Billing />
          </Accordion>

          <Accordion
            data={show[2]}
            action={() => handleToggle(2)}
            icon={'unlock'}
            placeholder={t('change_password')}
          >
            <Security />
          </Accordion>

          <Accordion
            data={show[3]}
            action={() => handleToggle(3)}
            icon={'bell'}
            placeholder={t('notification_settings')}
          >
            <Notification />
          </Accordion>
        </div>
      </Container>
    </section>
  )
}

export default SectionSettings