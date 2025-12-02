import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useToastifyStore } from 'stores/toastifyStore'
import { useFavouriteStore } from 'stores/favouriteStore'

import { useModal } from 'context/ModalContext'
import { postData } from 'helpers/api'
import { useAuth } from 'hooks/useAuth'

import LoginModal from 'modules/Modals/LoginModal'

export const useFavourite = (initialValue, id, updateCallback = () => {}) => {
  const t = useTranslations()
  const showToast = useToastifyStore(state => state.showToast)
  const { setFavourite } = useFavouriteStore()

  const { isAuth } = useAuth()
  const { showModal } = useModal()

  const [favorites, setFavorites] = useState(initialValue)

  const toggleFavorite = (type) => {
    if (!isAuth) {
      showModal(<LoginModal />)
      return
    }

    const formData = new FormData()
    formData.append('id', id)
    formData.append('type', type)

    postData('user/favorites/action/', formData).then((json) => {
      if (json.code === '0') {
        setFavorites(type === '0' ? '1' : '0')
        showToast(
          'success',
          t(type === '1' ? 'notification.removed_favorites' : 'notification.added_favorites'
        ))
        setFavourite(json.counts)
        updateCallback()
      } else {
        showToast(
          'error',
          t(json?.error_message || t('notification.error'))
        )
      }
    })
  }

  return {
    favorites,
    toggleFavorite,
  }
}
