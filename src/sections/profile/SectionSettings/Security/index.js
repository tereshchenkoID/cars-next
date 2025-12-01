import { useState } from 'react'
import { useTranslations } from 'next-intl'

import Button from 'components/Button'
import Password from 'components/Password'
import Accordion from 'modules/Accordion'

import style from '../index.module.scss'

const Security = ({ filter, handlePropsChange, handleSave }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'unlock'}
      placeholder={t('change_password')}
    >
      <div className={style.form}>
        <div className={style.grid}>
          <Password
            placeholder={t('current_password')}
            data={filter.old}
            onChange={(value) => handlePropsChange('security.old', value)}
            isRequired={true}
            isLabel={true}
          />
          <Password
            placeholder={t('new_password')}
            data={filter.new}
            onChange={(value) => handlePropsChange('security.new', value)}
            isRequired={true}
            isLabel={true}
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

export default Security
