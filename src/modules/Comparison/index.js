import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getFormatPrice } from 'helpers/getFormatPrice'

import Graph from './Graph'
import Scale from './Scale'

import style from './index.module.scss'

const LABELS = [
  {
    text: 'top_offer',
    hex: '#67b92e'
  },
  {
    text: 'very_good_price',
    hex: '#88bd04'
  },
  {
    text: 'fair_price',
    hex: '#c5d700'
  },
  {
    text: 'higher_price',
    hex: '#f4be00'
  },
  {
    text: 'high_price',
    hex: '#fe8900'
  }
]

const Comparison = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const price = Number(data.price_data.price)
  const options = data.price_score.options.map(Number)
  const period = useMemo(() => {
    if (price < options[0]) {
      return 1
    }
    if (price >= options[options.length - 1]) {
      return options.length - 1
    }

    const index = options.findIndex((value, idx) =>
      price >= value && price < (options[idx + 1] ?? Infinity)
    )

    return index + 1
  }, [options, data])

  return (
    <div className={style.block}>
      <p className={style.title}>
        <span dangerouslySetInnerHTML={{ __html: t('notification.similar_vehicle').replace('[cars]', `<strong>${data.price_score.cars}</strong>`) }} />
        <span dangerouslySetInnerHTML={{ __html: t('notification.vehicle_characteristics').replace('[count]', `<strong>${data.price_score.counts}</strong>`) }} />
      </p>
      <div className={style.wrapper}>
        <div className={style.labels}>
          {
            LABELS.map((el, idx) =>
              <p
                key={idx}
                className={style.label}
                style={{
                  color: LABELS[idx]?.hex
                }}
              >
                {t(el.text)}
              </p>
            )
          }
        </div>
        <div className={style.scale}>
          {
            options.map((el, idx) =>
              idx !== 0 &&
              <Scale
                key={idx}
                idx={idx}
                min={Number(options[idx === 0 ? 0 : idx - 1])}
                max={Number(el)}
                data={price}
                period={period}
              />
            )
          }
        </div>
        <div className={style.prices}>
          {
            options.slice(0, -1).map((el, idx) =>
              <div
                key={idx}
                className={style.price}
              >
                <Graph active={idx} />
                <div>
                  {
                    idx !== 0 &&
                    <p>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, el)}</p>
                  }
                  <p
                    style={{
                      color: LABELS[idx]?.hex
                    }}
                  >
                    {t(LABELS[idx]?.text)}
                  </p>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Comparison
