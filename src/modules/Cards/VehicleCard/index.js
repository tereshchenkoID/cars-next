import { useState } from 'react'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { CARD_STATUS, NAVIGATION, ROUTES_USER } from 'constant/config'

import { useAuth } from 'hooks/useAuth'
import { useFavourite } from 'hooks/useFavourite'
import { getDate } from 'helpers/getDate'
import { getFormatPrice } from 'helpers/getFormatPrice'
import { getFuelIcon } from 'helpers/getFuelIcon'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import Link from 'next/link'
import Image from 'next/image'
import Button from 'components/Button'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import Top from 'modules/Top'
import Tags from 'modules/Tags'
import Option from 'modules/Option'
import Discount from 'modules/Discount'
import Skeleton from './Skeleton'

import style from './index.module.scss'

const VehicleCard = ({
  data,
  isProfile = false,
  isLoading = true,
  updateFavorites = () => {},
}) => {
  const t = useTranslations()
  const { auth } = useAuth()
  const [image, setImage] = useState(false)
  const domain = isProfile ? ROUTES_USER.vehicles.link : NAVIGATION.car.link

  const { favorites, toggleFavorite } = useFavourite(
    data.is_favorite,
    data.id,
    updateFavorites
  )

  if (isLoading) return <Skeleton />

  return (
    <div
      className={
        classNames(
          style.block,
          style[CARD_STATUS[data.status]]
        )
      }
    >
      <div className={style.left}>
        {
          !image &&
          <Loading classes={style.loading} />
        }
        {
          data.images.length > 0 &&
          <>
            <Swiper
              className={style.slider}
              slidesPerView={1}
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              // lazy={true}
              navigation={true}
              mousewheel={true}
              modules={[Pagination, Mousewheel, Navigation]}
            >
              {
                data.images?.map((el, idx) =>
                  <SwiperSlide key={idx}>
                    <Image
                      src={el}
                      width={277}
                      height={207}
                      className={style.image}
                      priority={idx === 0}
                      fetchPriority={idx === 0 ? 'high' : 'low'}
                      style={{ aspectRatio: 277 / 207 }}
                      alt={`${data.meta.slug} ${idx}`}
                      onLoad={() => {
                        if (idx === 0) setImage(true)
                      }}
                    />
                  </SwiperSlide>
                )
              }
            </Swiper>

            <div
              className={style.count}
              onClick={() => {
                Fancybox.show(
                  data.images.map((src, index) => ({
                    src,
                    type: 'image',
                    caption: `${t('image')} ${index + 1}`,
                  })),
                  {
                    groupAll: true,
                  }
                );
              }}
            >
              <Icon
                iconName={'image'}
                width={24}
                height={24}
              />
              {data.images?.length}
            </div>
          </>
        }
        <button
          type={'button'}
          className={
            classNames(
              style.favorite,
              favorites === '1' && style.active
            )
          }
          aria-label={t('favorite')}
          title={t('favorite')}
          onClick={() => toggleFavorite(favorites === '0' ? '0' : '1')}
        >
          <Icon
            iconName={'heart-filled'}
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className={style.right}>
        <Link
          href={`${domain}/${data.id}/${data.meta.slug}`}
          className={style.link}
        >
          {data.meta.name}
        </Link>
        <ul className={style.options}>
          <li>
            <Option
              size={'xs'}
              iconName={'road'}
              iconSize={18}
              text={`${Number(data.mileage_data.mileage)} (${t(`filters.mileage_unit.${data.mileage_data.mileage_unit.id}`)})`}
            />
          </li>
          <li>
            <Option
              size={'xs'}
              iconName={'calendar'}
              iconSize={18}
              text={getDate(data.meta.first_registration_date, 3)}
            />
          </li>
          <li>
            <Option
              size={'xs'}
              iconName={'calendar'}
              iconSize={18}
              text={getDate(data.meta.manufacture_date, 5)}
            />
          </li>
          <li>
            <Option
              size={'xs'}
              iconName={'engine'}
              iconSize={18}
              text={`${data.power_data.power} (${t(`filters.power_unit.${data.power_data.power_unit.id}`)})`}
            />
          </li>
          <li>
            <Option
              size={'xs'}
              iconName={'transmission'}
              iconSize={18}
              text={t(`filters.transmission.${data.transmission.id}`)}
            />
          </li>
          <li>
            <Option
              size={'xs'}
              iconName={getFuelIcon(data.fuel_type.id)}
              iconSize={18}
              text={t(`filters.fuel_type.${data.fuel_type.id}`)}
            />
          </li>
        </ul>
        {
          data.featured_tags &&
          <Tags data={data.featured_tags} />
        }
        <div className={style.footer}>
          <div className={style.meta}>
            <h5>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price)}</h5>
            <p className={style.vat}>
              {
                data.price_data.price_without_vat
                  ?
                  <><strong>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data.price_data.price_without_vat)}</strong> {t('without_vat')}</>
                  :
                  <span>{t('not_deductible')}</span>
              }
            </p>

            <ul className={style.descriptions}>
              <li className={style.description}>
                <Icon
                  iconName={'clock'}
                  width={16}
                  height={16}
                />
                <strong>{getDate(data.meta.created_at, 3)}</strong>
              </li>
              {
                Object.entries(data.meta.stats).map(([key, { value, visible }]) =>
                  visible !== 0 &&
                  <li
                    key={key}
                    className={style.description}
                    title={t(key)}
                  >
                    <Icon
                      iconName={key}
                      width={16}
                      height={16}
                    />
                    <strong>{value}</strong>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        {
          isProfile &&
          <div className={style.actions}>
            <Button
              icon={'reload'}
              classes={['success', 'md', 'square', style.action]}
            />
            <Button
              icon={'edit'}
              classes={['info', 'md', 'square', style.action]}
            />
            <Button
              icon={'trash'}
              classes={['warning', 'md', 'square', style.action]}
            />
          </div>
        }
      </div>
      <div className={style.labels}>
        {
          data.meta.top &&
          <div
            className={
              classNames(
                style.label,
                style.top
              )
            }
          >
            <Top
              size={'sm'}
              count={data.meta.top.level}
            />
          </div>
        }
        {
          data.status === '1'
            ?
            data.price_data.discount &&
            <div
              className={
                classNames(
                  style.label,
                  style.discount
                )
              }
            >
              <Discount
                size={'sm'}
                amount={getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data.price_data.discount)}
              />
            </div>
            :
            <div
              className={
                classNames(
                  style.label,
                  style[CARD_STATUS[data.status]]
                )
              }
            >
              <strong className={style.status}>
                <Icon
                  iconName={'warning'}
                  width={14}
                  height={14}
                />
                <span>{t(CARD_STATUS[data.status])}</span>
              </strong>
            </div>
        }
      </div>
    </div>
  )
}

export default VehicleCard
