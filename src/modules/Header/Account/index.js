import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { ROUTES_USER } from 'constant/config'

import classNames from 'classnames'

import { useSettingsStore } from 'stores/settingsStore'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { useRequest } from 'hooks/useRequest'
import { useAuth } from 'hooks/useAuth'
import { useModal } from 'context/ModalContext'

import Image from 'next/image'
import Button from 'components/Button'
import Reference from 'components/Reference'
import Icon from 'components/Icon'
import Avatar from 'modules/Avatar'
import Backdrop from 'modules/Modals/Backdrop'
import LoginModal from 'modules/Modals/LoginModal'
import LanguageModal from 'modules/Modals/LanguageModal'
import RegistrationModal from 'modules/Modals/RegistrationModal'

import style from './index.module.scss'

const Account = () => {
  const t = useTranslations()
  const params = useParams()
  const { handleLogout } = useRequest()
  const { showModal } = useModal()
  const { auth, isAuth } = useAuth()
  const { settings } = useSettingsStore()
  const [show, setShow] = useState(false)
  const language = params.locale

  const MENU = [
    // ROUTES_USER.saved,
    // ROUTES_USER.last,
    ROUTES_USER.vehicles,
    ROUTES_USER.archive,
    ROUTES_USER.favorites,
    ROUTES_USER.notification,
    // ROUTES_USER.chat,
    // ROUTES_USER.orders
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
      <Backdrop
        data={show}
        onChange={() => setShow(false)}
      />
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
          aria-label={"Toggle"}
          className={style.toggle}
          onClick={() => setShow(!show)}
        >
          {
            isAuth
              ?
                <Avatar
                  size="sm"
                  src={auth.user.image}
                  alt={auth.name || auth.username}
                />
              :
                <Icon
                  iconName={'user-circle'}
                  width={28}
                  height={28}
                />
          }
          <span className={style.hidden}>{t(isAuth ? 'profile' : 'login')}</span>
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
            classes={['secondary', 'md', 'square', style.close]}
            icon="xmark"
            onChange={() => setShow(false)}
          />
          {
            isAuth &&
            <div className={style.top}>
              <Avatar
                src={auth?.image}
                alt={auth.name || auth.username}
              />
              <div className={style.meta}>
                <p className={style.name}>{auth.name || auth.username}</p>
                <p className={style.email}>{auth.email}</p>
              </div>
              <Button
                icon={'logout'}
                classes={['secondary', 'md', 'square']}
                onChange={handleLogout}
              />
            </div>
          }
          <div className={style.center}>
            {
              MENU.map((el, idx) =>
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
              )
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
                      classes={['primary', 'md', 'wide']}
                      icon={'user-circle'}
                      placeholder={t('login')}
                      onChange={() => openModal(0)}
                    />
                    <p className={style.text}>
                      {t('notification.login')}
                      <button
                        type="button"
                        className={style.link}
                        aria-label={t('modal.registration')}
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
            onClick={() => {
              settings?.languages?.length > 1 &&
              openModal(2)
            }}
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
