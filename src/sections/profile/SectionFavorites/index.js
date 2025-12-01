"use client"

import { useTranslations } from 'next-intl'

import useData from './useData'

import Container from 'components/Container'
import Sort from 'modules/Sort'
import Pagination from 'modules/Pagination'
import EmptyCars from 'modules/EmptyCars'
import VehicleCard from 'modules/Cards/VehicleCard'

import style from './index.module.scss'

const SectionsFavorites = ({ initialData }) => {
  const t = useTranslations()
  const favoriteProps = useData(initialData || [])

  const {
    handleLoad,
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
        {
          data?.length > 0
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
                  <Pagination filtersProps={favoriteProps} />
                  {
                    data?.map((el, _) =>
                      <VehicleCard
                        key={el.id}
                        data={el}
                        isLoading={loading}
                        updateFavorites={() => handleLoad(search.page, search.sort)}
                      />
                    )
                  }
                  <Pagination filtersProps={favoriteProps} />
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
