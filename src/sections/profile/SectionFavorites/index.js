"use client"

import { useTranslations } from 'next-intl'

import useData from './useData'

import Container from 'components/Container'
import Card from 'modules/Card'
import Skeleton from 'modules/Skeleton'
import Pagination from 'modules/Pagination'
import Sort from 'modules/Sort'
import EmptyCars from 'modules/EmptyCars'

import style from './index.module.scss'

const SectionsFavorites = ({ initialData }) => {
  const t = useTranslations()
  const favoriteProps = useData(initialData)

  const {
    handleChange,
    data,
    loading,
    pagination,
    search,
  } = favoriteProps

  return (
    <section className={style.block}>
      <Container classes={style.container}>
        <h1>{t('favorite_cars')}</h1>
        {/* <pre className={style.pre}>{JSON.stringify(search, null, 2)}</pre> */}
        {
          data?.data?.length > 0
            ?
              <>
                <div className={style.meta}>
                  <Sort
                    results={pagination.results}
                    search={search}
                    handleChange={handleChange}
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
              <EmptyCars />
        }
      </Container>
    </section>
  )
}

export default SectionsFavorites
