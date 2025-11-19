import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'

import { useAuth } from 'hooks/useAuth'
import { useModal } from 'context/ModalContext'
import { setFavorite } from 'store/actions/favoriteAction'

import Button from 'components/Button'
import LoginModal from 'modules/Modals/LoginModal'

const Favorites = ({ data }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { isAuth } = useAuth()
  const { showModal } = useModal()

  const handleClick = () => {
    if (isAuth) {
      dispatch(setFavorite(null))
    }
    else {
      showModal(<LoginModal />)
    }
  }

  return (
    <Button
      icon={data.is_favorite === '0' ? 'heart' : 'heart-filled'}
      classes={['reference', 'sm']}
      placeholder={(t('favorites'))}
      onChange={handleClick}
    />
  )
}

export default Favorites
