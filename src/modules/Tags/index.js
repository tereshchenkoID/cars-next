import { useState } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'
import style from './index.module.scss'

const COUNT = 4

const Tags = ({ data }) => {
  const t = useTranslations()
  const [show, setShow] = useState(false)
  const totalItems = data.length
  const hiddenItemsCount = totalItems - COUNT

  if(!data)
    return 

  return (
    <ul className={style.block}>
      {data.slice(0, show ? totalItems : COUNT).map((el, idx) => (
        <li 
          key={idx} 
          className={style.tag}
        >
          {t(`features.${el.parentId}.${el.id}`)}
        </li>
      ))}
      {hiddenItemsCount > 0 && (
        <li
          className={classNames(style.tag, style.alt)}
          onClick={() => setShow(!show)}
        >
          {show ? `- ${t('hide')}` : `+ ${hiddenItemsCount} ${t('more')}`}
        </li>
      )}
    </ul>
  )
}

export default Tags
