import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { useModal } from 'context/ModalContext'

import { useAuth } from 'hooks/useAuth'
import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'
// import { apiFetch } from 'utils/apiFetch'

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
  const dispatch = useDispatch()
  const { isAuth } = useAuth()
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

    setShow(false)
  }

  // async function loadData() {
  //   setLoading(true)
  //
  //   const json = await apiFetch('user/filters/', {
  //     method: 'POST',
  //   })
  //
  //   if (json) {
  //     setData(json)
  //     setLoading(false)
  //   } else {
  //     dispatch(
  //       setToastify({
  //         type: 'error',
  //         text: 'Не удалось получить данные фильтров',
  //       }),
  //     )
  //   }
  // }

  useEffect(() => {
    if(isAuth) {
      // loadData()

      setLoading(true)
      const formData = new FormData()

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
                setShow={setShow}
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
