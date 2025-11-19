import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'context/ModalContext'

import { ROUTES_USER } from 'constant/config'

import { useAuth } from 'hooks/useAuth'
import { setFavorite } from 'store/actions/favoriteAction'

import Button from 'components/Button'
import Reference from 'components/Reference'
import LoginModal from 'modules/Modals/LoginModal'

import style from './index.module.scss'

const Favorite = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { isAuth } = useAuth()
  const { showModal } = useModal()
  const favorite = useSelector((state) => state.favorite)

  useEffect(() => {
    if (isAuth) dispatch(setFavorite(null))
  }, [isAuth])

  return (
    <div className={style.block}>
      {
        isAuth
          ?
            <>
              <Reference
                link={ROUTES_USER.favorites.link}
                icon={ROUTES_USER.favorites.icon}
                classes={['secondary', 'md', 'square']}
                title={(t('favorites'))}
              />
              {
                (typeof favorite !== 'object' && favorite !== '0') && <span className={style.count}>{favorite}</span>
              }
            </>
          :
            <Button
              icon={ROUTES_USER.favorites.icon}
              classes={['secondary', 'md', 'square']}
              title={(t('favorites'))}
              onChange={() => showModal(<LoginModal />)}
            />
      }
    </div>
  )
}

export default Favorite
