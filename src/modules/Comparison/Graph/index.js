import classNames from 'classnames'

import style from './index.module.scss'

const Graph = ({ active }) => {

  return (
    <div className={style.block}>
      {
        Array.from({ length: 5 }, (_, idx) =>
          <div 
            key={idx} 
            className={
              classNames(
                style.scale,
                active === idx && style.active
              )
            }
          />
        )
      }
    </div>
  )
}

export default Graph