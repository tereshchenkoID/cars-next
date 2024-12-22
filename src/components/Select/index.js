import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import { DEFAULT } from '@/constant/config'

import Select from 'react-select'

import './default.scss'

import style from './index.module.scss'

const CustomSelect = ({
  id,
  placeholder,
  options, 
  data, 
  onChange,
  isAsync = false,
  isDisabled = false
}) => {
  const t = useTranslations()
  const [search, setSearch] = useState([...options])
  const selectRef = useRef()
  const selectedOption = options.find(option => option.value === data)

  const handleSelectChange = selectedOption => {
    onChange(selectedOption?.value)
  }

  const handleSearch = inputValue => {
    setSearch(
      options.filter(
        option => option.label.toLowerCase().includes(inputValue.toLowerCase())
      ),
    )
  }

  useEffect(() => {
    if(isAsync) {
      setSearch(options)
    }
  }, [options])

  return (
    <div 
      className={
        classNames(
          style.block,
          isDisabled && style.disabled,
        )
      }
    >
      <Select
        ref={selectRef}
        instanceId={id}
        placeholder={placeholder || t('all')}
        options={search}
        value={selectedOption || DEFAULT}
        onChange={handleSelectChange}
        onInputChange={handleSearch}
        className="react-select-container"
        classNamePrefix="react-select"
        isClearable
      />
    </div>
  )
}

export default CustomSelect