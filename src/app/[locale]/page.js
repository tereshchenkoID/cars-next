import { useTranslations } from 'next-intl'

import style from "./index.module.scss"

const Home = () => {
  const t = useTranslations()

  return (
    <div className={style.block}>{t('menu')}</div>
  )
}

export default Home 