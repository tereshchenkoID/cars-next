import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Discount = ({ size, amount }) => {
  const t = useTranslations()

  return (
    <div
      className={
        classNames(
          style.block,
          style[size]
        )
      }
    >
      {
        size === 'lg' &&
        <Icon
          iconName={'discount'}
          width={14}
          height={14}
        />
      }
      <strong>{t('discount')} {amount}</strong>
    </div>
  )
}

export default Discount
