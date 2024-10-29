import classNames from 'classnames'

import style from './index.module.scss'

const Avatar = ({ size, src, alt }) => {

  return (
    <div
      className={
        classNames(
          style.block,
          style[size]
        )
      }
    >
      {
        src 
          ?
            <img 
              className={style.image}
              src={src} 
              loading={'lazy'}
              alt={alt}
            />
          :
            <span className={style.label}>{alt?.substring(0, 2) || 'P'}</span>
      }
    </div>
  )
}

export default Avatar
