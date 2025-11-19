import { useState } from 'react'
import { useTranslations } from 'next-intl'

import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Accordion from 'modules/Accordion'

import style from '../index.module.scss'

const Meta = ({ filter, handlePropsChange }) => {
  const t = useTranslations()
  const [toggle, setToggle] = useState(false)

  return (
    <Accordion
      data={toggle}
      action={() => setToggle(!toggle)}
      icon={'settings'}
      placeholder={t('meta')}
    >
      <div className={style.grid}>
        {
          Object.entries(filter).map(([key, _]) =>
            <Checkbox
              key={key}
              placeholder={`${t(key)} (${filter[key].value})`}
              data={filter[key].visible}
              onChange={(value) => handlePropsChange(`stats.${key}.visible`, value)}
            />
          )
        }
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

export default Meta
