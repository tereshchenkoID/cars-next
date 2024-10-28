"use client"

import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import Image from 'next/image'
import Tags from '@/modules/Tags'
import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Betslip from './Betslip'

const Share = dynamic(() => import('./Share'), {
  ssr: false,
})

const Favorites = dynamic(() => import('./Favorites'), {
  ssr: false,
})

import style from './index.module.scss'

const TABS = [
  {
    id: 0,
    text: 'details'
  },
  {
    id: 1,
    text: 'features'
  },
  {
    id: 2,
    text: 'car audit'
  },
  {
    id: 3,
    text: 'price history'
  }
]

const SectionCar = ({ data }) => {
  const t = useTranslations()
  const router = useRouter()
  const filters = useSelector((state) => state.filters)

  return (
    <article className={style.block}>
      <div className={style.head}>
        <Container classes={style.header}>
          <Button
            icon={'angle-left'}
            classes={['reference', 'sm', style.hide]}
            placeholder={(t('back'))}
            onChange={() => router.back()}
          />
          <div className={style.meta}>
            <div className={style.details}>
              <h2 className={style.title}>{data.name}</h2>
              <Favorites data={data} />
              <Share data={data} />
            </div>

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

            <Tags data={data.options} />
          </div>
        </Container>

        <div className={style.slider}>
          <Button
            icon={'angle-left'}
            classes={['sm', 'square', style.back]}
            onChange={() => router.back()}
          />
          <Swiper
            className={style.slider}
            slidesPerView={'auto'}
            mousewheel={true}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            modules={[Mousewheel, Pagination, Navigation]}
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
                  />
                  <div 
                    className={style.show}
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
                      width={32}
                      height={32}
                      iconName={'arrows'}
                    />
                  </div>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>
      </div>

      <div className={style.tabs}>
        <Container classes={style.scroll}>
          {
            TABS.map((el, idx) =>
              <p
                key={idx}
                className={style.tab}
              >
                {el.text}
              </p>
            )
          }
        </Container>
      </div>


      <Container classes={style.main}>
        <div className={style.body}>
          <h3 className={style.title}>Details</h3>
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
        <Betslip data={data} />
      </Container>

      <Container>
        <div className={style.body}>
          <h3 className={style.title}>features</h3>
        </div>
      </Container>
    </article>
  )
}

export default SectionCar