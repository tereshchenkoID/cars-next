import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { useOutsideClick } from 'hooks/useOutsideClick'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Sort = ({ filtersProps }) => {
  const t = useTranslations()
  const {
    handleChange,
    pagination,
    filters,
    search,
  } = filtersProps

  const active = search?.sort?.value[0]
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
        <strong>{pagination.results}</strong>
        <span>{t('results')}</span>
      </p>
      {
        active &&
        <>
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
              aria-label={t(`filters.sort.${active}`)}
              title={t(`filters.sort.${active}`)}
              ref={buttonRef}
              onClick={() => setShow(!show)}
            >
              <span>{t(`filters.sort.${active}`)}</span>
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
                  Object.entries(filters.sort.options).map(([key]) =>
                    <li
                      key={key}
                      className={
                        classNames(
                          style.item,
                          active == key.toString() && style.active
                        )
                      }
                      onClick={() => {
                        handleChange('string', 'sort', key, true)
                        setShow(false)
                      }}
                    >
                      {t(`filters.sort.${key}`)}
                    </li>
                  )
                }
              </ul>
            }
            </div>
        </>
      }
    </div>
  )
}

export default Sort
