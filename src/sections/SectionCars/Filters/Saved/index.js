import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { useModal } from '@/context/ModalContext'
import { useEffect, useState } from 'react'

import { postData } from '@/helpers/api'

import LoginModal from '@/modules/LoginModal'
import HistoryModal from '@/modules/HistoryModal'
import SavedCard from './SavedCard'
import Empty from './Empty'

import style from './index.module.scss'

const Saved = ({ filtersProps, setActive }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const isAuth = auth?.id
  const { showModal } = useModal()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAction = (id, type, name, params) => {
    isAuth
    ?
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
    :
      showModal(
        <LoginModal />
      )
  }

  useEffect(() => {
    if(isAuth) {
      setLoading(true)
      const formData = new FormData()
      formData.append('userId', isAuth)

      postData('user/filters/', formData).then(json => {
        if (json) {
          setData(json)
          setLoading(false)
        } else {
          dispatch(
            setToastify({
              type: 'error',
              text: json.error_message,
            })
          )
        }
      })
    }
  }, [])

  if(loading)
    return

  return (
    <div className={style.block}>
      {
        data.length > 0
          ?
            data.map((el, idx) => (
              <SavedCard
                key={idx}
                data={el}
                setActive={setActive}
                filtersProps={filtersProps}
                handleAction={handleAction}
              />
            ))
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
