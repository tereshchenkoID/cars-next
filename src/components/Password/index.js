import { useState } from 'react'

import classNames from 'classnames'

import Field from 'components/Field'
import Icon from 'components/Icon'

import style from './index.module.scss'

const Password = ({
  placeholder,
  data,
  onChange,
  classes = null,
  isRequired = false,
  isDisabled = false,
  isLabel = false,
  label = null,
}) => {
  const [show, setShow] = useState(false)

  return (
    <div
      className={
        classNames(
          style.block,
          isDisabled && style.disabled,
        )
      }
    >
      <Field
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        data={data}
        classes={classes}
        onChange={onChange}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isClear={false}
        isLabel={isLabel}
        label={label}
      />
      <button
        type={'button'}
        className={style.eye}
        onClick={() => setShow(!show)}
        aria-label={'Show password'}
      >
        <Icon
          iconName={show ? 'eye' : 'eye-slash'}
          width={18}
          height={18}
        />
      </button>
    </div>
  )
}

export default Password
