import { useTranslations } from 'next-intl'

import { DEFAULT } from 'constant/config'

import { getYears } from 'helpers/getYears'

import Select from 'components/Select'

import style from '../../index.module.scss'

const MONTH = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const FilterDate = ({ filter, handlePropsChange, name }) => {
  const t = useTranslations()
  const date = new Date(Number(filter.date[name]))
  const month = date.getMonth()
  const year = date.getFullYear()

  const handleChange = (type, value) => {
    const newDate = new Date(date)

    if (type === 'month') {
      newDate.setMonth(value)
    }
    else {
      newDate.setFullYear(value)
    }

    newDate.setDate(1)
    handlePropsChange(`details.date.${name}`, newDate.getTime())
  }

  return (
    <div className={style.row}>
      <Select
        id='select_month'
        options={
          MONTH.map((month, idx) => ({
            value: idx,
            label: t(`month.${month}`),
          }))
        }
        data={month}
        onChange={(value) => handleChange('month', value)}
        isLabel={true}
        label={t(name)}
      />

      <Select
        id='select_year'
        options={
          getYears().slice(1).map(year => ({
            value: year === DEFAULT ? DEFAULT : year,
            label: year === DEFAULT ? t('all') : year,
          }))
        }
        data={year.toString()}
        onChange={(value) => handleChange('year', value)}
      />
    </div>
  )
}

export default FilterDate
