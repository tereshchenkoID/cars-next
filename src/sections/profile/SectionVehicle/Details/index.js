"use client"

import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import { DEFAULT } from "@/constant/config"

import Label from '@/components/Label'
import Field from '@/components/Field'
import Select from '@/components/Select'
import Button from '@/components/Button'
import Textarea from '@/components/Textarea'
import Accordion from '@/modules/Accordion'
import DateSelector from './DateSelector'

import style from '../index.module.scss'

const Details = ({ 
  data,
  toggle,
  handleToggle, 
  handleChange 
}) => {
  const t = useTranslations()
  const filters = useSelector((state) => state.filters)
  const brands = useSelector((state) => state.brands)

  const searchMake = (id) => {
    return brands.find((brand) => brand.id === id)
  }

  const searchModel = (id) => {
    const make = brands.find((brand) => brand.id === data.make.id)
    return make.options.find((model) => model.id === id)
  }

  return (
    <Accordion
      data={toggle[1]}
      action={() => handleToggle(1)}
      icon={'file'}
      placeholder={t('details')}
    >
      <div className={style.grid}>
        <div className={style.wrapper}>
          <Label
            data={t('name')}
            isRequired={true}
          />
          <Field
            placeholder={t('name')}
            data={data.meta.name}
            onChange={(value) => handleChange('meta.name', value)}
          />
        </div>

        <div className={style.wrapper}>
          <Label data={t('description')} />
          <Textarea
            placeholder={t('description')}
            data={data.meta.description}
            onChange={(value) => handleChange('meta.description', value)}
          />
        </div>

        <div className={style.list}>
          <div className={style.wrapper}>
            <Label
              data={t('make')}
              isRequired={true}
            />
            <Select
              id={'select_make'}
              options={
                brands.map(make => ({
                  value: make.id,
                  label: make.name,
                }))
              }
              placeholder={t('make')}
              data={data.make.id || DEFAULT}
              onChange={(value) => handleChange('make', {
                id: value,
                name: searchMake(value)?.name
              })}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('model')}
              isRequired={true}
            />
            <Select
              id={'select_model'}
              options={
                data.make.id !== DEFAULT
                  ?
                  searchMake(data.make.id).options.map(model => ({
                    value: model.id,
                    label: model.name,
                  }))
                  :
                  []
              }
              placeholder={t('model')}
              data={data.model.id || DEFAULT}
              onChange={(value) => handleChange('model', {
                id: value,
                name: searchModel(value)?.name
              })}
              isAsync={true}
              isDisabled={data.make.id === DEFAULT}
            />
          </div>

          <div className={style.wrapper}>
            <Label data={t('vin_code')} />
            <Field
              placeholder={t('vin_code')}
              data={data.meta.vin}
              onChange={(value) => handleChange('meta.vin', value)}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('filters.category.0')}
              isRequired={true}
            />
            <Select
              id={'select_category'}
              options={
                Object.entries(filters.category.options).map(([optionKey, optionValue]) => ({
                  value: optionKey,
                  label: optionKey === DEFAULT ? t('all') : (filters.translation === DEFAULT ? optionValue : t(`filters.category.${optionKey}`)),
                }))
              }
              data={data.category.id || DEFAULT}
              onChange={(value) => handleChange('category', {
                id: value,
                name: t(`filters.category.${value}`)
              })}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('manufacture_registration')}
              isRequired={true}
            />
            <DateSelector
              data={data.date.manufacture}
              action={(value) => handleChange('date.manufacture', value)}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('first_registration')}
              isRequired={true}
            />
            <DateSelector
              data={data.date.first_registration}
              action={(value) => handleChange('date.first_registration', value)}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('filters.body.0')}
              isRequired={true}
            />
            <Select
              id={'select_body'}
              options={
                Object.entries(filters.body.options).map(([optionKey, optionValue]) => ({
                  value: optionKey,
                  label: optionKey === DEFAULT ? t('all') : (filters.translation === DEFAULT ? optionValue : t(`filters.body.${optionKey}`)),
                }))
              }
              data={data.body.id || DEFAULT}
              onChange={(value) => handleChange('body', {
                id: value,
                name: t(`filters.body.${value}`)
              })}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('filters.transmission.0')}
              isRequired={true}
            />
            <Select
              id={'select_transmission'}
              options={
                Object.entries(filters.transmission.options).map(([optionKey, optionValue]) => ({
                  value: optionKey,
                  label: optionKey === DEFAULT ? t('all') : (filters.translation === DEFAULT ? optionValue : t(`filters.transmission.${optionKey}`)),
                }))
              }
              data={data.transmission.id || DEFAULT}
              onChange={(value) => handleChange('transmission', {
                id: value,
                name: t(`filters.transmission.${value}`)
              })}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('filters.drive.0')}
              isRequired={true}
            />
            <Select
              id={'select_drive'}
              options={
                Object.entries(filters.drive.options).map(([optionKey, optionValue]) => ({
                  value: optionKey,
                  label: optionKey === DEFAULT ? t('all') : (filters.drive === DEFAULT ? optionValue : filters.drive.options[optionKey]),
                }))
              }
              data={data.drive.id || DEFAULT}
              onChange={(value) => handleChange('drive', {
                id: value,
                name: filters.drive.options[value]
              })}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('filters.fuel_type.0')}
              isRequired={true}
            />
            <Select
              id={'select_fuel_type'}
              options={
                Object.entries(filters.fuel_type.options).map(([optionKey, optionValue]) => ({
                  value: optionKey,
                  label: optionKey === DEFAULT ? t('all') : (filters.translation === DEFAULT ? optionValue : t(`filters.fuel_type.${optionKey}`)),
                }))
              }
              data={data.fuel_type.id || DEFAULT}
              onChange={(value) => handleChange('fuel_type', {
                id: value,
                name: t(`filters.fuel_type.${value}`)
              })}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={`${t('filters.mileage.0')} (${data.mileage_data.mileage_unit.name})`}
              isRequired={true}
            />
            <div
              className={style.list}
              style={{
                gridTemplateColumns: '2fr 1fr'
              }}
            >
              <Field
                type={'number'}
                placeholder={t('filters.mileage.0')}
                data={data.mileage_data.mileage}
                onChange={(value) => handleChange('mileage_data.mileage', value)}
                min={0}
              />
              <Select
                id={'select_mileage_unit'}
                options={
                  Object.entries({
                    1: 'km',
                    2: 'm'
                  })
                    .map(([optionKey, optionValue]) => ({
                      value: optionKey,
                      label: optionValue,
                    }))
                }
                data={data.mileage_data.mileage_unit.id}
                onChange={(value) => handleChange('mileage_data.mileage_unit', {
                  id: value,
                  name: t(`filters.mileage.${value}`)
                })}
              />
            </div>
          </div>

          <div className={style.wrapper}>
            <Label
              data={`${t('power')} (${data.power_data.power_unit.name})`}
              isRequired={true}
            />
            <div
              className={style.list}
              style={{
                gridTemplateColumns: '2fr 1fr'
              }}
            >
              <Field
                type={'number'}
                placeholder={t('power')}
                data={data.power_data.power}
                onChange={(value) => handleChange('power_data.power', value)}
                min={0}
              />
              <Select
                id={'select_power_unit'}
                options={
                  Object.entries({
                    1: 'hp',
                    2: 'kw'
                  })
                    .map(([optionKey, optionValue]) => ({
                      value: optionKey,
                      label: optionValue,
                    }))
                }
                data={data.power_data.power_unit.id}
                onChange={(value) => handleChange('power_data.power_unit', {
                  id: value,
                  name: t(`filters.power.${value}`)
                })}
              />
            </div>
          </div>

          <div className={style.wrapper}>
            <Label
              data={`${t('engine_capacity')} (cm)`}
              isRequired={true}
            />
            <Field
              type={'number'}
              placeholder={t('engine_capacity')}
              data={data.power_data.capacity}
              onChange={(value) => handleChange('power_data.capacity', value)}
              min={0}
            />
          </div>
        </div>

        <div className={style.footer}>
          <Button
            classes={['primary', style.button]}
            placeholder={t('actions.save')}
          />
        </div>
      </div>
    </Accordion>
  )
}

export default Details