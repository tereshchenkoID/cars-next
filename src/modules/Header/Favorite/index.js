import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '@/context/ModalContext'

import { ROUTES_USER } from '@/constant/config'

import { setFavorite } from '@/store/actions/favoriteAction'

import Reference from '@/components/Reference'
import Button from '@/components/Button'
import LoginModal from '@/modules/LoginModal'

import style from './index.module.scss'

const Favorite = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const isAuth = auth?.id
  const favorite = useSelector((state) => state.favorite)
  const { showModal } = useModal()

  useEffect(() => {
    if(isAuth) {
      dispatch(setFavorite(null, auth.id))
    }
  }, [])

  return (
    <div className={style.block}>
      {
        isAuth
        ?
          <>
            <Reference
              link={ROUTES_USER.favorite.link}
              icon={ROUTES_USER.favorite.icon}
              classes={['secondary', 'square']}
              title={(t('favorites'))}
            />
            {
              (typeof favorite !== 'object' && favorite !== '0') && <span className={style.count}>{favorite}</span>
            }
          </>
        :
          <Button
            icon={ROUTES_USER.favorite.icon}
            classes={['secondary', 'square']}
            title={(t('favorites'))}
            onChange={() => showModal(<LoginModal />)}
          />
      }
    </div>
  )
}

export default Favorite
