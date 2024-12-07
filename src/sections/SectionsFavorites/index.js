"use client"

import { useTranslations } from 'next-intl'

import useFavorite from '@/hooks/useFavorite'

import Image from 'next/image'
import Container from '@/components/Container'
import Button from '@/components/Button'
import Card from '@/modules/Card'
import Skeleton from '@/modules/Skeleton'
import Pagination from '@/modules/Pagination'
import Sort from './Sort'

import style from './index.module.scss'

const SectionsFavorites = ({ initialData }) => {
  const t = useTranslations()
  const favoriteProps = useFavorite(initialData)

  const {
    handleChange,
    handleReset,
    data,
    loading,
    pagination,
  } = favoriteProps

  return (
    <Container>
      <div className={style.block}>
        <h4>{t('favourite_cars')}</h4>
        <div className={style.meta}>
          <Sort favoriteProps={favoriteProps} />
          <Button
            classes={['alt', 'sm']}
            placeholder={t('remove_all')}
            onChange={() => handleReset()}
          />
        </div>

        <div className={style.cards}>
          {
            pagination.pages > 1 &&
            <Pagination filtersProps={favoriteProps} />
          }
          {
            data?.data?.map((el, idx) =>
              loading
                ?
                  <Skeleton key={idx} />
                :
                  <Card
                    key={idx}
                    data={el}
                  />
            )
          }
          {
            pagination.pages > 1 &&
            <Pagination filtersProps={favoriteProps} />
          }
        </div>
        {/* :
            <div className={style.empty}>
              <Image
                width={419}
                height={337}
                className={style.decor}
                src={`/images/favorite-cars.svg`}
                priority={true}
                alt={'Favorite filters'}
              />
              <p>You add a car to favourites by clicking on a heart icon.</p>
            </div>
        } */}
      </div>
    </Container>
  )
}

export default SectionsFavorites