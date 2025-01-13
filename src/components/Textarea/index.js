import classNames from 'classnames'

import style from './index.module.scss'

const Textarea = ({
  placeholder,
  data,
  onChange,
  classes = null,
  isRequired = false,
  isDisabled = false,
}) => {

  return (
    <div
      className={
        classNames(
          style.block,
          isDisabled && style.disabled,
          classes && classes.map(el => style[el]),
        )
      }
    >
      <textarea
        className={style.input}
        value={data === null || undefined ? "" : data}
        onChange={e => {
          onChange(e.currentTarget.value)
        }}
        placeholder={placeholder}
        autoComplete={'off'}
        required={isRequired}
      >
      </textarea>
    </div>
  )
}

export default Textarea
