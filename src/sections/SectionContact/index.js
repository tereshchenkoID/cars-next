"use client"

import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import Icon from '@/components/Icon'
import Container from "@/components/Container"
import Reference from '@/components/Reference'

import style from './index.module.scss'

const SectionContact = () => {
  const t = useTranslations()

  return (
    <section className={style.block}>
      <Container classes={style.container}>
        <div className={style.info}>
          <div 
            className={style.top}
            style={{
              backgroundImage: 'url(/images/contact-bg.webp)'
            }}  
          >
            <h3 className={style.title}>{t('notification.contact')}...</h3>
            <Reference 
              link={NAVIGATION.buy.link}
              classes={['primary', 'md', style.button]}
              placeholder={t('offers')}
            />
          </div>
          <div className={style.bottom}>
            <div className={style.contact}>
              <div className={style.icon}>
                <Icon 
                  iconName={'phone'}
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p className={style.label}>{t('call_us')}</p>
                <Reference
                  classes={['reference']} 
                  link={'tel:+49 2131 2664 106'}
                  className={style.link}
                  placeholder={'+49 2131 2664 106'}
                />
                <p className={style.label}>Mo–Su 8 am-8 pm</p>
              </div>
            </div>
            <div className={style.contact}>
              <div className={style.icon}>
                <Icon 
                  iconName={'mail'}
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p className={style.label}>{t('email')}</p>
                <Reference
                  classes={['reference']} 
                  link={'mailto:de.verkauf@gmail.com'}
                  className={style.link}
                  placeholder={'de.verkauf@gmail.com'}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SectionContact