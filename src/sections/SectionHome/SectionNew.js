"use client"

import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'

import Container from "@/components/Container"
import Car from './Car'

import style from './index.module.scss'

const SectionNew = ({ data }) => {
  const t = useTranslations()

  return (
    <section
      className={
        classNames(
          style.section,
          style.white
        )
      }
    >
      <Container classes={style.container}>
        <div className={style.headline}>
          <h2 className={style.subtitle}>{t('sections.new_cars')}</h2>
        </div>
        <Swiper
          className={style.slider}
          slidesPerView={'auto'}
          // mousewheel={true}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Mousewheel, Pagination, Navigation]}
        >
          {
            data.data.map((el, idx) =>
              <SwiperSlide key={idx}>
                <Car data={el} />
              </SwiperSlide>
            )
          }
        </Swiper>
      </Container>
    </section>
  )
}

export default SectionNew