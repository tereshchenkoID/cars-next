import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Field = ({
  type,
  placeholder,
  data,
  onChange,
  classes = null,
  isRequired = false,
  isDisabled = false,
  isClear = true,
  min = null,
  max = null,
}) => {
  const t = useTranslations()

  return (
    <div
      className={
        classNames(
          style.block,
          isDisabled && style.disabled,
          classes && classes.map(el => style[el]),
        )
      }
    >
      <input
        className={style.input}
        type={type || 'text'}
        value={data === null || undefined ? "" : data}
        onChange={e => {
          onChange(e.currentTarget.value)
        }}
        placeholder={placeholder}
        autoComplete={'off'}
        required={isRequired}
        min={min}
        max={max}
      />
      {
        (type === 'datetime-local' || type === 'date')
          ?
            <button
              type={'button'}
              className={style.icon}
            >
              <Icon
                iconName={'calendar-days'}
                width={18}
                height={18}
              />
            </button>
          :
            (isClear && data?.length > 0) &&
              <button
                type={'button'}
                className={style.close}
                onClick={() => onChange('')}
                aria-label={t('close')}
                title={t('close')}
              >
                <Icon
                  iconName={'xmark'}
                  width={16}
                  height={16}
                />
              </button>
      }
    </div>
  )
}

export default Field
