import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { getFormatPrice } from '@/helpers/getFormatPrice'

import Discount from '@/modules/Discount'
import Button from '@/components/Button'

import style from './index.module.scss'

const Betslip = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)

  return (
    <div className={style.block}>
      <header className={style.header}>
        {
          data?.price_data?.price_start &&
          <div className={style.discount}>
            <Discount 
              size={'lg'} 
              amount={getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data.price_data.discount)}
            />
            <p className={style.old}>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data.price_data.price_start)}</p>
          </div>
        }
        <h6 className={style.prize}>
          <span>Car price</span>
          <span>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price)} </span>
        </h6>
        <p className={style.prize}>
          <span>Total price excluding VAT</span>
          <span>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price_without_vat)} </span>
        </p>
      </header>

      <div className={style.body}>
        <Button
          icon={'order'}
          placeholder={t('buy')}
          classes={['primary', 'wide']}
        />
      </div>

      {/* <footer className={style.footer}>
        <h6 className={style.prize}>
          <span>Total price</span>
          <span>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price)} </span>
        </h6>
        <p className={style.prize}>
          <span>Total price excluding VAT</span>
          <span>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price_without_vat)} </span>
        </p>
      </footer> */}
    </div>
  )
}

export default Betslip
