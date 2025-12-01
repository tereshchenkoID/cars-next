import { useTranslations } from 'next-intl'

import { useAuth } from 'hooks/useAuth'
import { useModal } from 'context/ModalContext'

import Image from 'next/image'
import HistoryModal from 'modules/Modals/HistoryModal'
import LoginModal from 'modules/Modals/LoginModal'
import SavedCard from './SavedCard'

import style from './index.module.scss'

const History = ({ filtersProps, setActive, setShow }) => {
  const t = useTranslations()
  const { showModal } = useModal()
  const { isAuth } = useAuth()
  const { history } = filtersProps

  const handleSaveHistory = (type, data) => {
    if(isAuth) {
      showModal(
        <HistoryModal
          type={type}
          data={data}
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

  return (
    <div className={style.block}>
      {
        history.length > 0
          ?
            history.map((el, idx) => (
              <SavedCard
                key={idx}
                data={el}
                setActive={setActive}
                setShow={setShow}
                filtersProps={filtersProps}
                handleSaveHistory={handleSaveHistory}
              />
            ))
          :
            <>
              <Image
                width={327}
                height={262}
                src={`/images/previous-filters.svg`}
                priority={true}
                alt={t('actions.save')}
              />
              <p className={style.text}>{t('notification.not_found_history')}</p>
            </>
      }
    </div>
  )
}

export default History
