import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { NAVIGATION } from '@/constant/config'

import { getFormatPrice } from '@/helpers/getFormatPrice'
import { getFuelIcon } from '@/helpers/getFuelIcon'
import { getDate } from '@/helpers/getDate'

import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Car = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)

  return (
    <Link
      href={`${NAVIGATION.car.link}/${data.id}/${data.slug}`}
      rel="noreferrer"
      target='_blank'
      className={style.block}
      aria-label={data.name}
      title={data.name}
    >
      <div className={style.picture}>
        <Image
          src={data.images[0]}
          width={270}
          height={270}
          className={style.image}
          priority={false}
          alt={data.name}
        />
      </div>
      <div className={style.content}>
        <h6 className={style.subtitle}>{data.name}</h6>
        <ul className={style.list}>
          <li className={style.option}>
            <Icon
              iconName={'road'}
              width={16}
              height={16}
              className={style.icon}
            />
            <p>{data.mileage_data.mileage} {data.mileage_data.mileage_unit}</p>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'calendar'}
              width={16}
              height={16}
              className={style.icon}
            />
            <p>{getDate(data.manufacture_date, 3)}</p>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'calendar'}
              width={16}
              height={16}
              className={style.icon}
            />
            <p>{getDate(data.first_registration_date, 3)}</p>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'engine'}
              width={16}
              height={16}
              className={style.icon}
            />
            <p>{data.power_data.power} {data.power_data.power_unit}</p>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'transmission'}
              width={16}
              height={16}
              className={style.icon}
            />
            <p>{t(`filters.transmission.${data.transmission.id}`)}</p>
          </li>
          <li className={style.option}>
            <Icon
              iconName={getFuelIcon(data.fuel_type.id)}
              width={16}
              height={16}
              className={style.icon}
            />
            <p>{t(`filters.fuel_type.${data.fuel_type.id}`)}</p>
          </li>
        </ul>
      </div>
      <div className={style.footer}>
        <h5>
          {getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data.price_data.price)}
        </h5>
        <p className={style.vat}>
          {
            data.price_data.price_without_vat
              ?
                <><strong>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data.price_data.price_without_vat)}</strong> {t('without_vat')}</>
              :
                <span>{t('not_deductible')}</span>
          }
        </p>
      </div>
    </Link>
  )
}

export default Car
