import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Option = ({ size, iconSize, iconName, label, text }) => {

  return (
    <div
      className={
        classNames(
          style.block,
          style[size]
        )
      }
    >
      <Icon
        iconName={iconName}
        width={iconSize}
        height={iconSize}
        className={style.icon}
      />
      <div>
        {label && <p className={style.label}>{label}</p>}
        <p className={style.text}>{text}</p>
      </div>
    </div>
  )
}

export default Option
