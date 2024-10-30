import { useState, cloneElement, useEffect } from 'react'

import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const InputGroup = ({
  children,
  value,
  rules = [],
  label,
  onValidationChange
}) => {
  const [error, setError] = useState('')

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
    validate(value)
  }, [value])

  return (
    <div 
      className={
        classNames(
          style.block,
          style[error ? 'warning' : 'success']
        )
      }
    >
      {label && <label className={style.label}>{label}</label>}
      <div className={style.field}>
        <Icon 
          className={style.status}
          iconName={error ? 'warning' : 'success'}
          width={16}
          height={16}
        />
        {cloneElement(children)}
      </div>
      {error && <span className={style.rules}>{error}</span>}
    </div>
  )
}

export default InputGroup
