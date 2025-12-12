import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { DEFAULT, NAVIGATION } from 'constant/config'

import { getYears } from 'helpers/getYears'

import Reference from 'components/Reference'
import Checkbox from 'components/Checkbox'
import Select from 'components/Select'
import Field from 'components/Field'

// const Select = dynamic(() => import('components/Select'), { ssr: false })

import style from './index.module.scss'

const Filters = () => {
  const t = useTranslations()
  const brands = useSelector((state) => state.brands)
  const [search, setSearch] = useState({
    vat_reclaimable: DEFAULT,
    year_from: DEFAULT,
    price_to: DEFAULT,
    mileage_from: DEFAULT,
    make: DEFAULT,
    model: DEFAULT
  })

  const generateParams = () => {
    const params = new URLSearchParams();

    Object.entries(search).forEach(([key, value]) => {
      if (value !== DEFAULT) {
        if (key === "make") {
          params.append(`make_${value?.id}`, search.model || DEFAULT)
        } else if (key !== "model") {
          params.append(key, value)
        }
      }
    })

    return params.size > 0 ? `?${params.toString()}` : ''
  }

  const handleChange = (key, value) => {
    setSearch((prev) => {
      if (key === 'make') {
        return {
          ...prev,
          make: value,
          model: DEFAULT
        }
      }
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  return (
    <div className={style.block}>
      <div className={style.body}>
        <Select
          id={'select_make'}
          options={
            brands.map(make => ({
              value: make,
              label: make.name,
            }))
          }
          placeholder={t('make')}
          data={search.make || DEFAULT}
          onChange={(value) => handleChange('make', value)}
        />
        <Select
          id={'select_model'}
          options={
            search.make !== DEFAULT
            ?
              search.make.options.map(model => ({
                value: model.id,
                label: model.name,
              }))
            :
              []
          }
          placeholder={t('model')}
          data={search.model || DEFAULT}
          onChange={(value) => handleChange('model', value)}
          isAsync={true}
          isDisabled={search.make === DEFAULT}
        />
        <Field
          type={'number'}
          placeholder={t('home_filters.mileage')}
          data={search.mileage_from !== DEFAULT ? search.mileage_from : ''}
          onChange={(value) => handleChange('mileage_from', value)}
        />
        <Select
          id={'select_year_from'}
          options={
            getYears().map(year => ({
              value: year === DEFAULT ? DEFAULT : year,
              label: year === DEFAULT ? t('home_filters.year') : year,
            }))
          }
          placeholder={t('home_filters.year')}
          data={search.year_from || DEFAULT}
          onChange={(value) => handleChange('year_from', value)}
        />
        <Field
          type={'number'}
          placeholder={t('home_filters.price')}
          data={search.price_to !== DEFAULT ? search.price_to : ''}
          onChange={(value) => handleChange('price_to', value)}
        />
        <Checkbox
          placeholder={t('filters.vat_reclaimable.0')}
          data={search.vat_reclaimable}
          onChange={(value) => handleChange('vat_reclaimable', value)}
        />
      </div>
      <div className={style.footer}>
        <Reference
          link={`${NAVIGATION.advanced_search.link}${generateParams()}`}
          classes={['reference']}
          placeholder={t(NAVIGATION.advanced_search.text)}
        />
        <Reference
          link={`${NAVIGATION.buy.link}${generateParams()}`}
          classes={['primary', 'md', style.button]}
          placeholder={t('offers')}
        />
      </div>
    </div>
  )
}

export default Filters
