import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import { getFormatPrice } from '@/helpers/getFormatPrice'

import style from './index.module.scss'

const Scale = ({min, max, data, idx, period}) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const value = useMemo(() => {
    if (data < min) return 0
    if (data > max) return 100
    return ((data - min) / (max - min)) * 100
  }, [data, min, max])

  return (
    <div className={style.block}>
      {
        period === idx &&
        <div
          style={{
            left: `${value}%`
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

export default Scale