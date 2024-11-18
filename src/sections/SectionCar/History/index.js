import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import {
  AreaChart,
  Area,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts'

import { getDate } from '@/helpers/getDate'
import { getFormatNumber } from '@/helpers/getFormatNumber'
import { getFormatPrice } from '@/helpers/getFormatPrice'

import Discount from '@/modules/Discount'

import style from './index.module.scss'

const CustomTooltip = ({ data, active, payload, label, auth }) => {
  if (active && payload && payload.length) {
    return (
      <div className={style.tooltip}>
        <p>{`${getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, payload[0].value)} - ${getDate(label, 3)}`}</p>
      </div>
    )
  }

  return null
}

const CustomDot = (props) => {
  const { cx, cy } = props
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#8884d8"
      stroke="#fff"
      strokeWidth={2}
    />
  )
}

const CustomLabel = ({ x, y, value, index, dataLength, chartHeight }) => {
  const labelText = parseFloat(value).toLocaleString();
  const labelHeight = 18
  const adjustedY = y - 25 < 0 ? y + labelHeight / 2 : y - 25
  let adjustedX = x

  if (index === 0) {
    adjustedX += labelText.length * 4
  } else if (index === dataLength - 1) {
    adjustedX -= labelText.length * 4
  }

  return (
    <g>
      <rect x={adjustedX - labelText.length * 4} y={adjustedY} width={labelText.length * 8} height={labelHeight} fill="#3e47dd" rx={4} />
      <text x={adjustedX} y={adjustedY + labelHeight / 2 + 1} fill="white" fontSize={10} fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
        {labelText}
      </text>
    </g>
  );
};

const History = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)

  return (
    <div className={style.block}>
      <div className={style.header}>
        <div>
          <p className={style.discount}><strong>{data.price_history.counts}</strong> {t('change')}</p>
          <h6 className={style.days}>{data.price_history.days || 1} {t('days')}</h6>
        </div>
        {
          data.price_data.discount &&
          <Discount
            size={'sm'}
            amount={getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data.price_data.discount)}
          />
        }
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data.price_history.options}
          margin={{
            top: 40,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#8884d8" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke={'var(--color-grey-100)'}
            strokeWidth={1}
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="date"
            tick={{ fill: '#979fad', fontSize: 12 }}
            tickFormatter={(date) =>
              getDate(date, 3)
            }
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            dataKey="price"
            tickCount={3}
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
          <Tooltip
            content={
              <CustomTooltip data={data} auth={auth} />
            }
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
            dot={<CustomDot />}
          >
            <LabelList
              dataKey="price"
              content={({ x, y, value, index }) => (
                <CustomLabel
                  x={x}
                  y={y}
                  value={value}
                  index={index}
                  dataLength={data.price_history.options.length}
                />
              )}
            />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default History