"use client"

import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

import style from './index.module.scss'

const Favorite = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {t(ROUTES_USER.favorite.text)}
    </div>
  )
}

export default Favorite