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
  min = null,
  max = null,
}) => {

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
        type={type}
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
      {(type === 'datetime-local' || type === 'date') && (
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
      )}
    </div>
  )
}

export default Field
