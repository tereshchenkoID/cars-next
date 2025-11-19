"use client"

import { useState } from 'react'

import { useAuth } from 'hooks/useAuth'

import Container from 'components/Container'
import Toastify from 'components/Toastify'
import Logo from 'components/Logo'
import Account from './Account'
import Favorite from './Favorite'
import Language from './Language'
import Menu from './Menu'
import Toggle from './Toggle'
import Notifications from './Notifications'

import style from './index.module.scss'

const Header = () => {
  const { isAuth } = useAuth()
  const [show, setShow] = useState(false)

  return (
    <>
      <header className={style.block}>
        <Container classes={style.container}>
          <Toggle show={show} setShow={setShow} />
          <Logo />
          <Menu show={show} setShow={setShow} />
          <div className={style.wrapper}>
            <Favorite />
            { isAuth && <Notifications /> }
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
