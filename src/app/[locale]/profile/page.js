"use client"

import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

import style from './index.module.scss'

const Profile = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {t(ROUTES_USER.profile.text)}
    </div>
  )
}

export default Profile