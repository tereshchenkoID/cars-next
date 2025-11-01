import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useOutsideClick } from 'hooks/useOutsideClick'

import classNames from 'classnames'

import { ROUTES_USER, NOTIFICATIONS_TYPE } from 'constant/config'

import { getDate } from 'helpers/getDate'

import Reference from 'components/Reference'
import Button from 'components/Button'

import style from './index.module.scss'

const DATA = [
  {
    type: '0',
    text: 'CarAudit is an important part of this service. The first car I wanted to buy had a major defect discovered that I would not have found during the inspection myself',
    date: '1714521600000',
  },
  {
    type: '1',
    text: 'CarAudit is an important part of this service. The first car I wanted to buy had a major defect discovered that I would not have found during the inspection myself',
    date: '1714521600000',
  },
  {
    type: '2',
    text: 'CarAudit is an important part of this service. The first car I wanted to buy had a major defect discovered that I would not have found during the inspection myself',
    date: '1714521600000',
  },
  {
    type: '3',
    text: 'CarAudit is an important part of this service. The first car I wanted to buy had a major defect discovered that I would not have found during the inspection myself',
    date: '1714521600000',
  }
]

const Notifications = () => {
  const t = useTranslations()
  const [show, setShow] = useState(false)
  const blockRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(
    blockRef,
    () => setShow(false),
    { buttonRef }
  )

  return (
    <div 
      className={style.block}
      ref={blockRef}
    >
      <div 
        className={style.toggle}
        ref={buttonRef}
        onClick={() => setShow(!show)}
      >
        <Button
          icon={ROUTES_USER.notification.icon}
          classes={['secondary', 'square']}
          title={(t(ROUTES_USER.notification.text))}
        />
        <span className={style.count}>12</span>
      </div>
      {
        show &&
        <div className={style.dropdown}>
          <div className={style.header}>
            <p><strong>33</strong> new messages:</p>
            <Button
              classes={['reference', 'sm']}
              placeholder={'Makes as read'}
            />
          </div>
          <ul className={style.body}>
            {
              DATA.map((el, idx) =>
                <li 
                  key={idx}
                  className={
                    classNames(
                      style.item,
                      style[NOTIFICATIONS_TYPE[el.type]]
                    )
                  }
                >
                  <p className={style.text}>{el.text}</p>
                  <p className={style.date}>{getDate(el.date, 3)}</p>
                </li> 
              )
            }
          </ul>
          <div className={style.footer}>
            <Reference
              link={ROUTES_USER.notification.link}
              icon={ROUTES_USER.notification.icon}
              classes={['secondary', 'wide', 'sm']}
              placeholder={(t('actions.see_all'))}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default Notifications
