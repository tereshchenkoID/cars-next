"use client"

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import Image from 'next/image'
import Reference from '@/components/Reference'

import style from './index.module.scss'

const EmptyCars = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      <Image
        width={419}
        height={337}
        className={style.decor}
        src={`/images/favorite-cars.svg`}
        priority={true}
        alt={'Not found'}
      />
      <p>{t('notification.empty')}</p>
      <Reference
        link={`${NAVIGATION.buy.link}?sort=3`}
        classes={['primary', 'md', style.link]}
        placeholder={t('offers')}
      />
    </div>
  )
}

export default EmptyCars
