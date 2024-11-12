import { useTranslations } from 'next-intl'
import { useEffect, useState, Fragment } from 'react'
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

import { getData } from '@/helpers/api'
import { getFuelIcon } from '@/helpers/getFuelIcon'
import { getFormatPrice } from '@/helpers/getFormatPrice'
import { getFormatNumber } from '@/helpers/getFormatNumber'

import Image from 'next/image'
import Icon from '@/components/Icon'
import Tags from '@/modules/Tags'

import style from './index.module.scss'

const options = [
  {
    id: '68837112',
    mileage: '40139',
    price: '27091',
    selected: true
  },
  {
    id: '68837122',
    mileage: '19100',
    price: '33116',
    active: true
  },
  {
    id: '68837130',
    mileage: '33702',
    price: '21718'
  },
  {
    id: '68837131',
    mileage: '75000',
    price: '15791'
  }
]

const Comparison = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const filters = useSelector((state) => state.filters)
  const [cars, setCars] = useState([data, null])
  const [active, setActive] = useState(options.find(option => option.selected)?.id || options[0].id)
  const [loading, setLoading] = useState(true)

  const handleClick = (index) => {
    setActive(index)
  }

  const getPointColor = (props) => {
    if (props.payload.active) {
      return style.active
    }

    if (props.id === active) {
      return style.selected
    }
  }

  const handleLoad = () => {
    getData(`item/${active}`).then(json => {
      setCars((prevState) => [
        prevState[0],
        json
      ])
      setLoading(false)
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

  useEffect(() => {
    handleLoad()
  }, [active])

  if(loading)
    return

  return (
    <div className={style.block}>
      <div className={style.header}>{t('notification.price_map_title')}</div>
      <hr className={style.hr} />
      <div className={style.body}>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            data={options}
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
                `${getFormatNumber(auth?.account?.language?.code, mileage)} ${data.mileage_data.mileage_unit}`
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
                value={data.currency.name}
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
      <hr className={style.hr} />
      <div className={style.footer}>
        {
          cars?.map((el, idx) => 
            <Fragment key={idx}>
              <div
                className={
                  classNames(
                    style.card,
                    idx === 0 && style.active,
                    idx === 1 && style.next
                  )
                }
              >
                <p className={style.status}>{t(`notification.${idx === 0 ? 'chosen_car' : 'compared_car'}`)}</p>
                <Image
                  src={el.images[0]}
                  width={270}
                  height={270}
                  className={style.image}
                  priority={false}
                  alt={el.meta.name}
                />
                <h6 className={style.title}>{el.meta.name}</h6>

                <div className={style.price}>
                  <h5 
                    className={
                      style[compareValues('price_data.price', idx)]
                    }
                  >
                    {getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, el.price_data.price)}
                  </h5>
                  <p className={style.vat}>
                    {
                      el.price_data.price_without_vat
                        ?
                        <><strong>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, el.price_data.price_without_vat)}</strong> {t('without_vat')}</>
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
                        style[compareValues('mileage_data.mileage', idx)]
                      )
                    }
                  >
                    <Icon
                      iconName={'road'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{el.mileage_data.mileage} {el.mileage_data.mileage_unit}</p>
                  </li>
                  <li className={style.option}>
                    <Icon
                      iconName={'calendar'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{el.date.manufacture}</p>
                  </li>
                  <li className={style.option}>
                    <Icon
                      iconName={'engine'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{el.power_data.power} {el.power_data.power_unit}</p>
                  </li>
                  <li className={style.option}>
                    <Icon
                      iconName={'transmission'}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{t(`filters.transmission.${el.transmission.id}`)}</p>
                  </li>
                  <li className={style.option}>
                    <Icon
                      iconName={getFuelIcon(el.fuel_type.id)}
                      width={16}
                      height={16}
                      className={style.icon}
                    />
                    <p>{t(`filters.fuel_type.${el.fuel_type.id}`)}</p>
                  </li>
                </ul>

                <Tags data={el.featured_tags} />
              </div>
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

export default Comparison