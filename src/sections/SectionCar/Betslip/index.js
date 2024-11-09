import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

import { getFormatPrice } from '@/helpers/getFormatPrice'

import Button from '@/components/Button'

import style from './index.module.scss'

const Betslip = ({ data }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)

  return (
    <div className={style.block}>
      <header className={style.header}>
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

      <footer className={style.footer}>
        <h6 className={style.prize}>
          <span>Total price</span>
          <span>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price)} </span>
        </h6>
        <p className={style.prize}>
          <span>Total price excluding VAT</span>
          <span>{getFormatPrice(auth?.account?.language?.code, auth?.account?.currency?.code, data?.price_data?.price_without_vat)} </span>
        </p>
      </footer>
    </div>
  )
}

export default Betslip
