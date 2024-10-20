"use client"

import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Image from 'next/image'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const SectionCar = ({ data }) => {
  const t = useTranslations()
  const filters = useSelector((state) => state.filters)

  return (
    <article className={style.block}>
      <h1 className={style.title}>{data.name}</h1>
      <ul className={style.options}>
        <li className={style.option}>
          <Icon
            iconName={'road'}
            width={24}
            height={24}
            className={style.icon}
          />
          <p>{data.mileage}</p>
        </li>
        <li className={style.option}>
          <Icon
            iconName={'calendar'}
            width={24}
            height={24}
            className={style.icon}
          />
          <p>{data.year}</p>
        </li>
        <li className={style.option}>
          <Icon
            iconName={'engine'}
            width={24}
            height={24}
            className={style.icon}
          />
          <p>{data.power}</p>
        </li>
        <li className={style.option}>
          <Icon
            iconName={'transmission'}
            width={24}
            height={24}
            className={style.icon}
          />
          <p>{filters['transmission'].options[data.transmission]}</p>
        </li>
        <li className={style.option}>
          <Icon
            iconName={'hybrid'}
            width={24}
            height={24}
            className={style.icon}
          />
          <p>{filters['fuel'].options[data.fuel]}</p>
        </li>
      </ul>

      <div className={style.slider}>
        <Swiper
          className={style.slider}
          slidesPerView={3}
          loop={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={24}
          navigation={true}
          mousewheel={true}
          modules={[Pagination, Mousewheel, Navigation]}
        >
          {
            data.images.map((el, idx) =>
              <SwiperSlide key={idx}>
                <Image
                  src={el}
                  width={300}
                  height={300}
                  className={style.image}
                  priority={false}
                  alt={`${t('image')} ${idx}`}
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
                />
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>

      <div>
        <h3>Details</h3>
        <ul className={style.grid}>
          <li className={style.option}>
            <Icon
              iconName={'road'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>{t('filters.mileage.0')}</p>
              <p className={style.text}>{data.mileage}</p>
            </div>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'calendar'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>First registration</p>
              <p className={style.text}>{data.year}</p>
            </div>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'engine'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>Power</p>
              <p className={style.text}>{data.power}</p>
            </div>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'transmission'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>{t('filters.transmission.0')}</p>
              <p className={style.text}>{filters['transmission'].options[data.transmission]}</p>
            </div>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'hybrid'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>{t('filters.fuel.0')}</p>
              <p className={style.text}>{filters['fuel'].options[data.fuel]}</p>
            </div>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'drive'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>Drive type</p>
              <p className={style.text}>4x2</p>
            </div>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'consumption'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>Consumption</p>
              <p className={style.text}>3.8 l/100km</p>
            </div>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'emissions'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>CO2 emissions</p>
              <p className={style.text}>99 g/km</p>
            </div>
          </li>
          <li className={style.option}>
            <Icon
              iconName={'location'}
              width={32}
              height={32}
              className={style.icon}
            />
            <div>
              <p className={style.label}>Location</p>
              <p className={style.text}>Italy</p>
            </div>
          </li>
        </ul>
      </div>
    </article>
  )
}

export default SectionCar