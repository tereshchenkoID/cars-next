"use client"

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { NAVIGATION } from '@/constant/config'

import classNames from 'classnames'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import { getDate } from '@/helpers/getDate'
import { getFuelIcon } from '@/helpers/getFuelIcon'

import Link from 'next/link'
import Image from 'next/image'
import Tags from '@/modules/Tags'
import Option from '@/modules/Option'
import Loading from '@/components/Loading'
import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Betslip from './Betslip'
import Contact from './Contact'

const Share = dynamic(
  () => import('./Share'), 
  { ssr: false }
)
const Favorites = dynamic(
  () => import('./Favorites'), 
  { ssr: false }
)
const History = dynamic(
  () => import('./History'), 
  { ssr: false, loading: () => <Loading classes={'transparent'} /> }
)
const Map = dynamic(
  () => import('./Map'), 
  { ssr: false, loading: () => <Loading classes={'transparent'} /> }
)
const Questions = dynamic(
  () => import('./Questions'), 
  { ssr: false, loading: () => <Loading classes={'transparent'} /> }
)
const Comparison = dynamic(
  () => import('@/modules/Comparison'),
  { ssr: false, loading: () => <Loading classes={'transparent'} /> }
)

import style from './index.module.scss'

const SectionCar = ({ data, next }) => {
  const t = useTranslations()
  const extraTabs = [
    data.price_history.options && { id: 2, text: 'price_history' },
    next && { id: 3, text: 'price_map' },
    data.price_score.options && { id: 4, text: 'comparison' },
  ].filter(Boolean)

  const TABS = [
    { id: 0, text: 'details' },
    { id: 1, text: 'feature' },
    ...extraTabs,
    { id: 5, text: 'questions' },
  ]

  const router = useRouter()
  const sectionRefs = useRef(TABS.map(() => React.createRef()))
  const featureTags = data?.featured_tags.map(tag => tag.id)
  const [active, setActive] = useState(0)

  const groupedFeatures = useMemo(() => {
    return data?.features.reduce((acc, item) => {
      if (!acc[item.parentId]) {
        acc[item.parentId] = []
      }
      acc[item.parentId].push(item)
      return acc
    }, {})
  }, [data])

  const handleScroll = (id) => {
    sectionRefs.current[id].current.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    })
  }

  const onScroll = () => {
    sectionRefs.current.forEach((ref, index) => {
      if (ref.current) {
        const sectionTop = ref.current.getBoundingClientRect().top;
        if (sectionTop <= 150 && sectionTop >= 0) {
          setActive(index);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className={style.block}>
      <div className={style.head}>
        <Container classes={style.header}>
          <Button
            icon={'angle-left'}
            classes={['reference', 'sm', style.hide]}
            placeholder={(t('actions.back'))}
            onChange={() => router.back()}
          />
          <div className={style.meta}>
            <div className={style.details}>
              <h2 className={style.title}>{data.meta.name}</h2>
              <Favorites data={data} />
              <Share data={data} />
            </div>

            <ul className={style.options}>
              <li>
                <Option
                  size={'sm'}
                  iconName={'road'}
                  iconSize={20}
                  text={`${data.mileage_data.mileage} (${t(`filters.mileage.${data.mileage_data.mileage_unit.id}`)})`}
                />
              </li>
              <li>
                <Option
                  size={'sm'}
                  iconName={'calendar'}
                  iconSize={20}
                  text={getDate(data.date.manufacture, 5)}
                />
              </li>
              <li>
                <Option
                  size={'sm'}
                  iconName={'calendar'}
                  iconSize={20}
                  text={getDate(data.date.first_registration, 3)}
                />
              </li>
              <li>
                <Option
                  size={'sm'}
                  iconName={'engine'}
                  iconSize={20}
                  text={`${data.power_data.power} (${t(`filters.power.${data.power_data.power_unit.id}`)})`}
                />
              </li>
              <li>
                <Option
                  size={'sm'}
                  iconName={'transmission'}
                  iconSize={20}
                  text={t(`filters.transmission.${data.transmission.id}`)}
                />
              </li>
              <li>
                <Option
                  size={'sm'}
                  iconName={getFuelIcon(data.fuel_type.id)}
                  iconSize={20}
                  text={t(`filters.fuel_type.${data.fuel_type.id}`)}
                />
              </li>
            </ul>

            <Tags data={data.featured_tags} />
          </div>
        </Container>

        <div className={style.slider}>
          <Button
            icon={'angle-left'}
            classes={['sm', 'square', style.back]}
            onChange={() => router.back()}
          />
          <Swiper
            // @TODO Check class
            className={style.slider}
            slidesPerView={'auto'}
            // mousewheel={true}
            // keyboard={{
            //   enabled: true,
            // }}
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            modules={[Mousewheel, Pagination, Navigation]}
          >
            {
              data.images.map((el, idx) =>
                <SwiperSlide key={idx}>
                  <Image
                    src={el}
                    width={300}
                    height={300}
                    className={style.image}
                    priority={false}
                    alt={`${t('image')} ${idx}`}
                  />
                  <div
                    className={style.show}
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
                      width={32}
                      height={32}
                      iconName={'arrows'}
                    />
                  </div>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>
      </div>

      <div className={style.contacts}>
        <Container classes={style.social}>
          <Contact
            data={data.contact}
            meta={data.meta}
          />
        </Container>
      </div>

      <div className={style.tabs}>
        <Container classes={style.scroll}>
          {
            TABS.map((el, idx) =>
              <p
                key={idx}
                className={
                  classNames(
                    style.tab,
                    active === el.id && style.active
                  )
                }
                onClick={() => handleScroll(el.id)}
              >
                {t(el.text)}
              </p>
            )
          }
        </Container>
      </div>

      <Container classes={style.main}>
        <div className={style.column}>
          <div
            ref={sectionRefs.current[0]}
            className={style.body}
          >
            <h3
              className={
                classNames(
                  style.title,
                  style.lg
                )
              }
            >
              {t('details')}
            </h3>
            <ul
              className={
                classNames(
                  style.grid,
                  style.lg,
                )
              }
            >
              <li>
                <Option
                  size={'lg'}
                  iconName={'road'}
                  iconSize={32}
                  label={t('filters.mileage.0')}
                  text={`${Number(data.mileage_data.mileage)} (${t(`filters.mileage.${data.mileage_data.mileage_unit.id}`)})`}
                />
              </li>
              <li>
                <Option
                  size={'lg'}
                  iconName={'calendar'}
                  iconSize={32}
                  label={t('manufacture_registration')}
                  text={getDate(data.date.manufacture, 5)}
                />
              </li>
              <li>
                <Option
                  size={'lg'}
                  iconName={'calendar'}
                  iconSize={32}
                  label={t('first_registration')}
                  text={getDate(data.date.first_registration, 3)}
                />
              </li>
              <li>
                <Option
                  size={'lg'}
                  iconName={'engine'}
                  iconSize={32}
                  label={t('power')}
                  text={`${data.power_data.power} (${t(`filters.power.${data.power_data.power_unit.id}`)})`}
                />
              </li>
              <li>
                <Option
                  size={'lg'}
                  iconName={'transmission'}
                  iconSize={32}
                  label={t('filters.transmission.0')}
                  text={t(`filters.transmission.${data.transmission.id}`)}
                />
              </li>
              <li>
                <Option
                  size={'lg'}
                  iconName={'hybrid'}
                  iconSize={32}
                  label={t('filters.fuel_type.0')}
                  text={t(`filters.fuel_type.${data.fuel_type.id}`)}
                />
              </li>
              <li>
                <Option
                  size={'lg'}
                  iconName={'drive'}
                  iconSize={32}
                  label={t('filters.drive.0')}
                  text={data.drive.name}
                />
              </li>
              <li>
                <Option
                  size={'lg'}
                  iconName={'location'}
                  iconSize={32}
                  label={t('location')}
                  text={'Italy'}
                />
              </li>
            </ul>
          </div>

          <div className={style.body}>
            <h6
              className={
                classNames(
                  style.title,
                  style.sm
                )
              }
            >
              {t('general')}
            </h6>
            <ul className={style.info}>
              <li>
                <p>{t('vehicle_id')}</p>
                <strong>
                  {data.id}
                </strong>
              </li>
              <li>
                <p>{t('vin_code')}</p>
                <strong
                  style={{
                    wordBreak: 'break-all'
                  }}
                >
                  {data.meta.vin}
                </strong>
              </li>
              <li>
                <p>{t('make')}</p>
                <Link
                  href={`${NAVIGATION.buy.link}?make_${data.make.id}=0`}
                  rel="noreferrer"
                  className={style.link}
                  aria-label={data.make.name}
                  title={data.make.name}
                >
                  {data.make.name}
                </Link>
              </li>
              <li>
                <p>{t('model')}</p>
                <Link
                  href={`${NAVIGATION.buy.link}?make_${data.make.id}=${data.model.id}`}
                  rel="noreferrer"
                  className={style.link}
                  aria-label={data.model.name}
                  title={data.model.name}
                >
                  {data.model.name}
                </Link>
              </li>
              <li>
                <p>{t('engine_capacity')}</p>
                <strong>{data.power_data.capacity} (cm)</strong>
              </li>
              <li>
                <p>{t('filters.body.0')}</p>
                <strong>{t(`filters.body.${data.body.id}`)}</strong>
              </li>
              <li>
                <p>{t('body_color')}</p>
                <strong>
                  <span
                    className={style.color}
                    style={{ backgroundColor: t(`filters.color.${data.color.id}`) }}
                    title={t(`filters.color.${data.color.id}`)}
                  />
                  <span
                    style={{
                      textTransform: 'capitalize'
                    }}
                  >
                    {t(`filters.color.${data.color.id}`)}
                  </span>
                </strong>
              </li>
              <li>
                <p>{t('doors')}</p>
                <strong>{data.number_of_doors}</strong>
              </li>
              <li>
                <p>{t('seats')}</p>
                <strong>{data.number_of_seats}</strong>
              </li>
              <li>
                <p>{t('description')}</p>
                <p>{data.meta.description}</p>
              </li>
            </ul>
          </div>

          <div
            ref={sectionRefs.current[1]}
            className={style.body}
          >
            <h3
              className={
                classNames(
                  style.title,
                  style.lg
                )
              }
            >
              {t('feature')}
            </h3>
            <div
              className={
                classNames(
                  style.grid,
                  style.sm,
                )
              }
            >
              {Object.entries(groupedFeatures).map(([parentId, group]) => (
                <div key={parentId}>
                  <h6
                    className={
                      classNames(
                        style.title,
                        style.sm
                      )
                    }
                  >
                    {t(`features.${parentId}.0`)}
                  </h6>
                  <ul className={style.features}>
                    {group.map(item => (
                      <li key={item.id}>
                        <p
                          className={
                            classNames(
                              style.feature,
                              featureTags.includes(item.id) && style.active
                            )
                          }
                        >
                          {t(`features.${parentId}.${item.id}`)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {
            data.price_history.options &&
            <div
              ref={sectionRefs.current[2]}
              className={style.body}
            >
              <h3
                className={
                  classNames(
                    style.title,
                    style.lg
                  )
                }
              >
                {t('price_history')}
              </h3>
              <div className={style.wrapper}>
                <History data={data} />
              </div>
            </div>
          }

          {
            next &&
            <div
              ref={sectionRefs.current[3]}
              className={style.body}
            >
              <h3
                className={
                  classNames(
                    style.title,
                    style.lg
                  )
                }
              >
                {t('price_map')}
              </h3>
              <div className={style.wrapper}>
                <Map data={data} next={next} />
              </div>
            </div>
          }

          {
            data.price_score.options &&
            <div
              ref={sectionRefs.current[4]}
              className={style.body}
            >
              <h3
                className={
                  classNames(
                    style.title,
                    style.lg
                  )
                }
              >
                {t('comparison')}
              </h3>
              <div className={style.wrapper}>
                <Comparison data={data} />
              </div>
            </div>
          }

          <div
            ref={sectionRefs.current[5]}
            className={style.body}
          >
            <h3
              className={
                classNames(
                  style.title,
                  style.lg
                )
              }
            >
              {t('questions')}
            </h3>
            <div className={style.wrapper}>
              <Questions data={data} />
            </div>
          </div>
        </div>
        <Betslip data={data} />
      </Container>
    </section>
  )
}

export default SectionCar