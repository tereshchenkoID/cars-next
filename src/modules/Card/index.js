import { useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import classNames from 'classnames'

import { CARD_STATUS, NAVIGATION, ROUTES_USER } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { postData } from '@/helpers/api'
import { getDate } from '@/helpers/getDate'
import { getFormatPrice } from '@/helpers/getFormatPrice'
import { getFuelIcon } from '@/helpers/getFuelIcon'
import { setToastify } from '@/store/actions/toastifyAction'
import { setFavorite } from '@/store/actions/favoriteAction'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '@/components/Icon'
import Loading from '@/components/Loading'
import Tags from '@/modules/Tags'
import Option from '@/modules/Option'
import Discount from '@/modules/Discount'
import LoginModal from '@/modules/LoginModal'

import style from './index.module.scss'

const Card = ({ data, isProfile = false }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { showModal } = useModal()
  const auth = useSelector((state) => state.auth)
  const isAuth = auth?.id
  const [image, setImage] = useState(false)
  const [favorites, setFavorites] = useState(data.is_favorite)
  const domain = isProfile ? ROUTES_USER.vehicles.link : NAVIGATION.car.link
  
  const handleFavorite = (type) => {
    if(isAuth) {
      const formData = new FormData()
      formData.append('id', data.id)
      formData.append('type', type)
      formData.append('userId', isAuth)

      postData('user/favorites/action/', formData).then(json => {
        if (json) {
          setFavorites(type === '0' ? '1' : '0')

          dispatch(
            setToastify({
              type: 'success',
              text: type === '1' ? t('notification.removed_favorites') : t('notification.added_favorites'),
            })
          )
          dispatch(setFavorite(json.counts, isAuth))

        } else {
          dispatch(
            setToastify({
              type: 'error',
              text: json.error_message,
            })
          )
        }
      })
    }
    else {
      showModal(<LoginModal />)
    }
  }

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
        {/* {!image && <Loading classes={style.loading} />}
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
              lazy={true}
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
                      style={{ aspectRatio: 277 / 207 }}
                      alt={`${data.slug} ${idx}`}
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
        } */}

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
          onClick={() => handleFavorite(favorites === '0' ? '0' : '1')}
        >
          {/* {favorites} */}
          <Icon
            iconName={'heart-filled'}
            width={24}
            height={24}
            stroke={'var(--color-white)'}
            strokeWidth={2}
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
              text={`${Number(data.mileage_data.mileage)} (${t(`filters.mileage.${data.mileage_data.mileage_unit.id}`)})`}
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
              text={`${data.power_data.power} (${t(`filters.power.${data.power_data.power_unit.id}`)})`}
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
          </div>
        </div>
      </div>
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
  )
}

export default Card
