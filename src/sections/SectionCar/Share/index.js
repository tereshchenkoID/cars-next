import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  ViberShareButton,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  ViberIcon
} from 'react-share'

import Button from '@/components/Button'

import style from './index.module.scss'

const Share = ({ data }) => {
  const t = useTranslations()
  const meta = {
    url: window.location.href,
    title: data?.name,
    description: data?.description
  }
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
      ref={blockRef}
      className={style.block}
    >
      <Button
        ref={buttonRef}
        icon={'share'}
        classes={['reference', 'sm']}
        placeholder={(t('share'))}
        onChange={() => setShow(!show)}
      />
      {
        show &&
        <div className={style.dropdown}>
          <EmailShareButton
            url={meta.url}
            subject={meta.title}
            body={meta.description}
          >
            <EmailIcon size={32} borderRadius={8} />
          </EmailShareButton>

          <FacebookShareButton
            url={meta.url}
            quote={meta.title}
          >
            <FacebookIcon size={32} borderRadius={8} />
          </FacebookShareButton>

          <TelegramShareButton
            url={meta.url}
            title={meta.title}
          >
            <TelegramIcon size={32} borderRadius={8} />
          </TelegramShareButton>

          <ViberShareButton
            url={meta.url}
            title={meta.title}
          >
            <ViberIcon size={32} borderRadius={8} />
          </ViberShareButton>
        </div>
      }
    </div>
  )
}

export default Share