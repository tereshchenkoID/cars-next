import Link from 'next/link'

import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Reference = ({
  link,
  placeholder,
  classes = ['primary'],
  onChange = () => { },
  icon = false,
  isDisabled = false,
  isActive = false,
  title = false
}) => {
  return (
    <Link
      href={link}
      rel="noreferrer"
      className={
        classNames(
          style.block,
          isActive && style.active,
          isDisabled && style.disabled,
          classes && classes.map(el => style[el] || el),
        )
      }
      aria-label={title || placeholder || icon}
      title={title || placeholder || icon}
      onClick={onChange}
    >
      {
        icon &&
        <Icon
          iconName={icon}
          className={style.icon}
        />
      }
      {placeholder && placeholder}
    </Link>
  )
}

export default Reference
