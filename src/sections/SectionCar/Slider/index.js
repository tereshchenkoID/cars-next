import { useTranslations } from 'next-intl'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import Image from 'next/image'
import Button from 'components/Button'
import Icon from 'components/Icon'

import style from './index.module.scss'

const Slider = ({ data }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      <Button
        icon={'angle-left'}
        classes={['sm', 'square', style.back]}
        onChange={() => router.back()}
      />
      <Swiper
        // @TODO Check class
        className={style.block}
        slidesPerView={'auto'}
        // mousewheel={true}
        // keyboard={{
        //   enabled: true,
        // }}
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
  )
}

export default Slider
