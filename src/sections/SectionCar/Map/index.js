import { useTranslations } from 'next-intl'
import { useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

import classNames from 'classnames'

import { NAVIGATION } from 'constant/config'

import { getData } from 'helpers/api'
import { getDate } from 'helpers/getDate'
import { getFuelIcon } from 'helpers/getFuelIcon'
import { getFormatPrice } from 'helpers/getFormatPrice'
import { getFormatNumber } from 'helpers/getFormatNumber'

import Link from 'next/link'
import Image from 'next/image'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import Tags from 'modules/Tags'

import style from './index.module.scss'

const Map = ({ data, next }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const [cars, setCars] = useState([data, next])
  const [active, setActive] = useState(next.id)
  const [loading, setLoading] = useState(false)

  const handleClick = (index) => {
    setActive(index)
    handleLoad(index)
  }

  const getPointColor = (props) => {
    if (props.payload.active) {
      return style.active
    }

    if (props.id === active) {
      return style.selected
    }
  }

  const handleLoad = (index) => {
    setLoading(true)

    getData(`item/${index || active}`).then(json => {
      setCars((prevState) => [
        prevState[0],
        json
      ])
      setTimeout(() => setLoading(false), 500)
    })
  }

  const compareValues = (field, idx) => {
    if (!cars[0] || !cars[1]) return ''

    const getNestedValue = (obj, path) => path.split('.').reduce((acc, key) => acc && acc[key], obj);

    const value1 = Number(getNestedValue(cars[idx === 0 ? 0 : 1], field))
    const value2 = Number(getNestedValue(cars[idx === 0 ? 1 : 0], field))

    if (value2 > value1) {
      return 'lower'
    }
    return ''
  }

  return (
    <div className={style.block}>
      <div className={style.header}>{t('notification.price_map_title')}</div>
      <hr className={style.hr} />

      <div
        className={
          classNames(
            style.body,
            style.hiddenMobile
          )
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            data={data.price.price_map}
            margin={{
              top: 40,
              right: 10,
              left: 0,
              bottom: 24,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke={'var(--color-grey-100)'}
              strokeWidth={1}
            />
            <XAxis
              axisLine={false}
              tickLine={false}
              type={'number'}
              dataKey={'mileage'}
              tick={{ fill: '#979fad', fontSize: 12 }}
              tickFormatter={(mileage) =>
                `${getFormatNumber(auth?.account?.language?.code, mileage)} ${t(`filters.mileage_unit.${data.details.mileage_data.mileage_unit.id}`)}`
              }
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              type={'number'}
              dataKey={'price'}
              tick={{ fill: '#979fad', fontSize: 12 }}
              tickFormatter={(price) =>
                getFormatNumber(auth?.account?.language?.code, price)
              }
            >
              <Label
                value={data.price.currency.code}
                position="top"
                offset={24}
                fill={'#979fad'}
                fontSize={12}
              />
            </YAxis>
            <Scatter
              onClick={(e) => handleClick(e.id)}
              shape={(props) => (
                <circle
                  className={
                    classNames(
                      style.circle,
                      getPointColor(props),
                    )
                  }
                  cx={props.cx}
                  cy={props.cy}
                  r={8}
                />
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>


      <div
        className={
          classNames(
            style.body,
            style.hiddenDesktop
          )
        }
      >
        <div className={style.prices}>
          {
            data.price.price_map.map((el, idx) =>
              <button
                key={idx}
                type={'button'}
                className={
                  classNames(
                    style.button,
                    el.active && style.active,
                    el.id === active && style.selected,
                  )
                }
                onClick={(e) => handleClick(el.id)}
                aria-label={`${t('price_map')} ${el.id}`}
                title={`${t('price_map')} ${el.id}`}
              >
                <strong>{getFormatNumber(auth?.account?.language?.code, el.mileage)}</strong>
                <span>{t(`filters.mileage_unit.${data.details.mileage_data.mileage_unit.id}`)}</span>
                <span>-</span>
                <strong>{getFormatPrice(auth?.account?.language?.code, data.price.currency.code, el.price)}</strong>
              </button>
            )
          }
        </div>
      </div>

      <hr className={style.hr} />
      <div className={style.footer}>
        {
          cars?.map((el, idx) =>
            <Fragment key={idx}>
              <Link
                href={`${NAVIGATION.car.link}/${el.id}/${el.details.meta.slug}`}
                rel="noreferrer"
                target='_blank'
                className={
                  classNames(
                    style.card,
                    idx === 0 && style.active,
                    idx === 1 && style.next
                  )
                }
                aria-label={el.details.meta.name}
                title={el.details.meta.name}
              >
                {
                  (idx === 1 && loading) &&
                  <Loading classes={[style.loading]}/>
                }
                <p className={style.status}>{t(`notification.${idx === 0 ? 'chosen_car' : 'compared_car'}`)}</p>
                <Image
                  src={el.images[0]}
                  width={270}
                  height={270}
                  className={style.image}
                  priority={false}
                  alt={el.details.meta.name}
                />
                <h6 className={style.title}>{el.details.meta.name}</h6>

                <div className={style.price}>
                  <h5
                    className={
                      style[compareValues('price.price_data.price', idx)]
                    }
                  >
                    {getFormatPrice(auth?.account?.language?.code, el.price.currency.code, el.price.price_data.price)}
                  </h5>
                  <p className={style.vat}>
                    {
                      el.price.price_data.price_without_vat
                        ?
                          <><strong>{getFormatPrice(auth?.account?.language?.code, el.price.currency.code, el.price.price_data.price_without_vat)}</strong> {t('without_vat')}</>
                        :
                          <span>{t('not_deductible')}</span>
                    }
                  </p>
                </div>
                <ul className={style.list}>
                  <li
                    className={
                      classNames(
                        style.option,
                        style[compareValues('details.mileage_data.mileage', idx)]
                      )
                    }
                  >
                    <Icon
                      iconName={'road'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{el.details.mileage_data.mileage} ({t(`filters.mileage_unit.${el.details.mileage_data.mileage_unit.id}`)})</p>
                  </li>
                  <li
                    className={
                      classNames(
                        style.option,
                        style[compareValues('price.date.manufacture_registration', idx)]
                      )
                    }
                  >
                    <Icon
                      iconName={'calendar'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{getDate(el.details.date.manufacture_registration, 3)}</p>
                  </li>
                  <li
                    className={
                      classNames(
                        style.option,
                        style[compareValues('price.date.first_registration', idx)]
                      )
                    }
                  >
                    <Icon
                      iconName={'calendar'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{getDate(el.details.date.first_registration, 3)}</p>
                  </li>
                  <li className={style.option}>
                    <Icon
                      iconName={'engine'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{el.details.power_data.power} ({t(`filters.power_unit.${el.details.power_data.power_unit.id}`)})</p>
                  </li>
                  <li className={style.option}>
                    <Icon
                      iconName={'transmission'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{t(`filters.transmission.${el.details.transmission.id}`)}</p>
                  </li>
                  <li className={style.option}>
                    <Icon
                      iconName={getFuelIcon(el.details.fuel_type.id)}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{t(`filters.fuel_type.${el.details.fuel_type.id}`)}</p>
                  </li>
                </ul>
                <Tags data={el.equipment.featured_tags} isOpen={true} />
              </Link>
              {
                idx === 0 &&
                <hr
                  className={
                    classNames(
                      style.hr,
                      style.vertical
                    )
                  }
                />
              }
            </Fragment>
          )
        }
      </div>
    </div>
  )
}

export default Map
