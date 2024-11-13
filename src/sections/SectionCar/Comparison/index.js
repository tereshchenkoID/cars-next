import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import { getFormatPrice } from '@/helpers/getFormatPrice'

import style from './index.module.scss'

const Scale = ({t, auth, min, max, data, idx}) => {
  const notEmpty = data > min && data <= max

  return (
    <div>
      {
        notEmpty &&
        <div
          style={{
            left: `${((data - min) / (max - min)) * 100}%`
          }}
          className={style.marker}
        >
          <div 
            className={
              classNames(
                style.value,
                idx > 3 && style.reverse
              )
            }
          >
            <p>{t('this_car')}</p>
            <h6>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data)}</h6>
          </div>
        </div>
      }
    </div>
  )
}

const Comparison = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)

  const options = [
    '56528',
    '67876',
    '71692',
    '77565',
    '81563',
    '98142',
  ]

  const value = 78000

  return (
    <div className={style.block}>
      <p className={style.title}>
        Compared with more than <strong>220 similar vehicles</strong> offered in recent months.
        We take in account <strong>up to 70 vehicle characteristics.</strong>
      </p>

      <div className={style.wrapper}>
        <div className={style.labels}>
          <div>{t('top_offer')}</div>
          <div>{t('very_good_price')}</div>
          <div>{t('fair_price')}</div>
          <div>{t('higher_price')}</div>
          <div>{t('high_price')}</div>
        </div>
        <div className={style.scale}>
          {
            options.map((el, idx) =>
              idx !== 0 &&
              <Scale
                key={idx}
                t={t}
                auth={auth}
                min={Number(options[idx === 0 ? 0 : idx - 1])}
                max={Number(el)}
                data={value}
                idx={idx}
              />
            )
          }
        </div>
        <div className={style.prices}>
          {
            options.slice(1, -1).map((el, idx) =>
              <div key={idx}>
                {getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, el)}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Comparison