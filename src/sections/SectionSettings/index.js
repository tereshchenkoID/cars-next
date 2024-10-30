"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import classNames from 'classnames'

import Icon from '@/components/Icon'
import Container from "@/components/Container"
import Contact from './Contact'
import Security from './Security'

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
    <Container classes={style.block}>
      <h2>My Profile</h2>
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
          <span>Contact information</span>
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
          <span>Billing information</span>
          <Icon
            className={style.arrow}
            iconName={'angle-down'}
            width={16}
            height={16}
          />
        </div>
        <div className={style.body}>
          <div className={style.content}>
            <p>1</p>
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
          <span>Change password</span>
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
          <span>Notification settings</span>
          <Icon
            className={style.arrow}
            iconName={'angle-down'}
            width={16}
            height={16}
          />
        </div>
        <div className={style.body}>
          <div className={style.content}>
            <p>1</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SectionSettings