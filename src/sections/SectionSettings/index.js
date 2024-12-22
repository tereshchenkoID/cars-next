"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import classNames from 'classnames'

import Icon from '@/components/Icon'
import Container from "@/components/Container"
import Contact from './Contact'
import Security from './Security'
import Billing from './Billing'
import Notification from './Notification'

import style from './index.module.scss'

const SectionSettings = () => {
  const t = useTranslations()
  const [show, setShow] = useState({})

  const handleChange = (index) => {
    setShow((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <section className={style.block}>
      <Container classes={style.container}>
        <h1>{t('my_profile')}</h1>
        <div
          className={
            classNames(
              style.tab,
              show[0] && style.active
            )
          }
        >
          <div
            className={style.head}
            role={'button'}
            onClick={() => handleChange(0)}
          >
            <Icon
              className={style.icon}
              iconName={'user'}
            />
            <span>{t('contact_information')}</span>
            <Icon
              className={style.arrow}
              iconName={'angle-down'}
              width={16}
              height={16}
            />
          </div>
          <div className={style.body}>
            <div className={style.content}>
              <Contact />
            </div>
          </div>
        </div>

        <div
          className={
            classNames(
              style.tab,
              show[1] && style.active
            )
          }
        >
          <div
            className={style.head}
            role={'button'}
            onClick={() => handleChange(1)}
          >
            <Icon
              className={style.icon}
              iconName={'file'}
            />
            <span>{t('billing_information')}</span>
            <Icon
              className={style.arrow}
              iconName={'angle-down'}
              width={16}
              height={16}
            />
          </div>
          <div className={style.body}>
            <div className={style.content}>
              <Billing />
            </div>
          </div>
        </div>

        <div
          className={
            classNames(
              style.tab,
              show[2] && style.active
            )
          }
        >
          <div
            className={style.head}
            role={'button'}
            onClick={() => handleChange(2)}
          >
            <Icon
              className={style.icon}
              iconName={'unlock'}
            />
            <span>{t('change_password')}</span>
            <Icon
              className={style.arrow}
              iconName={'angle-down'}
              width={16}
              height={16}
            />
          </div>
          <div className={style.body}>
            <div className={style.content}>
              <Security />
            </div>
          </div>
        </div>

        <div
          className={
            classNames(
              style.tab,
              show[3] && style.active
            )
          }
        >
          <div
            className={style.head}
            role={'button'}
            onClick={() => handleChange(3)}
          >
            <Icon
              className={style.icon}
              iconName={'bell'}
            />
            <span>{t('notification_settings')}</span>
            <Icon
              className={style.arrow}
              iconName={'angle-down'}
              width={16}
              height={16}
            />
          </div>
          <div className={style.body}>
            <div className={style.content}>
              <Notification />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SectionSettings