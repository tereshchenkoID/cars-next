import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useSelector, useDispatch } from 'react-redux'
import { DEFAULT } from '@/constant/config'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { setSearch } from '@/store/actions/searchAction'

import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Sort = ({ pagination, handleLoad }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const search = useSelector((state) => state.search)
  const filters = useSelector((state) => state.filters)
  const active = search.sort?.value[0]
  const [show, setShow] = useState(false)

  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setShow(null),
    { buttonRef }
  )

  const handleChange = (value) => {
    let a = JSON.parse(JSON.stringify(search))
    a = {
      ...a,
      sort: {
        value: [
          value
        ]
      },
      page: {
        value: [
          DEFAULT
        ]
      }
    }

    dispatch(setSearch(a))

    handleLoad(0)
    setShow(false)
  }

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
                      onClick={() => handleChange(key)}
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
