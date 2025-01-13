import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Accordion = ({
  data,
  action,
  placeholder,
  icon,
  children
}) => {

  return (
    <div
      className={
        classNames(
          style.block,
          data && style.active
        )
      }
    >
      <div
        className={style.head}
        role={'button'}
        onClick={action}
      >
        <Icon
          className={style.icon}
          iconName={icon}
        />
        <span>{placeholder}</span>
        <Icon
          className={style.arrow}
          iconName={'angle-down'}
          width={16}
          height={16}
        />
      </div>
      <div className={style.body}>
        <div className={style.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Accordion
