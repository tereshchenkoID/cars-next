"use client"

import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'

import Container from 'components/Container'
import Card from './Card'
import Discount from './Discount'

import style from './index.module.scss'

const SectionCategories = () => {
  const t = useTranslations()
  const filters = useSelector((state) => state.filters)

  return (
    <section className={style.section}>
      <Container classes={[style.container]}>
        <div className={style.headline}>
          <h2 className={style.subtitle}>{t('sections.popular_categories')}</h2>
        </div>
        <Swiper
          className={style.slider}
          slidesPerView={'auto'}
          // mousewheel={true}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          navigation={true}
          modules={[Mousewheel, Pagination, Navigation]}
        >
          <SwiperSlide>
            <Discount />
          </SwiperSlide>
          {
            Object.entries(filters?.body?.options).map(([key, _]) =>
              (key !== '0' && key !== '5') &&
              <SwiperSlide key={key}>
                <Card data={key} />
              </SwiperSlide>
            )
          }
        </Swiper>
      </Container>
    </section>
  )
}

export default SectionCategories
