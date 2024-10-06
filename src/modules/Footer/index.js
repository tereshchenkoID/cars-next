import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/Container'
import Social from '@/modules/Social'
import Logo from '@/components/Logo'

import style from './index.module.scss'

const PAYMENTS = [
  'visa',
  'visa-electron',
  'mastercard',
  'maestro',
  'diners-club',
  'discover',
]

const MENU = [
  {
    title: 'menu',
    submenu: [
      NAVIGATION.buy,
      NAVIGATION.new_auto,
      NAVIGATION.about_us
    ]
  },
  {
    title: 'services',
    submenu: []
  },
  {
    title: 'company',
    submenu: [
      NAVIGATION.about_us,
      NAVIGATION.how_it_works,
      NAVIGATION.reviews,
    ]
  }
]

const Footer = () => {
  const t = useTranslations()

  return (
    <footer className={style.block}>
      <Container>
        <div className={style.top}>
          <div className={style.column}>
            <Logo />
            <p className={style.text}>Carvago 2024 • All rights reserved</p>
            <Social />
          </div>
          <div className={style.column}>
            {
              MENU.map((el, idx) =>
                <ul
                  key={idx}
                  className={style.submenu}
                >
                  <li className={style.item}>
                    <h6>{t(el.title)}</h6>
                  </li>
                  {
                    el.submenu.map((sublink, index) =>
                      <li
                        className={style.item}
                        key={index}
                      >
                        <Link
                          href={sublink.link}
                          rel="noreferrer"
                          className={style.link}
                        >
                          {t(sublink.text)}
                        </Link>
                      </li>
                    )
                  }
                </ul>
              )
            }
          </div>
        </div>
        <div className={style.bottom}>
          <p className={style.transfer}>{t('notification.payement')}</p>
          <div className={style.payments}>
            {
              PAYMENTS.map((el, idx) =>
                <Image
                  key={idx}
                  width={43}
                  height={28}
                  className={style.payment}
                  src={`/images/${el}.svg`}
                  priority={false}
                  alt={el}
                />
              )
            }
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
