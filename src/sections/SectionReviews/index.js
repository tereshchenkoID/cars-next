"use client"

import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import useData from './useData'

import Button from 'components/Button'
import Container from 'components/Container'
import StarRating from 'modules/StarRating'
import ReviewCard from 'modules/Cards/ReviewCard'

import style from './index.module.scss'

const SectionReviews = ({ initialData }) => {
  const t = useTranslations()
  const settings = useSelector(state => state.settings)
  const reviewsProps = useData(initialData || [])

  const {
    data,
    pagination,
    loading,
    handleMore,
  } = reviewsProps

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
              data?.map((el, idx) =>
                <ReviewCard
                  key={idx}
                  data={el}
                  loading={loading}
                />
              )
            }
          </div>
          {
            pagination?.page < pagination?.pages &&
            <Button
              classes={['primary', 'md', style.more]}
              placeholder={t('more')}
              onChange={handleMore}
              isLoading={loading}
            />
          }
        </Container>
      </section>
    </>
  )
}

export default SectionReviews
