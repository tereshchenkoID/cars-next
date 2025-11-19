import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useFilterState } from 'hooks/useFilterState'

import Checkbox from 'components/Checkbox'
import Accordion from 'modules/Accordion'
import Debug from 'modules/Debug'

import style from '../index.module.scss'

const INITIAL_FILTER = {
  notification: {
    favorite: '0',
    saved: '0'
  }
}

const Notification = () => {
  const t = useTranslations()

  const { filter, handlePropsChange } = useFilterState(INITIAL_FILTER)
  const [toggle, setToggle] = useState(false)

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'bell'}
      placeholder={t('notification_settings')}
    >
      <div className={style.form}>
        <Debug data={filter} />
        <div className={style.group}>
          <div>
            <h6>Favourite vehicles</h6>
            <p>Send notifications about discounts on favourite vehicles</p>
          </div>
          <Checkbox
            data={filter.notification.favorite}
            onChange={(value) => handlePropsChange('notification.favorite', value)}
          />
        </div>
        <div className={style.group}>
          <div>
            <h6>Saved searches</h6>
            <p>Send notifications of new offers based on saved search filters.</p>
          </div>
          <Checkbox
            data={filter.notification.saved}
            onChange={(value) => handlePropsChange('notification.saved', value)}
          />
        </div>
      </div>
    </Accordion>
  )
}

export default Notification
