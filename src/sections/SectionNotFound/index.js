"use client"

import { useTranslations } from 'next-intl'

import { NAVIGATION } from 'constant/config'

import Image from 'next/image'
import Link from 'next/link'
import Icon from 'components/Icon'
import Container from "components/Container"

import style from './index.module.scss'

const LINKS = [
  {
    icon: 'icon-home',
    link: NAVIGATION.home.link,
    text: NAVIGATION.home.text,
  },
  {
    icon: 'icon-find',
    link: NAVIGATION.buy.link,
    text: NAVIGATION.buy.text,
  },
  // {
  //   icon: 'icon-find',
  //   link: NAVIGATION.buy.link,
  //   text: NAVIGATION.buy.text,
  // },
]

const SectionNotFound = () => {
  const t = useTranslations()

  return (
    <section className={style.block}>
      <Container classes={style.container}>
        <div className={style.info}>
          <div>
            <p className={style.code}>{t('notification.404_error')}</p>
            <h1 className={style.title}>{t('notification.404_title')}</h1>
            <p className={style.text}>{t('notification.404_text')}</p>
          </div>
          <div>
            <Image
              src={'/images/404.webp'}
              width={1392}
              height={640}
              className={style.image}
              priority={true}
              alt={t('notification.404_title')}
            />
            </div>
        </div>
        <div className={style.links}>
          {
            LINKS.map((el, idx) =>
              <Link
                key={idx}
                href={el.link}
                rel="noreferrer"
                className={style.link}
                aria-label={t(el.text)}
                title={t(el.text)}
              >
                <Icon
                  iconName={el.icon}
                  className={style.icon}
                  width={40}
                  height={40}
                />
                {t(el.text)}
                <Icon
                  iconName={'arrow-right'}
                  className={style.arrow}
                  width={24}
                  height={24}
                />
              </Link>
            )
          }
        </div>
      </Container>
    </section>
  )
}

export default SectionNotFound
