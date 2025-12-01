import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslations } from 'next-intl'

import { useModal } from 'context/ModalContext'

import { postData } from 'helpers/api'
import { useAuth } from 'hooks/useAuth'

import { setToastify } from 'store/actions/toastifyAction'
import { setFavorite } from 'store/actions/favoriteAction'

import LoginModal from 'modules/Modals/LoginModal'

export const useFavourite = (initialValue, id, updateCallback = () => {}) => {
  const dispatch = useDispatch()
  const t = useTranslations()
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

        dispatch(
          setToastify({
            type: 'success',
            text: t(
              type === '1'
                ? 'notification.removed_favorites'
                : 'notification.added_favorites'
            ),
          })
        )

        dispatch(setFavorite(json.counts))
        updateCallback()
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json?.error_message || 'Error',
          })
        )
      }
    })
  }

  return {
    favorites,
    toggleFavorite,
  }
}
