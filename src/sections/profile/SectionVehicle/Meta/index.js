import { useTranslations } from 'next-intl'

import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import Accordion from '@/modules/Accordion'

import style from '../index.module.scss'

const Meta = ({
  data,
  toggle,
  handleToggle,
  handleChange
}) => {
  const t = useTranslations()

  return (
    <Accordion
      data={toggle[5]}
      action={() => handleToggle(5)}
      icon={'settings'}
      placeholder={t('meta')}
    >
      <div className={style.grid}>
        <div className={style.wrapper}>
          <p>About this block</p>
        </div>
        {
          Object.entries(data.meta.stats).map(([key, _]) =>
            <Checkbox
              key={key}
              placeholder={t(key)}
              data={data.meta.stats[key].visible}
              onChange={(value) => handleChange(`meta.stats.${key}.visible`, value)}
            />
          )
        }
        <div className={style.footer}>
          <Button
            classes={['primary', style.button]}
            placeholder={t('actions.save')}
          />
        </div>
      </div>
    </Accordion>
  )
}

export default Meta