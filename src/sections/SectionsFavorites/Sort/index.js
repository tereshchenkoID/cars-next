import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const SORT = {
  0: 'Recommended',
  1: 'Lowest price',
  2: 'Highest price',
  3: 'Newest first',
  4: 'Latest discount',
  5: 'Lowest mileage',
  6: 'By brand'
}

const Sort = ({ favoriteProps }) => {
  const t = useTranslations()
  const {
    handleChange,
    pagination,
    search,
  } = favoriteProps

  const active = search.sort
  const [show, setShow] = useState(false)

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setShow(null),
    { buttonRef }
  )

  console.log(search.sort)

  return (
    <div className={style.block}>
      <p className={style.counts}>
        <strong>{pagination.results}</strong>
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
          // aria-label={t(`filters.sort.${active}`)}
          // title={t(`filters.sort.${active}`)}
          ref={buttonRef}
          onClick={() => setShow(!show)}
        >
          <span>{SORT[active]}</span>
          {/* <span>{t(`filters.sort.${active}`)}</span> */}
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
              Object.entries(SORT).map(([key]) =>
                <li
                  key={key}
                  className={
                    classNames(
                      style.item,
                      active == key && style.active
                    )
                  }
                  onClick={() => {
                    handleChange('sort', key)
                    setShow(false)
                  }}
                >
                  {SORT[key]}
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
