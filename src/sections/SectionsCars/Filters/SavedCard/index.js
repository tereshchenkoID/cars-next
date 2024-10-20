import { useTranslations } from 'next-intl'

import Button from '@/components/Button'

import style from './index.module.scss'

const SavedCard = ({ data, isExists }) => {
  const t = useTranslations()

  const handleChecked = () => {
    alert("Checked")
  }

  const handleSave = () => {
    alert("Save")
  }

  const handleRemove = () => {
    alert("Remove")
  }

  return (
    <div 
      className={style.block}
      onClick={() => handleChecked()}
    >
      <div className={style.head}>
        <h6 className={style.title}>Name</h6>
        {
          isExists 
          ?
            <Button
              classes={['secondary', 'sm', 'square']}
              icon={'trash'}
              onChange={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
            />
          :
            <Button
              classes={['secondary', 'sm', 'square']}
              icon={'bookmark-plus'}
              onChange={(e) => {
                e.stopPropagation()
                handleSave()
              }}
            />
        }
      </div>
      <ul className={style.tags}>
        <li className={style.tag}>Parking assist system self-steering</li>
        <li className={style.tag}>Keyless entry</li>
        <li className={style.tag}>Heated steering wheel</li>
        <li className={style.tag}>Apple CarPlay</li>
      </ul>
      <Button
        classes={['primary', 'sm', 'wide']}
        placeholder={t('results')}
        onClick={(e) => {
          e.stopPropagation()
          handleChecked()
        }}
      />
    </div>
  )
}

export default SavedCard
