import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useModal } from '@/context/ModalContext'
import { useSelector } from 'react-redux'

import { ROUTES_USER } from '@/constant/config'

import classNames from 'classnames'

import Image from 'next/image'
import Reference from '@/components/Reference'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Backdrop from '@/modules/Backdrop'
import Avatar from '@/modules/Avatar'

import LoginModal from '@/modules/LoginModal'
import LanguageModal from '@/modules/LanguageModal'
import RegistrationModal from '@/modules/RegistrationModal'
import Logout from '../Logout'

import style from './index.module.scss'

const Account = () => {
  const t = useTranslations()
  const params = useParams()
  const { showModal } = useModal()
  const [show, setShow] = useState(false)
  const auth = useSelector((state) => state.auth)
  const isAuth = auth?.id
  const language = params.locale

  const MENU = [
    ROUTES_USER.saved,
    ROUTES_USER.last,
    ROUTES_USER.favorite,
    ROUTES_USER.orders
  ]

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setShow(false),
    { buttonRef }
  )

  const openModal = (type) => {
    setShow(false)
    switch (type) {
      case 0:
        showModal(<LoginModal />)
        break
      case 1:
        showModal(<RegistrationModal />)
        break
      case 2:
        showModal(<LanguageModal />, t('modal.language'))
        break
      default:
        break
    }
  }
  
  return (
    <div ref={blockRef}>
      {
        show &&
        <Backdrop onChange={() => setShow(false)} />
      }
      <div
        className={
          classNames(
            style.block,
            show && style.active
          )
        }
      >
        <button
          ref={buttonRef}
          type="button"
          aria-label="Toggle"
          className={style.toggle}
          onClick={() => setShow(!show)}
        >
          {
            isAuth
              ?
                <Avatar
                  size="sm"
                  src={auth.image}
                  alt={auth.name || auth.username}
                />
              :
                <Icon
                  iconName={'circle-user'}
                  width={28}
                  height={28}
                />
          }
          <span className={style.hidden}>
            {
              isAuth
                ?
                  t('profile')
                :
                  t('login')
            }
          </span>
          <Icon
            className={
              classNames(
                style.arrow,
                style.hidden
              )
            }
            iconName={'angle-down'}
            width={14}
            height={14}
          />
        </button>

        <div className={style.dropdown}>
          <Button
            classes={['secondary', 'square', style.close]}
            icon="xmark"
            onChange={() => setShow(false)}
          />
          {
            auth?.user &&
            <div className={style.top}>
              <Avatar
                src={auth.image}
                alt={auth.name || auth.username}
              />
              <div className={style.meta}>
                <p className={style.name}>{auth.name || auth.username}</p>
                <p className={style.email}>{auth.email}</p>
              </div>
              <Logout setShow={setShow} />
            </div>
          }
          <div className={style.center}>
            {
              MENU.map((el, idx) => (
                isAuth
                  ?
                    <Reference
                      key={idx}
                      link={el.link}
                      icon={el.icon}
                      classes={['secondary', 'left', 'wide', 'sm']}
                      placeholder={t(el.text)}
                      onChange={() => setShow(false)}
                    />
                  :
                    <Button
                      key={idx}
                      icon={el.icon}
                      classes={['secondary', 'left', 'wide', 'sm']}
                      placeholder={t(el.text)}
                      onChange={() => openModal(0)}
                    />
              ))
            }
          </div>
          <div className={style.bottom}>
            {
              isAuth
                ?
                  <Reference
                    link={ROUTES_USER.settings.link}
                    icon={ROUTES_USER.settings.icon}
                    classes={['secondary', 'left', 'wide', 'sm']}
                    placeholder={t(ROUTES_USER.settings.text)}
                    onChange={() => setShow(false)}
                  />
                :
                  <div className={style.setting}>
                    <Button
                      classes={['primary', 'wide']}
                      icon={'circle-user'}
                      placeholder={t('login')}
                      onChange={() => openModal(0)}
                    />
                    <p className={style.text}>
                      {t('notification.login')}
                      <button
                        type="button"
                        className={style.link}
                        aria-label="Registration"
                        onClick={() => openModal(1)}
                      >
                        {t('register')}
                      </button>
                    </p>
                  </div>
            }
          </div>
          <button
            type="button"
            aria-label={t('modal.language')}
            className={style.language}
            onClick={() => openModal(2)}
          >
            <span className={style.flag}>
              <Image
                width={24}
                height={24}
                className={style.image}
                src={`/images/countries/${language}.svg`}
                priority={true}
                alt={language}
              />
            </span>
            <span>{language}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Account