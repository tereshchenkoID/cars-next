// import { useAuth } from '@/context/AuthContext'
import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

import Reference from '@/components/Reference'

import style from './index.module.scss'

const Favorite = () => {
  // const { isAuth } = useAuth()
  const t = useTranslations()

  return (
    <div className={style.block}>
      <Reference
        link={ROUTES_USER.favorite.link}
        icon={ROUTES_USER.favorite.icon}
        classes={['secondary', 'square']}
        title={(t('favorites'))}
      />
      {/* {
        isAuth && <span className={style.count}>1</span>
      } */}
    </div>
  )
}

export default Favorite
