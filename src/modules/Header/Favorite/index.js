import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { ROUTES_USER } from 'constant/config'

import { useFavouriteStore } from 'stores/favouriteStore'

import { useModal } from 'context/ModalContext'
import { useAuth } from 'hooks/useAuth'

import Button from 'components/Button'
import Reference from 'components/Reference'
import LoginModal from 'modules/Modals/LoginModal'

import style from './index.module.scss'

const Favorite = () => {
  const t = useTranslations()
  const { isAuth } = useAuth()
  const { showModal } = useModal()
  const { favourite, setFavourite } = useFavouriteStore()

  useEffect(() => {
    if (isAuth) setFavourite()
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
                favourite !== '0' &&
                <span className={style.count}>{favourite}</span>
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
