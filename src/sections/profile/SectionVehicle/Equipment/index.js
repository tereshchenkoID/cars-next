import { useState } from 'react'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { ACTIVE, DEFAULT } from 'constant/config'
import { useFiltersStore } from 'stores/filtersStore'

import Button from 'components/Button'
import Label from 'components/Label'
import Field from 'components/Field'
import Checkbox from 'components/Checkbox'
import Accordion from 'modules/Accordion'

import style from '../index.module.scss'

const Equipment = ({ options, filter, setFilter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const { filters} = useFiltersStore()
  const [toggle, setToggle] = useState(false)

  const isFeatureExist = (option) => {
    return filter.features.some(feature => feature.id === option.id && feature.parentId === option.parentId)
  }

  const handleFeature = (option) => {
    setFilter(prev => {
      const exists = prev.equipment.features.some(
        f => f.id === option.id && f.parentId === option.parentId
      )

      const updated = exists
        ? prev.equipment.features.filter(f => f.id !== option.id)
        : [...prev.equipment.features, option]

      return {
        ...prev,
        equipment: {
          ...prev.equipment,
          features: updated
        }
      }
    })
  }

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'sliders'}
      placeholder={t('equipment')}
    >
      <form
        className={style.grid}
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
      >
        <div className={style.list}>
          <Field
            type={'number'}
            placeholder={t('number_of_seats')}
            data={filter.number_of_seats}
            onChange={(value) => handlePropsChange('equipment.number_of_seats', value)}
            isRequired={true}
            isLabel={true}
            min={0}
          />
          <Field
            type={'number'}
            placeholder={t('number_of_doors')}
            data={filter.number_of_doors}
            onChange={(value) => handlePropsChange('equipment.number_of_doors', value)}
            isRequired={true}
            isLabel={true}
            min={0}
          />
        </div>

        <div className={style.wrapper}>
          <Label
            data={t('body_color')}
            isRequired={true}
          />
          <div className={style.colors}>
            {
              Object.entries(filters?.color?.options).map(([key, value]) =>
                <button
                  key={key}
                  type="button"
                  aria-label={t(`filters.color.${key}`)}
                  style={{ backgroundColor: value }}
                  title={t(key === DEFAULT ? 'all' : `filters.color.${key}`)}
                  className={
                    classNames(
                      style.color,
                      filter.color.id === key && style.active
                    )
                  }
                  onClick={() => handlePropsChange('equipment.color', { id: key, name: value })}
                />
              )
            }
          </div>
        </div>

        <div className={style.list}>
          {
            options.map((el, idx) =>
              <div key={idx}>
                <Label data={`${el.name}:`} />
                <div className={style.options}>
                  {
                    el.options.map((el_option, idx_option) =>
                      <Checkbox
                        key={idx_option}
                        classes={['lg']}
                        placeholder={t(`features.${el.id}.${el_option.id}`)}
                        data={isFeatureExist(el_option) ? ACTIVE : DEFAULT}
                        onChange={() => handleFeature(el_option)}
                      />
                    )
                  }
                </div>
              </div>
            )
          }
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

export default Equipment
