import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useToastifyStore } from 'stores/toastifyStore'

import { useModal } from 'context/ModalContext'
import { useAuth } from 'hooks/useAuth'
import { postData } from 'helpers/api'

import LoginModal from 'modules/Modals/LoginModal'
import HistoryModal from 'modules/Modals/HistoryModal'
import SavedCard from './SavedCard'
import Empty from './Empty'

import style from './index.module.scss'

const Saved = ({
  filtersProps,
  setActive,
  setShow
}) => {
  const t = useTranslations()
  const showToast = useToastifyStore(state => state.showToast)
  const { isAuth } = useAuth()
  const { showModal } = useModal()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAction = (id, type, name, params) => {
    if (isAuth) {
      showModal(
        <HistoryModal
          id={id}
          name={name}
          type={type}
          data={params}
          setData={setData}
        />,
        t('save_search')
      )
    }
    else {
      showModal(
        <LoginModal />
      )
    }

    setShow(false)
  }

  useEffect(() => {
    if(isAuth) {
      setLoading(true)
      const formData = new FormData()

      postData('user/filters/', formData).then(json => {
        if (json) {
          setData(json)
          setLoading(false)
        }
        else {
          showToast(
            'error',
            json.error_message,
          )
        }
      })
    }
  }, [isAuth])

  if (loading) return

  return (
    <div className={style.block}>
      {
        data.length > 0
          ?
            data.map((el, idx) =>
              <SavedCard
                key={idx}
                data={el}
                setActive={setActive}
                setShow={setShow}
                filtersProps={filtersProps}
                handleAction={handleAction}
              />
            )
          :
            <Empty
              isAuth={isAuth}
              handleAction={handleAction}
            />
      }
    </div>
  )
}

export default Saved
