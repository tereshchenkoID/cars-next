"use client"

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import classNames from 'classnames'

import Container from '@/components/Container'
import Toastify from '@/components/Toastify'
import Logo from '@/components/Logo'
import Account from './Account'
import Favorite from './Favorite'
import Language from './Language'
import Menu from './Menu'

import style from './index.module.scss'

const Header = () => {
  const t = useTranslations()
  const [show, setShow] = useState(false)

  return (
    <>
      <header className={style.block}>
        <Container classes={style.container}>
          {
            <div
              className={style.button}
              onClick={() => setShow(!show)}
            >
              <button
                type={'button'}
                className={classNames(style.toggle, show && style.active)}
                aria-label="Toggle"
              >
                <span className={style.line} />
                <span className={style.line} />
                <span className={style.line} />
              </button>
              <p className={style.text}>{t('menu')}</p>
            </div>
          }
          <Logo />
          <Menu setShow={setShow} show={show} />
          <div className={style.wrapper}>
            <Favorite />
            <Language />
            <Account />
          </div>
        </Container>
      </header>
      <Toastify />
    </>
  )
}

export default Header
