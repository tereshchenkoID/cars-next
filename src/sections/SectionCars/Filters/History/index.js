import { useTranslations } from 'next-intl'
import { useModal } from '@/context/ModalContext'
import { useSelector } from 'react-redux'

import Image from 'next/image'
import HistoryModal from '@/modules/HistoryModal'
import LoginModal from '@/modules/LoginModal'
import SavedCard from './SavedCard'

import style from './index.module.scss'

const History = ({ filtersProps, setActive }) => {
  const t = useTranslations()
  const { showModal } = useModal()
  const { history } = filtersProps
  const auth = useSelector((state) => state.auth)

  const handleSaveHistory = (type, data) => {
    auth.id 
    ?
      showModal(
        <HistoryModal
          type={type}
          data={data}
        />, 
        t('save_search')
      )
    :
      showModal(
        <LoginModal />
      )
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
                filtersProps={filtersProps}
                handleSaveHistory={handleSaveHistory}
              />
            ))
          :
            <Image
              width={327}
              height={262}
              className={style.decor}
              src={`/images/previous-filters.svg`}
              priority={true}
              alt={'Saved filters'}
            />
      }
    </div>
  )
}

export default History
