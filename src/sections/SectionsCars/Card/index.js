import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import { NAVIGATION } from '@/constant/config'

import classNames from 'classnames'

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const COUNT = 4

const Card = ({data}) => {
  const t = useTranslations()
  const { auth } = useSelector((state) => state.auth)
  const filters = useSelector((state) => state.filters)
  const [show, setShow] = useState(false)
  const totalItems = data.options.length
  const hiddenItemsCount = totalItems - COUNT

  return (
    <div className={style.block}>
      <div className={style.left}>
        <Swiper
          className={style.slider}
          slidesPerView={1}
          loop={true}
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
                  priority={true}
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
          href={`${NAVIGATION.car.link}/${data.id}`}
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

        <ul className={style.tags}>
          {
            data.options.slice(0, show ? data.options.length : COUNT).map((el, idx) =>
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
