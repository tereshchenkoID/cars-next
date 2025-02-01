import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Sort = ({ 
  results,
  search,
  handleChange
}) => {
  const t = useTranslations()
  const active = search.sort
  const [show, setShow] = useState(false)

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setShow(null),
    { buttonRef }
  )

  return (
    <div className={style.block}>
      <p className={style.counts}>
        <strong>{results}</strong>
        <span>{t('cars')}</span>
      </p>
      <hr className={style.hr} />
      <div className={style.dropdown}>
        <button
          type="button"
          className={
            classNames(
              style.toggle,
              show && style.active
            )
          }
          aria-label={t(`filters.favorites.${active}`)}
          title={t(`filters.favorites.${active}`)}
          ref={buttonRef}
          onClick={() => setShow(!show)}
        >
          <span>{t(`filters.favorites.${active}`)}</span>
          <Icon
            iconName={'angle-down'}
            width={12}
            height={12}
            className={style.arrow}
          />
        </button>
        {
          show &&
          <ul
            ref={blockRef}
            className={style.list}
          >
            {
              Array.from({ length: 7 }, (_, i) => (
                <li
                  key={i}
                  className={
                    classNames(
                      style.item,
                      active == i && style.active
                    )
                  }
                  onClick={() => {
                    handleChange('sort', i)
                    setShow(false)
                  }}
                >
                  {t(`filters.favorites.${i}`)}
                </li>
              ))
            }
          </ul>
        }
      </div>
    </div>
  )
}

export default Sort
