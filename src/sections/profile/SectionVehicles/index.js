"use client"

import { useTranslations } from 'next-intl'

import useData from './useData'

import { ROUTES_USER } from 'constant/config'

import Container from 'components/Container'
import Reference from 'components/Reference'
import Pagination from 'modules/Pagination'
import Sort from 'modules/Sort'
import EmptyCars from 'modules/EmptyCars'
import VehicleCard from 'modules/Cards/VehicleCard'

import style from './index.module.scss'

const SectionVehicles = ({ initialData }) => {
  const t = useTranslations()
  const vehiclesProps = useData(initialData || [])

  const {
    handleReset,
    handleChange,
    data,
    loading,
    pagination,
    search,
  } = vehiclesProps

  return (
    <section className={style.block}>
      <Container classes={style.container}>
        <h1>{t('navigation.vehicles')}</h1>
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
                  <Reference
                    link={`${ROUTES_USER.vehicles.link}/0/add-cars`}
                    classes={['alt', 'sm']}
                    placeholder={t('add_vehicle')}
                    icon={'circle-plus'}
                    // onChange={() => handleReset()}
                  />
                  {/* <Button
                    classes={['alt', 'sm']}
                    placeholder={t('remove_all')}
                    onChange={() => handleReset()}
                  /> */}
                </div>
                <div className={style.cards}>
                  <Pagination filtersProps={vehiclesProps} />
                  {
                    data?.map((el, idx) =>
                      <VehicleCard
                        key={idx}
                        data={el}
                        isProfile={true}
                        isLoading={loading}
                      />
                    )
                  }
                  <Pagination filtersProps={vehiclesProps} />
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
