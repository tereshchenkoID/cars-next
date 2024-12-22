import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { useModal } from '@/context/ModalContext'
import { useEffect, useState } from 'react'

import { postData } from '@/helpers/api'

import Image from 'next/image'
import Button from '@/components/Button'
import LoginModal from '@/modules/LoginModal'
import HistoryModal from '@/modules/HistoryModal'
import SavedCard from './SavedCard'

import style from './index.module.scss'

const Saved = ({ filtersProps, setActive }) => {
  const t = useTranslations()
  const auth = useSelector((state) => state.auth)
  const isAuth = auth?.id
  const { showModal } = useModal()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const handleHistory = (id, type, name, params) => {
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
                handleHistory={handleHistory}
              />
            ))
          :
            <>
              <Image
                width={327}
                height={262}
                className={style.decor}
                src={`/images/saved-filters.svg`}
                priority={true}
                alt={'Saved filters'}
              />
              <p className={style.text}>{t('notification.saved_filters')}</p>
              {
                !isAuth && 
                <Button
                  classes={['primary', 'wide']}
                  placeholder={t('login')}
                  onChange={() => showModal(<LoginModal />)}
                />
              }
            </>
      }
    </div>
  )
}

export default Saved
