"use client"

import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { ACTIVE, DEFAULT } from "constant/config"

import Label from 'components/Label'
import Field from 'components/Field'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Accordion from 'modules/Accordion'

import style from '../index.module.scss'

const Equipment = ({
  options,
  data,
  toggle,
  handleToggle,
  handleChange,
  handleFeature,
  isFeatureExist
}) => {
  const t = useTranslations()
  const filters = useSelector((state) => state.filters)

  return (
    <Accordion
      data={toggle[2]}
      action={() => handleToggle(2)}
      icon={'filters'}
      placeholder={t('equipment')}
    >
      <div className={style.grid}>
        <div className={style.list}>
          <div className={style.wrapper}>
            <Label
              data={t('number_of_seats')}
              isRequired={true}
            />
            <Field
              type={'number'}
              placeholder={t('number_of_seats')}
              data={data.number_of_seats}
              onChange={(value) => handleChange('number_of_seats', value)}
              min={0}
            />
          </div>

          <div className={style.wrapper}>
            <Label
              data={t('number_of_doors')}
              isRequired={true}
            />
            <Field
              type={'number'}
              placeholder={t('number_of_doors')}
              data={data.number_of_doors}
              onChange={(value) => handleChange('number_of_doors', value)}
              min={0}
            />
          </div>
        </div>

        <div className={style.wrapper}>
          <Label
            data={t('body_color')}
            isRequired={true}
          />
          <div className={style.colors}>
            {
              Object.entries(filters.color.options).map(([optionKey, optionValue]) => (
                <button
                  key={optionKey}
                  type="button"
                  aria-label={t(`filters.color.${optionKey}`)}
                  style={{ backgroundColor: optionValue }}
                  title={optionKey === DEFAULT ? t('all') : t(`filters.color.${optionKey}`)}
                  className={
                    classNames(
                      style.color,
                      data.color.id === optionKey && style.active
                    )
                  }
                  onClick={() => handleChange('color', {
                    id: optionKey,
                    name: optionValue
                  })}
                />
              ))
            }
          </div>
        </div>

        <div className={style.list}>
          {
            options.map((el, idx) =>
              <div
                key={idx}
                className={style.section}
              >
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
            classes={['primary', style.button]}
            placeholder={t('actions.save')}
          />
        </div>
      </div>
    </Accordion>
  )
}

export default Equipment
