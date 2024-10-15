import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

import classNames from 'classnames'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Image from 'next/image'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const data = {
  name: 'Mercedes-Benz E 300 e T 230 kW',
  price: '66 045',
  mileage: '11 993 km',
  year: '2023',
  power: '240 kW',
  transmission: '0',
  fuel: '3',
  options: [
    'Parking assist system self-steering',
    'Keyless entry',
    'Heated steering wheel',
    'Apple CarPlay',
    'Navigation system',
    'Heated front seats',
    'Alarm',
    'Parking assist system self-steering',
    'Keyless entry',
  ],
  images: [
    'https://storage.alpha-analytics.cz/resize/bd4c4be7-5df3-4551-a023-84a0a8b10b9d?ts=1726662108&width=554&height=416&fit=cover&withoutEnlargement=false',
    'https://storage.alpha-analytics.cz/resize/bc49015c-e818-4b7e-b49a-bc2c91acb977?ts=1724252105&width=554&height=416&fit=cover&withoutEnlargement=false',
    'https://storage.alpha-analytics.cz/resize/9f49cb11-fcb5-4e4c-9f6b-a3fe596f213b?ts=1724252083&width=554&height=416&fit=cover&withoutEnlargement=false',
    'https://storage.alpha-analytics.cz/resize/c39c8ad7-283c-487a-908a-14a77dfb3117?ts=1724252017&width=554&height=416&fit=cover&withoutEnlargement=false'
  ]
}

const Card = () => {
  const t = useTranslations()
  const { auth } = useSelector((state) => state.auth)
  const filters = useSelector((state) => state.filters)
  const [show, setShow] = useState(false)
  const visibleCount = 4
  const totalItems = data.options.length
  const hiddenItemsCount = totalItems - visibleCount

  return (
    <div className={style.block}>
      <div className={style.left}>
        <Swiper
          className={style.slider}
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          pagination={true} 
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {
            data.images.map((el, idx) =>
              <SwiperSlide key={idx}>
                <Image
                  width={277}
                  height={207}
                  className={style.image}
                  src={el}
                  priority={false}
                  alt={`Image ${idx}}`}
                />
              </SwiperSlide>
            )
          }
        </Swiper>

        <div className={style.count}>
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
        <h6 className={style.title}>{data.name}</h6>
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
            <p>{data.transmission}</p>
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

        <ul className={style.tags}>
          {
            (show ? data.options : data.options.slice(0, visibleCount)).map((el, idx) =>
            // data.options.map((el, idx) =>
              <li 
                key={idx}
                className={style.tag}
              >
                {el}
              </li>
            )
          }

          {
            hiddenItemsCount > 0 && (
              <li 
                className={
                  classNames(
                    style.tag,
                    style.alt
                  )
                }
                onClick={() => setShow(!show)}
              >
                {show ? `- ${t('hide')}` : `+ ${hiddenItemsCount} ${t('more')}`}
              </li>
            )
          }
        </ul>

        <div className={style.meta}>
          <h5>{data.price} {auth?.account.currency.symbol}</h5>
        </div>
      </div>
    </div>
  )
}

export default Card
