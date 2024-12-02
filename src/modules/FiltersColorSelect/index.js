import { useTranslations } from 'next-intl'

import { DEFAULT } from '@/constant/config'

import classNames from 'classnames'

import style from './index.module.scss'

const FiltersColorSelect = ({
  placeholder,
  options,
  data,
  onChange,
  isDisabled = false,
}) => {
  const t = useTranslations()

  return (
    <div 
      className={
        classNames(
          style.block,
          isDisabled && style.disabled,
        )
      }
    >
      {
        Object.entries(options).map(([optionKey, optionValue]) => (
          <button
            key={optionKey}
            type="button"
            aria-label={t(`filters.${placeholder}.${optionKey}`)}
            style={{ backgroundColor: optionValue }}
            title={optionKey === DEFAULT ? t('all') : t(`filters.${placeholder}.${optionKey}`)}
            className={
              classNames(
                style.color,
                data?.value?.includes(optionKey) && style.active
              )
            }
            onClick={() => onChange('color', placeholder, optionKey)}
          />
        ))
      }
    </div>
  )
}

export default FiltersColorSelect
