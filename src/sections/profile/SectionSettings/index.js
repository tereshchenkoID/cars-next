"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Container from 'components/Container'
import Switcher from 'modules/Switcher'
import Contact from './Contact'
import Security from './Security'
import Billing from './Billing'
import Notification from './Notification'

import style from './index.module.scss'

const SectionSettings = () => {
  const t = useTranslations()
  const [active, setActive] = useState(0)

  return (
    <section className={style.block}>
      <Container>
        <div className={style.container}>
          <h1>{t('my_profile')}</h1>
          <Switcher
            data={['consumer', 'company']}
            active={active}
            setActive={setActive}
          />
          <Contact active={active} />
          <Billing active={active} />
          <Security />
          <Notification />
        </div>
      </Container>
    </section>
  )
}

export default SectionSettings
