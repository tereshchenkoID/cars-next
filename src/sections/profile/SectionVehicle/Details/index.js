import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import { DEFAULT } from 'constant/config'

import Button from 'components/Button'
import Field from 'components/Field'
import Select from 'components/Select'
import Textarea from 'components/Textarea'
import Accordion from 'modules/Accordion'
import FilterDate from '../modules/FilterDate'
import FilterSelect from '../modules/FilterSelect'

import style from '../index.module.scss'

// const getFilledPercent = (obj) => {
//   let filled = 0
//   let total = 0
//
//   function walk(value) {
//     // Примитивы (строки / числа)
//     if (typeof value !== 'object' || value === null) {
//       total++
//       if (value !== '' && value !== null && value !== undefined) filled++
//       return
//     }
//
//     // Если объект вида { id: "0", ... } → считать как поле
//     if ('id' in value) {
//       total++
//       if (value.id !== '0') filled++
//       return
//     }
//
//     // Массив
//     if (Array.isArray(value)) {
//       // одно поле считается заполненным, если хотя бы один непустой элемент
//       total++
//       const hasValue = value.some(v => v !== '' && v !== null && v !== undefined)
//       if (hasValue) filled++
//       return
//     }
//
//     // Обычный вложенный объект → пройтись по полям
//     for (const key in value) walk(value[key])
//   }
//
//   walk(obj)
//
//   return Math.round((filled / total) * 100)
// }

const Details = ({ filter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const brands = useSelector((state) => state.brands)
  const [toggle, setToggle] = useState(false)

  const searchMake = (id) => {
    return brands.find((brand) => brand.id === id)
  }

  const searchModel = (id) => {
    const make = brands.find((brand) => brand.id === filter.make.id)
    return make.options.find((model) => model.id === id)
  }

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'file'}
      placeholder={t('details')}
    >
      <form
        className={style.grid}
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
      >
        <Field
          placeholder={t('name')}
          data={filter.meta.name}
          onChange={(value) => handlePropsChange('details.meta.name', value)}
          isRequired={true}
          isLabel={true}
        />

        <Textarea
          placeholder={t('description')}
          data={filter.meta.description}
          onChange={(value) => handlePropsChange('details.meta.description', value)}
          isLabel={true}
        />

        <div className={style.list}>
          <Select
            id={'select_make'}
            options={
              brands.map(make => ({
                value: make.id,
                label: make.name,
              }))
            }
            placeholder={t('make')}
            data={filter.make.id || DEFAULT}
            onChange={(value) => handlePropsChange('details.make', { id: value, name: searchMake(value)?.name, slug: searchMake(value)?.slug })}
            isRequired={true}
            isLabel={true}
          />

          <Select
            id={'select_model'}
            options={
              filter.make.id !== DEFAULT
                ?
                  searchMake(filter.make.id).options.map(model => ({
                    value: model.id,
                    label: model.name,
                  }))
                :
                  []
            }
            placeholder={t('model')}
            data={filter.model.id || DEFAULT}
            onChange={(value) => handlePropsChange('details.model', { id: value, name: searchModel(value)?.name, slug: searchModel(value)?.slug })}
            isDisabled={filter.make.id === DEFAULT}
            isRequired={true}
            isAsync={true}
            isLabel={true}
          />

          <Field
            placeholder={t('vin_code')}
            data={filter.meta.vin}
            onChange={(value) => handlePropsChange('details.meta.vin', value)}
            isLabel={true}
          />

          <FilterSelect category={'details'} filter={filter} handlePropsChange={handlePropsChange} name="category" isRequired={true} />
          <FilterDate filter={filter} handlePropsChange={handlePropsChange} name="manufacture_registration" />
          <FilterDate filter={filter} handlePropsChange={handlePropsChange} name="first_registration" />
          <FilterSelect category={'details'} filter={filter} handlePropsChange={handlePropsChange} name="body" isRequired={true} />
          <FilterSelect category={'details'} filter={filter} handlePropsChange={handlePropsChange} name="transmission" isRequired={true} />
          <FilterSelect category={'details'} filter={filter} handlePropsChange={handlePropsChange} name="drive" isRequired={true} />
          <FilterSelect category={'details'} filter={filter} handlePropsChange={handlePropsChange} name="fuel_type" isRequired={true} />

          <div className={style.row}>
            <Field
              type={'number'}
              placeholder={t('filters.mileage.0')}
              data={filter.mileage_data.mileage}
              onChange={(value) => handlePropsChange('details.mileage_data.mileage', value)}
              isRequired={true}
              isLabel={true}
              label={`${t('filters.mileage.0')} (${filter.mileage_data.mileage_unit.name})`}
              min={0}
            />
            <FilterSelect category={'details.mileage_data'} filter={filter.mileage_data} handlePropsChange={handlePropsChange} name="mileage_unit" isLabel={false} />
          </div>

          <div className={style.row}>
            <Field
              type={'number'}
              placeholder={t('power')}
              data={filter.power_data.power}
              onChange={(value) => handlePropsChange('details.power_data.power', value)}
              isRequired={true}
              isLabel={true}
              label={`${t('power')} (${filter.power_data.power_unit.name})`}
              min={0}
            />
            <FilterSelect category={'details.power_data'} filter={filter.power_data} handlePropsChange={handlePropsChange} name="power_unit" isLabel={false} />
          </div>

          <Field
            type={'number'}
            placeholder={t('filters.engine_capacity.0')}
            data={filter.power_data.capacity}
            onChange={(value) => handlePropsChange('details.power_data.capacity', value)}
            isRequired={true}
            isLabel={true}
            label={t('filters.engine_capacity.0')}
            min={0}
          />
        </div>

        <div className={style.footer}>
          <Button
            type={'submit'}
            classes={['primary', 'md']}
            placeholder={t('actions.next')}
          />
        </div>
      </form>
    </Accordion>
  )
}

export default Details
