import classNames from 'classnames'

import style from './index.module.scss'

const Loader = ({ type = 'content', classes }) => {
  return (
    <div className={classNames(style.block, style[type], classes)}>
      <div className={style.item} />
    </div>
  )
}

export default Loader
