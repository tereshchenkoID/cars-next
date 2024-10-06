"use client"

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import style from './index.module.scss'

const NewAuto = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {t(NAVIGATION.new_auto.text)}
    </div>
  )
}

export default NewAuto