import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import { getFormatPrice } from '@/helpers/getFormatPrice'

import style from './index.module.scss'

const Scale = ({min, max, data, idx}) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const isWithinRange = useMemo(() => data > min && data <= max, [data, min, max])

  return (
    <div className={style.block}>
      {
        isWithinRange &&
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

export default Scale