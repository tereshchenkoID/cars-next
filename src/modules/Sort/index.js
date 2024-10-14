import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const TYPES = [
  {
    id: 0,
    params: null,
    text: 'newest_ad'
  },
  {
    id: 1,
    params: ['price', 'asc'],
    text: 'lowest_price'
  },
  {
    id: 2,
    params: ['price', 'desc'],
    text: 'highest_price'
  }
]

const Sort = () => {
  const t = useTranslations()
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(TYPES[0])

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
        <strong>1 113 386</strong>
        <span>results</span>
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
          aria-label={t(active.text)}
          title={t(active.text)}
          ref={buttonRef}
          onClick={() => setShow(!show)}
        >
          <span>{t(active.text)}</span>
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
              TYPES.map((el, idx) => 
                <li 
                  key={idx}
                  className={
                    classNames(
                      style.item,
                      active.id == el.id && style.active
                    )
                  }
                  onClick={() => {
                    setActive(el)
                    setShow(false)
                  }}
                >
                  {t(el.text)}
                </li>
              )
            }
          </ul>
        }
      </div>
    </div>
  )
}

export default Sort
