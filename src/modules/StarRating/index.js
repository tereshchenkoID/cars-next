import React, { Fragment } from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const FullStar = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} className={style.star}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const PartialStar = ({ percent }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={style.star}>
    <defs>
      <linearGradient id={`gradient-${percent}`}>
        <stop offset={`${percent}%`} stopColor="var(--color-gold)" />
        <stop offset={`${percent}%`} stopColor="var(--color-grey-300)" />
      </linearGradient>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={`url(#gradient-${percent})`}
    />
  </svg>
)

const StarRating = ({ data, size = 'sm' }) => {
  const totalStars = 5

  const stars = Array.from({ length: totalStars }, (_, index) => {
    const starValue = index + 1
    if (data >= starValue) return 'full'
    if (data > index && data < starValue) return 'partial'
    return 'empty'
  })

  return (
    <div 
      className={
        classNames(
          style.block,
          style[size]
        )
      }
    >
      <h6 className={style.title}>{Number(data).toFixed(1)}</h6>
      <div className={style.stars}>
        {stars.map((type, index) => (
          <Fragment key={index}>
            {type === 'full' && <FullStar color={'var(--color-gold)'} />}
            {type === 'partial' && <PartialStar percent={(data - Math.floor(data)) * 100} />}
            {type === 'empty' && <FullStar color={'var(--color-grey-300)'}/>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default StarRating