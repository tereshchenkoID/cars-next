import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Toggle = ({ show, setShow }) => {
  const t = useTranslations()
  
  return (
    <button
      type={'button'}
      className={
        classNames(
          style.block,
          show && style.active
        )
      }
      aria-label={t('add_car')}
      onClick={() => setShow(!show)}
    >
      <Icon
        iconName={'circle-plus'}
        width={16}
        height={16}
        className={style.plus}
      />
      <span>{t('add_car')}</span>
      <Icon
        iconName={'angle-down'}
        width={16}
        height={16}
        className={style.arrow}
      />
    </button>
  )
}

export default Toggle
