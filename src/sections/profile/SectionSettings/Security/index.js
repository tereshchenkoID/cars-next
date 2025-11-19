import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useFilterState } from 'hooks/useFilterState'

import Button from 'components/Button'
import Password from 'components/Password'
import Accordion from 'modules/Accordion'
import Debug from 'modules/Debug'

import style from '../index.module.scss'

const INITIAL_FILTER = {
  security: {
    old: "",
    new: ""
  }
}

const Security = () => {
  const t = useTranslations()

  const { filter, handlePropsChange } = useFilterState(INITIAL_FILTER)
  const [toggle, setToggle] = useState(false)

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'unlock'}
      placeholder={t('change_password')}
    >
      <form className={style.form}>
        <Debug data={filter} />
        <div className={style.grid}>
          <Password
            placeholder={t('current_password')}
            data={filter.security.old}
            onChange={(value) => handlePropsChange('security.old', value)}
            isRequired={true}
            isLabel={true}
          />
          <Password
            placeholder={t('new_password')}
            data={filter.security.new}
            onChange={(value) => handlePropsChange('security.new', value)}
            isRequired={true}
            isLabel={true}
          />
        </div>
        <div className={style.footer}>
          <Button
            type={'submit'}
            classes={['primary', 'md']}
            placeholder={t('actions.save')}
          />
        </div>
      </form>
    </Accordion>
  )
}

export default Security
