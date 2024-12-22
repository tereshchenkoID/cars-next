import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Card = ({ data }) => {
  const t = useTranslations()

  return (
    <Link
      href={`${NAVIGATION.buy.link}?vehicle_type=${data}`}
      className={style.block}
    >
      <strong className={style.headline}>
        <span className={style.text}>{t(`filters.vehicle_type.${data}`)}</span>
        <Icon
          className={style.arrow}
          iconName={'arrow-right'}
          width={18}
          height={18}
        />
      </strong>
      <Image
        className={style.image}
        src={`/images/vehicle-type/${data}.webp`}
        width={108}
        height={48}
        alt={t(`filters.vehicle_type.${data}`)}
      />
    </Link>
  )
}

export default Card
