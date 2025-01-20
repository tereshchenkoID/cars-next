import React from 'react'

import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Button = React.forwardRef(({
  type = 'button',
  placeholder,
  classes = ['primary'],
  onChange = () => {},
  icon = false,
  isDisabled = false,
  isActive = false,
  title = false,
}, ref
) => {

  return (
    <button
      ref={ref}
      type={type}
      className={
        classNames(
          style.block,
          isActive && style.active,
          classes && classes.map(el => style[el] || el),
        )
      }
      disabled={isDisabled}
      onClick={onChange}
      aria-label={title || placeholder || icon}
      title={title || placeholder || icon}
    >
       {
        icon &&
          <Icon
            iconName={icon}
            className={style.icon}
          />
      }
      {placeholder && placeholder}
    </button>
  )
})

Button.displayName = 'Button'

export default Button