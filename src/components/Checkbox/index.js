import classNames from 'classnames'

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
        checked={data === "1"}
        onChange={() => {
          onChange(data === "1" ? "0" : "1")
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
