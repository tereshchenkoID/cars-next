"use client"

import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import Container from "@/components/Container"
import Review from '@/modules/Review'
import StarRating from '@/modules/StarRating'

import style from './index.module.scss'

const REVIEWS = [
  {
    url: 'https://storage.alpha-analytics.cz/resize/75ee7f27-4ce4-425d-9648-1d389b4caa01?fit=outside&height=450&namespace=carvago-review-prod&width=720&withoutEnlargement=false',
    rate: 4.5,
    location: 'DE',
    name: 'Friedrich M.',
    text: 'I can only say praise and thanks. Buying through Carvago saved me a lot of time and worry.',
    make: '52',
    model: '1918'
  },
  {
    url: 'https://storage.alpha-analytics.cz/resize/b1d8dd8e-7bd4-4e5f-8be1-7740c4304a35?fit=outside&height=450&namespace=carvago-review-prod&width=720&withoutEnlargement=false',
    rate: 3.2,
    location: 'DE',
    name: 'Friedrich M.',
    text: 'CarAudit is an important part of this service. The first car I wanted to buy had a major defect discovered that I would not have found during the inspection myself, which I am very happy about. You saved me from a bad buy. The second car has meanwhile passed the inspection without losing a single point and runs excellently. I\'m glad I tried this new thing.',
    make: '50',
    model: '1885'
  },
  {
    url: 'https://storage.alpha-analytics.cz/resize/88895f8a-c061-4a1a-8448-2b760b4982bd?fit=outside&height=450&namespace=carvago-review-prod&width=720&withoutEnlargement=false',
    rate: 4.5,
    location: 'DE',
    name: 'Paul M.',
    text: 'We used Carvago on the recommendation of friends and have not regretted it. The car is as good as new and at a fraction of the original price. It serves us reliably and meets our needs completely. We were pleased about the warranty included in the price, but we are sure that we will not need to use it.',
    make: '52',
    model: '1918'
  },
  {
    url: 'https://storage.alpha-analytics.cz/resize/753631d2-0b86-4d1c-bc57-418d28da877c?fit=outside&height=450&namespace=carvago-review-prod&width=720&withoutEnlargement=false',
    rate: 2,
    location: 'DE',
    name: 'Hannah S.',
    text: 'Hurray! I finally have the car I wanted so much. I\'m glad that Carvago took care of everything and I didn\'t have to worry. In a word: great!',
    make: '52',
    model: '1918'
  },
  {
    url: 'https://storage.alpha-analytics.cz/resize/342d2025-960e-4cfd-a0f2-08ff0386a0fe?fit=outside&height=450&namespace=carvago-review-prod&width=720&withoutEnlargement=false',
    rate: 5,
    location: 'DE',
    name: 'Maximilian S.',
    text: 'Today, thanks to Carvago, buying a car is as easy as buying a dress or a pair of shoes. Amazing!',
    make: '52',
    model: '1918'
  }
]

const SectionReviews = () => {
  const t = useTranslations()
  const settings = useSelector(state => state.settings)

  return (
    <>
      <section className={style.header}>
        <Container>
          <div className={style.hero}>
            <h1 className={style.title}>{t('sections.reviews')}</h1>
            <div className={style.banner}>
              <div className={style.rate}>
                <StarRating 
                  data={settings.rate.value}
                  size={'lg'} 
                />
                <p className={style.count}>{settings.rate.votes} {t('reviews')}</p>
              </div>
              <i>“{t('notification.reviews')}”</i>
            </div>
          </div>
        </Container>
      </section>
      <section className={style.section}>
        <Container>
          <div className={style.grid}>
            {
              REVIEWS.map((el, idx) =>
                <Review 
                  key={idx} 
                  data={el} 
                />
              )
            }
          </div>
        </Container>
      </section>
    </>
  )
}

export default SectionReviews