import classNames from 'classnames'

import style from './index.module.scss'

const Loading = ({ classes }) => {
  return (
    <div className={classNames(style.block, style[classes] || classes)}>
      <div className={style.item} />
      <div className={style.item} />
      <div className={style.item} />
    </div>
  )
}

export default Loading
