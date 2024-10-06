"use client"

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import style from './index.module.scss'

const Reviews = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {t(NAVIGATION.reviews.text)}
    </div>
  )
}

export default Reviews