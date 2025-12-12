import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { DEFAULT } from 'constant/config'

import Select from 'components/Select'

const FilterSelect = ({
  category,
  filter,
  name,
  handlePropsChange,
  isRequired= false,
  isLabel = true
}) => {
  const t = useTranslations()
  const filters = useSelector((state) => state.filters)

  const createOptions = () =>
    Object.entries(filters[name].options).map(([optionKey, optionValue]) => ({
      value: optionKey,
      label: optionKey === DEFAULT
        ? t('all')
        : (filters.translation === DEFAULT
          ? optionValue
          : t(`filters.${name}.${optionKey}`))
    }))

  return (
    <Select
      id={`select_${name}`}
      options={createOptions()}
      data={filter[name].id || DEFAULT}
      onChange={(value) =>
        handlePropsChange(`${category}.${name}`, { id: value, name: t(`filters.${name}.${value}`) })
      }
      isRequired={isRequired}
      isLabel={isLabel}
      label={t(`filters.${name}.0`)}
    />
  )
}

export default FilterSelect
