import { useTranslations } from 'next-intl'

import { NAVIGATION } from 'constant/config'

import Link from 'next/link'
import Image from 'next/image'
import Icon from 'components/Icon'

import style from './index.module.scss'

const Discount = () => {
  const t = useTranslations()

  return (
    <Link
      className={style.block}
      href={`${NAVIGATION.buy.link}?discount=1`}
    >
      <strong className={style.info}>
        <h6 className={style.title}>{t('discount_cars')}</h6>
        <p className={style.more}>
          <span>{t('more')}</span>
          <Icon
            className={style.arrow}
            iconName={'arrow-right'}
            width={18}
            height={18}
          />
        </p>
      </strong>
      <Image
        className={style.image}
        src={'/images/discount-cars.webp'}
        width={192}
        height={168}
        alt={t('discount_cars')}
      />
    </Link>
  )
}

export default Discount
