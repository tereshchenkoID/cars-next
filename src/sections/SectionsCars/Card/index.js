import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { NAVIGATION } from '@/constant/config'

import { getDate } from '@/helpers/getDate'
import { getFormatPrice } from '@/helpers/getFormatPrice'
import { getFuelIcon } from '@/helpers/getFuelIcon'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '@/components/Icon'
import Tags from '@/modules/Tags'

import style from './index.module.scss'

const Card = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)

  return (
    <div className={style.block}>
      <div className={style.left}>
        {
          data.images.length > 0 &&
          <>
            <Swiper
              className={style.slider}
              slidesPerView={1}
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }} 
              navigation={true}
              // mousewheel={true}
              modules={[Pagination, Mousewheel, Navigation]}
            >
              {
                data.images?.map((el, idx) =>
                  <SwiperSlide key={idx}>
                    <Image
                      src={el}
                      width={277}
                      height={207}
                      className={style.image}
                      priority={idx === 0}
                      style={{aspectRatio: 277 / 207 }}
                      alt={`${data.slug} ${idx}`}
                    />
                  </SwiperSlide>
                )
              }
            </Swiper>

            <div 
              className={style.count}
              onClick={() => {
                Fancybox.show(
                  data.images.map((src, index) => ({
                    src,
                    type: 'image',
                    caption: `${t('image')} ${index + 1}`,
                  })),
                  {
                    groupAll: true,
                  }
                );
              }}
            >
              <Icon 
                iconName={'image'}
                width={24}
                height={24}
              />
              {data.images?.length}
            </div>
          </>
        }

        <button
          type={'button'}
          className={style.favorite}
          aria-label={t('favorite')}
          title={t('favorite')}
        >
          <Icon 
            iconName={'heart-filled'}
            width={24}
            height={24}
            stroke={'var(--color-white)'}
            strokeWidth={2}
          />
        </button>
      </div>
      <div className={style.right}>
        <Link 
          href={`${NAVIGATION.car.link}/${data.id}/${data.slug}`}
          className={style.link}
        >
          {data.name}
        </Link>
        <ul className={style.options}>
          <li className={style.option}>
            <Icon 
              iconName={'road'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{data.mileage_data.mileage} {data.mileage_data.mileage_unit}</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'calendar'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{getDate(data.first_registration_date, 3)}</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'calendar'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{getDate(data.manufacture_date, 3)}</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'engine'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{data.power_data.power} ({data.power_data.power_unit})</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'transmission'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{t(`filters.transmission.${data.transmission.id}`)}</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={getFuelIcon(data.fuel_type.id)}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{t(`filters.fuel_type.${data.fuel_type.id}`)}</p>
          </li>
        </ul>
        
        {
          data.featured_tags &&
          <Tags data={data.featured_tags} />
        }

        <div className={style.meta}>
          <h5>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price)}</h5>
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
      </div>
    </div>
  )
}

export default Card
