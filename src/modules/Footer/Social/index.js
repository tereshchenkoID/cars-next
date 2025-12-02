"use client"

import { useSettingsStore } from 'stores/settingsStore'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Social = () => {
  const { settings } = useSettingsStore()

  return (
    <div className={style.block}>
      {
        settings?.social?.map((el, idx) => (
          <a
            key={idx}
            className={style.link}
            href={el.link}
            target="_blank"
            rel="noreferrer"
            aria-label={el.icon}
          >
            <Icon
              iconName={el.icon}
              width={18}
              height={18}
            />
          </a>
        ))
      }
    </div>
  )
}

export default Social
