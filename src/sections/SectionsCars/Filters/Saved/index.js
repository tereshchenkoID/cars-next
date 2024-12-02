import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { useModal } from '@/context/ModalContext'

import Image from 'next/image'
import Button from '@/components/Button'
import HistoryModal from '@/modules/HistoryModal'
import DeleteHistoryModal from '@/modules/DeleteHistoryModal'
import LoginModal from '@/modules/LoginModal'
import SavedCard from './SavedCard'

import style from './index.module.scss'

const Saved = ({
  filtersProps,
  setActive
}) => {
  const t = useTranslations()
  const {
    history
  } = filtersProps

  const auth = useSelector((state) => state.auth)
  const isAuth = auth?.id
  const { showModal } = useModal()

  const handleSaveHistory = () => {
    showModal(<HistoryModal />, t('save_search'))
  }

  const handleDeleteHistory = () => {
    showModal(<DeleteHistoryModal />, t('delete_search'))
  }

  return (
    <div className={style.block}>
      {
        !isAuth
          ?
            history.map((el, idx) => (
              <SavedCard
                key={idx}
                data={el}
                setActive={setActive}
                filtersProps={filtersProps}
                handleSaveHistory={handleSaveHistory}
                handleDeleteHistory={handleDeleteHistory}
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
              <Button
                classes={['primary', 'wide']}
                placeholder={t('login')}
                onChange={() => showModal(<LoginModal />)}
              />
            </>
      }
    </div>
  )
}

export default Saved
