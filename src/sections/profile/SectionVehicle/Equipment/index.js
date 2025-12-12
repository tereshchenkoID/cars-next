import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { ACTIVE, DEFAULT } from 'constant/config'

import Button from 'components/Button'
import Label from 'components/Label'
import Field from 'components/Field'
import Checkbox from 'components/Checkbox'
import Accordion from 'modules/Accordion'
import FilterSelect from '../modules/FilterSelect'

import style from '../index.module.scss'

const Equipment = ({ options, filter, setFilter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const filters = useSelector((state) => state.filters)
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
          <FilterSelect category={'equipment'} filter={filter} handlePropsChange={handlePropsChange} name="seats" isRequired={true} />
          <FilterSelect category={'equipment'} filter={filter} handlePropsChange={handlePropsChange} name="doors" isRequired={true} />
          <FilterSelect category={'equipment'} filter={filter} handlePropsChange={handlePropsChange} name="interior_material" />
        </div>

        <div className={style.wrapper}>
          <Label
            data={t('filters.color.0')}
            isRequired={true}
          />
          <div className={style.colors}>
            {
              Object.entries(filters.color.options).map(([key, value]) =>
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
