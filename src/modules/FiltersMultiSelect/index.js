import { useState, useRef, Fragment } from 'react'
import { useTranslations } from 'next-intl'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import { ACTIVE, DEFAULT } from '@/constant/config'

import classNames from 'classnames'

import Icon from '@/components/Icon'
import Checkbox from '@/components/Checkbox'

import style from './index.module.scss'

const FiltersMultiSelect = ({
  placeholder,
  options,
  data,
  onChange,
  isDisabled = false,
}) => {
  const t = useTranslations()
  const blockRef = useRef(null)
  const buttonRef = useRef(null)
  const [isShow, setIsShow] = useState(false)

  useOutsideClick(blockRef, () => setIsShow(false), { buttonRef })

  const renderSelectedValues = () => {
    if (!data?.value) return t('all')

    return data.value.map((el, idx) => (
      <Fragment key={el}>
        {el === DEFAULT ? t('all') : t(`filters.${placeholder}.${el}`)}
        {idx !== data.value.length - 1 && ', '}
      </Fragment>
    ))
  }

  const handleReset = () => onChange('checkbox', placeholder, DEFAULT)

  return (
    <div
      ref={blockRef}
      className={classNames(
        style.block,
        { [style.active]: isShow, [style.disabled]: isDisabled }
      )}
    >
      <div
        ref={buttonRef}
        className={style.input}
        onClick={() => setIsShow((prev) => !prev)}
      >
        <div className={style.list}>{renderSelectedValues()}</div>
      </div>
      <div className={style.indicators}>
        {(data && !data?.value?.includes(DEFAULT)) && (
          <button
            type="button"
            className={style.close}
            onClick={handleReset}
            aria-label={t('remove')}
            title={t('remove')}
          >
            <Icon iconName="xmark" width={12} height={12} />
          </button>
        )}
        <hr className={style.hr} />
        <span 
          className={style.icon}
          onClick={() => setIsShow((prev) => !prev)}
        >
          <Icon iconName="angle-down" width={14} height={14} />
        </span>
      </div>
      {isShow && (
        <ul className={style.dropdown}>
          {Object.entries(options).map(([key, value]) => (
            <li key={value} className={style.item}>
              <Checkbox
                placeholder={key === DEFAULT ? t('all') : t(`filters.${placeholder}.${key}`)}
                onChange={() => onChange('checkbox', placeholder, key)}
                data={data?.value?.includes(key) ? ACTIVE : DEFAULT}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FiltersMultiSelect
