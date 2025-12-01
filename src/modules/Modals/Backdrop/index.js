import { useEffect } from 'react'
import classNames from 'classnames'

import { overflowBody } from 'helpers/overflowBody'

import style from './index.module.scss'

const Backdrop = ({
  data = false,
  onChange = () => {},
  size = 'sm'
}) => {
  useEffect(() => {
    overflowBody(data)
  }, [data])

  if (!data) return

  return (
    <div
      className={
        classNames(
          style.block,
          style[size]
        )
      }
      onClick={onChange}
    />
  )
}

export default Backdrop
