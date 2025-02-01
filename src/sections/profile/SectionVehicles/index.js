"use client"

import { useTranslations } from 'next-intl'

import useData from './useData'

import { ROUTES_USER } from '@/constant/config'

import Container from '@/components/Container'
import Reference from '@/components/Reference'
import Pagination from '@/modules/Pagination'
import Skeleton from '@/modules/Skeleton'
import Card from '@/modules/Card'
import Sort from '@/modules/Sort'
import EmptyCars from '@/modules/EmptyCars'

import style from './index.module.scss'

const SectionVehicles = ({ initialData }) => {
  const t = useTranslations()
  const favoriteProps = useData(initialData)

  const {
    handleReset,
    handleChange,
    data,
    loading,
    pagination,
    search,
  } = favoriteProps

  return (
    <section className={style.block}>
      <Container classes={style.container}>
        <h1>{t('navigation.vehicles')}</h1>
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
                  <Reference
                    link={`${ROUTES_USER.vehicles.link}/0/add-cars`}
                    classes={['alt', 'sm']}
                    placeholder={t('add_vehicle')}
                    icon={'circle-plus'}
                    width={16}
                    height={16}
                    // onChange={() => handleReset()}
                  />
                  {/* <Button
                    classes={['alt', 'sm']}
                    placeholder={t('remove_all')}
                    onChange={() => handleReset()}
                  /> */}
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
                            isProfile={true}
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

export default SectionVehicles