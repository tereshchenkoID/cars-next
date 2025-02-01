"use client"

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import classNames from 'classnames'

import { ROUTES_USER } from '@/constant/config'

import Link from 'next/link'
import Container from "@/components/Container"

import style from './index.module.scss'

const MENU = [
  ROUTES_USER.settings,
  ROUTES_USER.favorite,
  ROUTES_USER.vehicles,
  ROUTES_USER.archive,
  ROUTES_USER.notification,
  ROUTES_USER.chat,
]

const SectionProfile = () => {
  const t = useTranslations()
  const pathname = usePathname()

  const isActiveLink = (link) => {
    const url = pathname.split('/')
    return url.includes(link.replace('/profile/', ''))
  }

  return (
    <nav className={style.nav}>
      <Container classes={style.container}>
        {
          MENU.map((el, idx) =>
            <Link
              key={idx}
              href={el.link}
              rel="noreferrer"
              className={
                classNames(
                  style.link,
                  isActiveLink(el.link) && style.active,
                )
              }
            >
              {t(el.text)}
            </Link>
          )
        }
      </Container>
    </nav>
  )
}

export default SectionProfile