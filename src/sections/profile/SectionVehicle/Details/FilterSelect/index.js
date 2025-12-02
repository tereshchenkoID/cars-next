import { useTranslations } from 'next-intl'

import { DEFAULT } from 'constant/config'

import { useFiltersStore } from 'stores/filtersStore'

import Select from 'components/Select'

const FilterSelect = ({
  filter,
  handlePropsChange,
  name,
  isRequired= false
}) => {
  const t = useTranslations()
  const { filters} = useFiltersStore()

  const createOptions = (t, filters, key) =>
    Object.entries(filters[key].options).map(([optionKey, optionValue]) => ({
      value: optionKey,
      label: optionKey === DEFAULT
        ? t('all')
        : (filters.translation === DEFAULT
          ? optionValue
          : t(`filters.${key}.${optionKey}`))
    }))

  return (
    <Select
      id={`select_${name}`}
      options={createOptions(t, filters, name)}
      data={filter[name].id || DEFAULT}
      onChange={(value) =>
        handlePropsChange(`details.${name}`, { id: value, name: t(`filters.${name}.${value}`) })
      }
      isRequired={isRequired}
      isLabel={true}
      label={t(`filters.${name}.0`)}
    />
  )
}

export default FilterSelect
