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
      href={`${NAVIGATION.buy.link}?body=${data}`}
      className={style.block}
    >
      <strong className={style.headline}>
        <span className={style.text}>{t(`filters.body.${data}`)}</span>
        <Icon
          className={style.arrow}
          iconName={'arrow-right'}
          width={18}
          height={18}
        />
      </strong>
      <Image
        className={style.image}
        src={`/images/body/${data}.webp`}
        width={108}
        height={48}
        alt={t(`filters.body.${data}`)}
      />
    </Link>
  )
}

export default Card
