"use client"

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import style from './index.module.scss'

const AdvancedSearch = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {t(NAVIGATION.advanced_search.text)}
    </div>
  )
}

export default AdvancedSearch