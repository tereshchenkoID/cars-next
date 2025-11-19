import { useState, cloneElement, useEffect } from 'react'
import classNames from 'classnames'

import Icon from 'components/Icon'
import Label from 'components/Label'

import style from './index.module.scss'

const InputGroup = ({
  children,
  value,
  rules = [],
  label,
  onValidationChange,
  isRequired = false
}) => {
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)

  const validate = (value) => {
    for (let rule of rules) {
      const errorMessage = rule(value)
      if (errorMessage) {
        setError(errorMessage)
        onValidationChange(false)
        return
      }
    }
    setError('')
    onValidationChange(true)
  }

  useEffect(() => {
    if (value !== '') {
      validate(value)
      setTouched(true)
    }
    else {
      if(touched) {
        validate(value)
      }
    }
  }, [value])

  return (
    <div
      className={
        classNames(
          style.block,
          touched && style[error ? 'warning' : 'success']
        )
      }
    >
      {
        label &&
        <Label
          data={label}
          isRequired={isRequired}
        />
      }
      <div className={style.field}>
        {
          touched &&
          <Icon
            className={style.status}
            iconName={error ? 'warning' : 'success'}
            width={16}
            height={16}
          />
        }
        {
          cloneElement(children)
        }
      </div>
      {
        (touched && error) &&
        <span className={style.rules}>{error}</span>
      }
    </div>
  )
}

export default InputGroup
