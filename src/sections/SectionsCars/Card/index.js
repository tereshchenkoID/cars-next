import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { NAVIGATION } from '@/constant/config'

import { getFormatPrice } from '@/helpers/getFormatPrice'

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
  const { auth } = useSelector((state) => state.auth)
  const filters = useSelector((state) => state.filters)

  return (
    <div className={style.block}>
      <div className={style.left}>
        <Swiper
          className={style.slider}
          slidesPerView={1}
          // lazy={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }} 
          navigation={true}
          mousewheel={true}
          modules={[Pagination, Mousewheel, Navigation]}
        >
          {
            data.images.map((el, idx) =>
              <SwiperSlide key={idx}>
                <Image
                  src={el}
                  width={277}
                  height={207}
                  className={style.image}
                  // priority={true}
                  alt={`${t('image')} ${idx}`}
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
          {data.images.length}
        </div>
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
          href={`${NAVIGATION.car.link}/${data.id}/test`}
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
            <p>{data.mileage}</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'calendar'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{data.year}</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'engine'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{data.power}</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'transmission'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{filters['transmission'].options[data.transmission]}</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'hybrid'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>{filters['fuel'].options[data.fuel]}</p>
          </li>
        </ul>
        
        <Tags data={data.options} />

        <div className={style.meta}>
          <h5>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data.price)}</h5>
        </div>
      </div>
    </div>
  )
}

export default Card
