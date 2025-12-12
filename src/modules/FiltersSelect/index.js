import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { DEFAULT } from 'constant/config'

import Select from 'components/Select'

const FiltersSelect = ({
  placeholder,
  options,
  data,
  onChange,
  isRequired= false,
  isLabel = false,
  label = null
}) => {
  const t = useTranslations()
  const filters = useSelector((state) => state.filters)

  return (
    <Select
      id={`select_${placeholder}`}
      options={
        options ||
        Object.entries(filters[placeholder].options).map(([optionKey, _]) => ({
          value: optionKey,
          label: optionKey === DEFAULT ? t('all') : t(`filters.${placeholder}.${optionKey}`),
        }))
      }
      data={data?.value[0] || DEFAULT}
      onChange={(value) =>
        onChange(value)
      }
      isRequired={isRequired}
      isLabel={isLabel}
      label={label}
    />
  )
}

export default FiltersSelect
