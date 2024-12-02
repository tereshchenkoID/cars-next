import { useTranslations } from 'next-intl'
import { useModal } from '@/context/ModalContext'

import Image from 'next/image'
import HistoryModal from '@/modules/HistoryModal'
import SavedCard from './SavedCard'

import style from './index.module.scss'

const History = ({
  filtersProps,
  setActive
}) => {
  const t = useTranslations()
  const { showModal } = useModal()
  const {
    history
  } = filtersProps

  const handleSaveHistory = () => {
    showModal(<HistoryModal />, t('save_search'))
  }

  return (
    <div className={style.block}>
      {/* <pre className={style.pre}>{JSON.stringify(history, null, 2)}</pre> */}
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
