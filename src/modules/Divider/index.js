import { useTranslations } from 'next-intl'

import style from './index.module.scss'

const Divider = ({ data }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>{t(data)}</div>
  )
}

export default Divider
