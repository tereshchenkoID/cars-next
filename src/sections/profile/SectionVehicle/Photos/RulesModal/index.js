import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from 'context/ModalContext'

import classNames from 'classnames'

import Image from 'next/image'
import Button from 'components/Button'

import style from './index.module.scss'

const DATA = [
  {
    titleKey: 'title_1',
    textKey: 'text_1',
    images: [
      { src: '/images/upload-rules/car_1.webp', caption: 'good_quality' },
      { src: '/images/upload-rules/car_1_wrong.webp', caption: 'low_quality' },
    ],
  },
  {
    titleKey: 'title_2',
    textKey: 'text_2',
    images: [
      { src: '/images/upload-rules/car_2.webp', caption: 'right' },
      { src: '/images/upload-rules/car_2_wrong.webp', caption: 'wrong' },
    ],
  },
  {
    titleKey: 'title_3',
    textKey: 'text_3',
    images: [
      { src: '/images/upload-rules/car_3.webp', caption: 'exterior' },
      { src: '/images/upload-rules/car_3_1.webp', caption: 'inside' },
      { src: '/images/upload-rules/car_3_2.webp', caption: 'tyres' },
      { src: '/images/upload-rules/car_3_3.webp', caption: 'engine' },
    ],
  },
  {
    titleKey: 'title_4',
    textKey: 'text_4',
    images: [
      { src: '/images/upload-rules/car_4.svg', caption: null, style: { maxWidth: 300 } },
    ],
    gridStyle: { gridTemplateColumns: '1fr' },
  },
]

const RulesModal = () => {
  const t = useTranslations()
  const { closeModal } = useModal()
  const [show, setShow] = useState(1)
  const currentStep = DATA[show - 1]

  return (
    <div className={style.block}>
      <div
        className={
          classNames(
            style.step,
            style.active
          )
        }
      >
        <h5 className={style.title}>{t(`rules.upload_photo.${currentStep.titleKey}`)}</h5>
        <p className={style.text}>{t(`rules.upload_photo.${currentStep.textKey}`)}</p>
        <div
          className={style.grid}
          style={currentStep.gridStyle || {}}
        >
          {
            currentStep.images.map((image, idx) =>
              <div key={idx} className={style.cell}>
                <Image
                  src={image.src}
                  width={200}
                  height={200}
                  className={style.image}
                  priority={true}
                  alt={image.caption || 'Upload'}
                  style={image.style || {}}
                />
                {image.caption && <p>{t(`rules.upload_photo.${image.caption}`)}</p>}
              </div>
            )
          }
        </div>
      </div>

      <p className={style.pagination}>{show} of {DATA.length}</p>
      <div className={style.footer}>
        <div>
          {
            show !== 1 &&
            <Button
              classes={['reference']}
              placeholder={t('actions.back')}
              onChange={() => setShow(show - 1)}
            />
          }
        </div>
        {
          show === DATA.length
            ?
              <Button
                classes={['primary', 'md', 'wide']}
                placeholder={t('close')}
                onChange={closeModal}
              />
            :
              <Button
                classes={['primary', 'md', 'wide']}
                placeholder={t('actions.continue')}
                onChange={() => setShow(show + 1)}
              />
        }
      </div>
    </div>
  )
}

export default RulesModal
