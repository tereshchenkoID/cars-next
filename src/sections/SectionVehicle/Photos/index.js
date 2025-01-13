"use client"

import { useTranslations } from 'next-intl'

import Image from 'next/image'
import Accordion from '@/modules/Accordion'

import ImageUploader from './ImageUploader'

import style from '../index.module.scss'

const Photos = ({ 
  data,
  toggle,
  handleToggle, 
}) => {
  const t = useTranslations()

  return (
    <Accordion
      data={toggle[0]}
      action={() => handleToggle(0)}
      icon={'user'}
      placeholder={t('photos')}
    >
      <>
        <ImageUploader />
        {
          data.images.length > 0 &&
          <>
            <hr className={style.hr} />
            <div className={style.images}>
              {
                data.images.map((el, idx) =>
                  <div
                    key={idx}
                    className={style.image}
                  >
                    <Image
                      src={el}
                      width={200}
                      height={200}
                      className={style.image}
                      priority={false}
                      alt={`${t('image')} ${idx}`}
                    />
                  </div>
                )
              }
            </div>
          </>
        }
      </>
    </Accordion>
  )
}

export default Photos