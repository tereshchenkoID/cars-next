"use client"

import { useTranslations } from 'next-intl'

import useData from './useData'

import { NAVIGATION } from '@/constant/config'

import Image from 'next/image'
import Container from '@/components/Container'
import Button from '@/components/Button'
import Reference from '@/components/Reference'
import Card from '@/modules/Card'
import Skeleton from '@/modules/Skeleton'
import Pagination from '@/modules/Pagination'
import Sort from './Sort'

import style from './index.module.scss'

const SectionsFavorites = ({ initialData }) => {
  const t = useTranslations()
  const favoriteProps = useData(initialData)

  const {
    handleReset,
    data,
    loading,
    pagination,
    search,
  } = favoriteProps

  return (
    <Container>
      <div className={style.block}>
        <h1>{t('favorite_cars')}</h1>
        {/* <pre className={style.pre}>{JSON.stringify(search, null, 2)}</pre> */}
        {
          data?.data?.length > 0
            ?
              <>
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
              </>
            :
              <div className={style.empty}>
                <Image
                  width={419}
                  height={337}
                  className={style.decor}
                  src={`/images/favorite-cars.svg`}
                  priority={true}
                  alt={'Favorite filters'}
                />
                <p>{t('notification.empty_favorites')}</p>
                <Reference
                  link={NAVIGATION.buy.link}
                  classes={['primary', 'md', style.link]}
                  placeholder={t('offers')}
                />
              </div>
        }
      </div>
    </Container>
  )
}

export default SectionsFavorites