import { useState } from 'react'
import { useTranslations } from 'next-intl'

import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Accordion from 'modules/Accordion'

import style from '../index.module.scss'

const Notification = ({ filter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'bell'}
      placeholder={t('notification_settings')}
    >
      <div className={style.form}>
        <div className={style.group}>
          <div>
            <h6>Favourite vehicles</h6>
            <p>Send notifications about discounts on favourite vehicles</p>
          </div>
          <Checkbox
            data={filter.favorite}
            onChange={(value) => handlePropsChange('notification.favorite', value)}
          />
        </div>
        <div className={style.group}>
          <div>
            <h6>Saved searches</h6>
            <p>Send notifications of new offers based on saved search filters.</p>
          </div>
          <Checkbox
            data={filter.saved}
            onChange={(value) => handlePropsChange('notification.saved', value)}
          />
        </div>
        <div className={style.footer}>
          <Button
            classes={['primary', 'md']}
            placeholder={t('actions.save')}
          />
        </div>
      </div>
    </Accordion>
  )
}

export default Notification
