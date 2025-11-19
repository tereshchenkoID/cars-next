import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'

import classNames from 'classnames'

import Label from 'components/Label'

import { DEFAULT } from 'constant/config'

import './default.scss'
import style from './index.module.scss'

const createLoadingComponent = (placeholder) => () => (
  <div className={style.loading}>{placeholder}</div>
)

const CustomDynamicSelect = (placeholder) => dynamic(
  () => import('react-select'),
  {
    ssr: false,
    loading: createLoadingComponent(placeholder),
  }
)

const CustomSelect = ({
  id,
  placeholder,
  options,
  data,
  onChange,
  isAsync = false,
  isDisabled = false,
  isRequired = false,
  isLabel = false,
  label = null,
}) => {
  const t = useTranslations()
  const [search, setSearch] = useState([...options] || [])
  const selectRef = useRef()
  const selectedOption = options.find(option => option.value === data)
  const Select = useMemo(() => CustomDynamicSelect(placeholder || t('all')), [placeholder, t])

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
      {
        isLabel &&
        <Label
          data={label || placeholder}
          isRequired={isRequired}
        />
      }
      <div className={style.wrapper}>
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
          required={isRequired}
          isClearable
        />
      </div>
    </div>
  )
}

CustomSelect.displayName = 'CustomSelect'

export default CustomSelect
