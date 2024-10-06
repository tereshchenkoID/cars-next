"use client"

import { useSelector } from 'react-redux'

import Link from 'next/link'
import Picture from '@/components/Picture'

import style from './index.module.scss'

const Logo = () => {
  const settings = useSelector((state) => state.settings)

  return (
    <Link
      href={'/'}
      rel="noreferrer"
      className={style.block}
      aria-label="Logo"
    >
      <Picture
        src={settings.assets.logo}
        alt={"logo"}
      />
    </Link>
  )
}

export default Logo
