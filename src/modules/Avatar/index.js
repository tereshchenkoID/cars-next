import classNames from 'classnames'

import style from './index.module.scss'

const Avatar = ({ size }) => {

  return (
    <div
      className={
        classNames(
          style.block,
          style[size]
        )
      }
    />
  )
}

export default Avatar
