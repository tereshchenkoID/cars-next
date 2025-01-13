"use client"

import { useTranslations } from 'next-intl'

import useData from './useData'

import { ROUTES_USER, NAVIGATION } from '@/constant/config'

import Image from 'next/image'
import Container from '@/components/Container'
import Reference from '@/components/Reference'
import Button from '@/components/Button'
import Pagination from '@/modules/Pagination'
import Skeleton from '@/modules/Skeleton'
import Card from '@/modules/Card'
import Sort from './Sort'

import style from './index.module.scss'

const SectionVehicles = ({ initialData }) => {
  const t = useTranslations()
  const favoriteProps = useData(initialData)

  const {
    handleReset,
    data,
    loading,
    pagination,
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
                  <Sort favoriteProps={favoriteProps} />
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
      </Container>
    </section>
  )
}

export default SectionVehicles