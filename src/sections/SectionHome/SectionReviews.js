"use client"

import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'

import { NAVIGATION } from 'constant/config'

import { useSettingsStore } from 'stores/settingsStore'

import Container from "components/Container"
import Reference from 'components/Reference'
import StarRating from 'modules/StarRating'
import ReviewCard from 'modules/Cards/ReviewCard'

import style from './index.module.scss'

const SectionReviews = ({ data }) => {
  const t = useTranslations()
  const { settings } = useSettingsStore()

  return (
    <section className={style.section}>
      <Container classes={style.container}>
        <div className={style.headline}>
          <h2 className={style.subtitle}>{t('sections.reviews')}</h2>
          <div className={style.rate}>
            <StarRating
              data={settings?.rate?.value}
              size={'lg'}
            />
            <Reference
              link={NAVIGATION.reviews.link}
              classes={['reference', style.count]}
              placeholder={`${settings?.rate?.votes} ${t('reviews')}`}
            />
          </div>
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
          {
            data?.data.map((el, idx) =>
              <SwiperSlide key={idx}>
                <ReviewCard data={el} />
              </SwiperSlide>
            )
          }
        </Swiper>
      </Container>
    </section>
  )
}

export default SectionReviews
