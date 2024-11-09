"use client"

import dynamic from 'next/dynamic'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'
import { Fancybox } from '@fancyapps/ui'

import { getFuelIcon } from '@/helpers/getFuelIcon'

import Image from 'next/image'
import Tags from '@/modules/Tags'
import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Betslip from './Betslip'
import History from './History'

const Share = dynamic(() => import('./Share'), {
  ssr: false,
})

const Favorites = dynamic(() => import('./Favorites'), {
  ssr: false,
})

import style from './index.module.scss'

const TABS = [
  {
    id: 0,
    text: 'details'
  },
  {
    id: 1,
    text: 'feature'
  },
  {
    id: 2,
    text: 'price_history'
  },
  {
    id: 3,
    text: 'price_map'
  }
]

const SectionCar = ({ data }) => {
  const t = useTranslations()
  const router = useRouter()
  const filters = useSelector((state) => state.filters)
  const sectionRefs = useRef(TABS.map(() => React.createRef()))
  const [active, setActive] = useState(0)

  console.log(data)

  const featureTags = data?.featured_tags.map(tag => tag.id)

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
    <article className={style.block}>
      <div className={style.head}>
        <Container classes={style.header}>
          <Button
            icon={'angle-left'}
            classes={['reference', 'sm', style.hide]}
            placeholder={(t('back'))}
            onChange={() => router.back()}
          />
          <div className={style.meta}>
            <div className={style.details}>
              <h2 className={style.title}>{data.meta.name}</h2>
              <Favorites data={data} />
              <Share data={data} />
            </div>

            <ul className={style.options}>
              <li
                className={
                  classNames(
                    style.option,
                    style.sm
                  )
                }
              >
                <Icon
                  iconName={'road'}
                  width={24}
                  height={24}
                  className={style.icon}
                />
                <p>{data.mileage_data.mileage} {data.mileage_data.mileage_unit}</p>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.sm
                  )
                }
              >
                <Icon
                  iconName={'calendar'}
                  width={24}
                  height={24}
                  className={style.icon}
                />
                <p>{data.date.manufacture}</p>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.sm
                  )
                }
              >
                <Icon
                  iconName={'calendar'}
                  width={24}
                  height={24}
                  className={style.icon}
                />
                <p>{data.date.first_registration}</p>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.sm
                  )
                }
              >
                <Icon
                  iconName={'engine'}
                  width={24}
                  height={24}
                  className={style.icon}
                />
                <p>{data.power_data.power} {data.power_data.power_unit}</p>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.sm
                  )
                }
              >
                <Icon
                  iconName={'transmission'}
                  width={24}
                  height={24}
                  className={style.icon}
                />
                <p>{filters['transmission'].options[data.transmission.id]}</p>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.sm
                  )
                }
              >
                <Icon
                  iconName={getFuelIcon(data.fuel_type.id)}
                  width={24}
                  height={24}
                  className={style.icon}
                />
                <p>{filters['fuel_type'].options[data.fuel_type.id]}</p>
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
          <div className={style.contact}>
            <p>1</p>
          </div>
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
        <div>
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
              Details
            </h3>
            <ul
              className={
                classNames(
                  style.grid,
                  style.lg,
                )
              }
            >
              <li
                className={
                  classNames(
                    style.option,
                    style.lg
                  )
                }
              >
                <Icon
                  iconName={'road'}
                  width={32}
                  height={32}
                  className={style.icon}
                />
                <div>
                  <p className={style.label}>{t('filters.mileage.0')}</p>
                  <p className={style.text}>{data.mileage_data.mileage} {data.mileage_data.mileage_unit}</p>
                </div>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.lg
                  )
                }
              >
                <Icon
                  iconName={'calendar'}
                  width={32}
                  height={32}
                  className={style.icon}
                />
                <div>
                  <p className={style.label}>Manufacture registration</p>
                  <p className={style.text}>{data.date.manufacture}</p>
                </div>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.lg
                  )
                }
              >
                <Icon
                  iconName={'calendar'}
                  width={32}
                  height={32}
                  className={style.icon}
                />
                <div>
                  <p className={style.label}>First registration</p>
                  <p className={style.text}>{data.date.first_registration}</p>
                </div>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.lg
                  )
                }
              >
                <Icon
                  iconName={'engine'}
                  width={32}
                  height={32}
                  className={style.icon}
                />
                <div>
                  <p className={style.label}>Power</p>
                  <p className={style.text}>{data.power_data.power} {data.power_data.power_unit}</p>
                </div>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.lg
                  )
                }
              >
                <Icon
                  iconName={'transmission'}
                  width={32}
                  height={32}
                  className={style.icon}
                />
                <div>
                  <p className={style.label}>{t('filters.transmission.0')}</p>
                  <p className={style.text}>{filters['transmission'].options[data.transmission.id]}</p>
                </div>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.lg
                  )
                }
              >
                <Icon
                  iconName={'hybrid'}
                  width={32}
                  height={32}
                  className={style.icon}
                />
                <div>
                  <p className={style.label}>{t('filters.fuel_type.0')}</p>
                  <p className={style.text}>{filters['fuel_type'].options[data.fuel_type.id]}</p>
                </div>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.lg
                  )
                }
              >
                <Icon
                  iconName={'drive'}
                  width={32}
                  height={32}
                  className={style.icon}
                />
                <div>
                  <p className={style.label}>{t('filters.drive.0')}</p>
                  <p className={style.text}>{data.drive.name}</p>
                </div>
              </li>
              <li
                className={
                  classNames(
                    style.option,
                    style.lg
                  )
                }
              >
                <Icon
                  iconName={'location'}
                  width={32}
                  height={32}
                  className={style.icon}
                />
                <div>
                  <p className={style.label}>Location</p>
                  <p className={style.text}>Italy</p>
                </div>
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
              General
            </h6>
            <ul className={style.info}>
              <li>
                <p>Vehicle ID</p>
                <strong>{data.id}</strong>
              </li>
              <li>
                <p>Make</p>
                <strong>{data.make.name}</strong>
              </li>
              <li>
                <p>Model</p>
                <strong>{data.model.name}</strong>
              </li>
              <li>
                <p>Body</p>
                <strong>{t(`filters.vehicle_type.${data.body.id}`)}</strong>
              </li>
              <li>
                <p>Body color</p>
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
                <p>Doors</p>
                <strong>{data.number_of_doors}</strong>
              </li>
              <li>
                <p>Seats</p>
                <strong>{data.number_of_seats}</strong>
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
              Features
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
              Price history
            </h3>
            <History data={data} />
          </div>

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
              Price map
            </h3>
          </div>
        </div>
        <Betslip data={data} />
      </Container>
    </article>
  )
}

export default SectionCar