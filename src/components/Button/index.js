import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Button = ({
  type = 'button',
  placeholder,
  classes = ['primary'],
  onChange = () => {},
  icon = false,
  isDisabled = false,
  isActive = false,
}) => {

  return (
    <button
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
      aria-label={placeholder || 'Button'}
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
}

export default Button
