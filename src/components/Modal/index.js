import { useEffect } from 'react'
import classNames from 'classnames'

import { overflowBody } from 'helpers/overflowBody'

import Button from 'components/Button'

import style from './index.module.scss'

const Modal = ({ children, onClose, title }) => {
  useEffect(() => {
    overflowBody(children)
  }, [children])

  return (
    <div
      className={
        classNames(
          style.block,
          title && style.alt
        )
      }
      onClick={onClose}
    >
      <div
        className={style.content}
        onClick={e => e.stopPropagation()}
      >
        <div className={style.wrapper}>
          <Button
            classes={['secondary', 'square', 'md', style.close]}
            icon={'xmark'}
            onChange={onClose}
          />
          {
            title &&
            <div className={style.header}>
              <h5 className={style.title}>{title}</h5>
            </div>
          }
          <div className={style.body}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
