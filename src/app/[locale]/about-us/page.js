"use client"

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import style from './index.module.scss'

const About = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {t(NAVIGATION.about_us.text)}
    </div>
  )
}

export default About