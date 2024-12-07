import classNames from 'classnames'

import style from './index.module.scss'

const Skeleton = () => {

  return (
    <div className={style.block}>
      <div className={style.image} />
      <div className={style.body}>
        <div 
          className={
            classNames(
              style.row,
              style.column,
              style.left
            )
          }
          style={{
            gridArea: '1 / 1 / 2 / 3'
          }}
        >
          <div className={style.content} style={{ width: '45%' }} />
          <div className={style.content} style={{ width: '55%' }} />
        </div>
        <hr 
          className={style.hr} 
          style={{
            gridArea: '2 / 1 / 3 / 3'
          }}
        />
        <div 
          className={
            classNames(
              style.row,
              style.column,
              style.left
            )
          }
          style={{
            gridArea: '3 / 1 / 4 / 2'
          }}
        >
          <div className={style.content} style={{ width: '75%' }} />
          <div className={style.content} style={{ width: '75%' }} />
        </div>
        <div 
          className={
            classNames(
              style.row,
              style.column,
              style.right
            )
          }
          style={{
            gridArea: '3 / 2 / 4 / 3'
          }}
        >
          <div className={style.content} style={{ width: '75%' }} />
          <div className={style.content} style={{ width: '75%' }} />
        </div>
        <hr 
          className={style.hr} 
          style={{
            gridArea: '4 / 1 / 5 / 3'
          }}
        />
        <div 
          className={
            classNames(
              style.row,
              style.column,
              style.right
            )
          }
          style={{
            gridArea: '5 / 1 / 6 / 3'
          }}
        >
          <div className={style.content} style={{ width: '75%' }} />
          <div className={style.content} style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
