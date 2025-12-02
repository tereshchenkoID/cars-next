"use client"

import { useSettingsStore } from 'stores/settingsStore'

import Link from 'next/link'
import Picture from 'components/Picture'

import style from './index.module.scss'

const Logo = () => {
  const { settings } = useSettingsStore()

  return (
    <Link
      href={'/'}
      rel="noreferrer"
      className={style.block}
      aria-label="Logo"
    >
      <Picture
        src={settings?.assets?.logo}
        alt={"logo"}
      />
    </Link>
  )
}

export default Logo
