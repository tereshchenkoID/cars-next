import classNames from 'classnames'

import { ACTIVE, DEFAULT } from '@/constant/config'

import Image from 'next/image'

import style from './index.module.scss'

const Checkbox = ({
  image = false,
  data,
  placeholder,
  classes = null,
  isDisabled = false,
  onChange,
}) => {
  return (
    <label
      className={
        classNames(
          style.block,
          isDisabled && style.disabled,
          classes && classes.map(el => style[el] || el),
        )
      }
    >
      <input
        type={'checkbox'}
        className={style.input}
        checked={data === ACTIVE}
        onChange={() => {
          onChange(data === ACTIVE ? DEFAULT : ACTIVE)
        }}
      />
      <span className={style.item} />
      <span className={style.wrapper}>
        {
          image &&
          <Image
            src={image.url}
            width={image.width}
            height={image.height}
            alt={image.alt}
            className={style.image}
            priority={true}
          />
        }  
        <span>{placeholder}</span>
      </span>
    </label>
  )
}

export default Checkbox
