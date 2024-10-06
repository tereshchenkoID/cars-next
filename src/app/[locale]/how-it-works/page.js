"use client"

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import style from './index.module.scss'

const HowItWorks = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {t(NAVIGATION.how_it_works.text)}
    </div>
  )
}

export default HowItWorks