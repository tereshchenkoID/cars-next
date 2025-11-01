import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { getFormatPrice } from 'helpers/getFormatPrice'

import Button from 'components/Button'
import Discount from 'modules/Discount'
import Top from 'modules/Top'

import style from './index.module.scss'

const Betslip = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)

  return (
    <div className={style.block}>
      <header className={style.header}>
        {
          data?.meta?.top &&
          <Top 
            size={'lg'} 
            count={data.meta.top.level} 
          />
        }
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
        {
          data?.price_data?.price_without_vat &&
          <p className={style.prize}>
            <span>Total price excluding VAT</span>
            <span>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price_without_vat)} </span>
          </p>
        }
      </header>

      <div className={style.body}>
        <Button
          icon={'order'}
          placeholder={t('buy')}
          classes={['primary', 'wide']}
        />
      </div>
    </div>
  )
}

export default Betslip
