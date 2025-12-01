import classNames from 'classnames'

import Icon from 'components/Icon'

import style from './index.module.scss'

const getIcon = (status) => {
  switch (status) {
    case 'verified':
      return 'success'
    case 'rejected':
      return 'warning'
    default:
      return 'warning'
  }
}

const Status = ({ data, type }) => {
  return (
    <div
      className={
        classNames(
          style.block,
          style[type]
        )
      }
    >
      <Icon
        iconName={getIcon(type)}
        width={16}
        height={16}
        className={style.icon}
      />
      {data}
    </div>
  )
}

export default Status
