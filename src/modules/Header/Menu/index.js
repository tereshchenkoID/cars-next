import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { NAVIGATION } from 'constant/config'

import { overflowBody } from 'helpers/overflowBody'

import Link from 'next/link'
import Button from 'components/Button'
import Reference from 'components/Reference'
import Logo from 'components/Logo'
import Icon from 'components/Icon'
import Backdrop from 'modules/Modals/Backdrop'

import style from './index.module.scss'

const MENU = [
  NAVIGATION.buy,
  // NAVIGATION.new_auto,
  // NAVIGATION.how_it_works,
  NAVIGATION.reviews,
  // {
  //   ...NAVIGATION.services,
  //   submenu: [
  //     NAVIGATION.new_auto,
  //     NAVIGATION.how_it_works,
  //   ],
  // },
  // NAVIGATION.about_us
]

const Menu = ({ show, setShow }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const [active, setActive] = useState(null)

  const isActiveLink = (link) => {
    const url = pathname.split('/')
    return url.includes(link.replace("/", ""))
  }

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setActive(null),
    { buttonRef }
  )

  useEffect(() => {
    overflowBody(show)
  }, [show])

  return (
    <>
      {
        show &&
        <Backdrop onChange={() => setShow(false)} />
      }
      <menu
        className={
          classNames(
            style.menu,
            show && style.active
          )
        }
      >
        {
          <div className={style.meta}>
            <Button
              classes={['secondary', 'square', style.close]}
              icon={'xmark'}
              onChange={() => setShow(false)}
            />
            <Logo />
          </div>
        }
        {
          MENU.map((el, idx) =>
            <div
              key={idx}
              className={style.item}
            >
              {
                el.submenu
                  ?
                    <span
                      className={
                        classNames(
                          style.link,
                          style.inner,
                          active === idx && style.active,
                        )
                      }
                      ref={buttonRef}
                      onClick={() => setActive(active === idx ? null : idx)}
                    >
                      <span className={style.text}>{t(el.text)}</span>
                      <Icon
                        iconName={'angle-down'}
                        width={12}
                        height={12}
                        className={style.icon}
                      />
                    </span>
                  :
                    <Link
                      href={el.link}
                      rel="noreferrer"
                      onClick={() => {
                        setActive(null)
                        setShow(false)
                      }}
                      className={
                        classNames(
                          style.link,
                          isActiveLink(el.link) && style.active,
                        )
                      }
                    >
                      <span className={style.text}>{t(el.text)}</span>
                    </Link>
              }
              {
                (active === idx && el.submenu) &&
                <div
                  ref={blockRef}
                  className={style.dropdown}
                >
                  {
                    el.submenu.map((s_el, s_idx) => (
                      <Reference
                        key={s_idx}
                        link={s_el.link}
                        classes={['secondary', 'sm', 'left']}
                        placeholder={t(s_el.text)}
                        onChange={() => {
                          setActive(null)
                          setShow(false)
                        }}
                      />
                    ))
                  }
                </div>
              }
            </div>
          )
        }
      </menu>
    </>
  )
}

export default Menu
