import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/Container'
import Social from '@/modules/Social'
import Logo from '@/components/Logo'

import style from './index.module.scss'

const PAYMENTS = [
  'visa',
  'visa-electron',
  'mastercard',
  'maestro',
  'diners-club',
  'discover',
]

const MENU = [
  {
    title: 'menu',
    submenu: [
      NAVIGATION.buy,
      NAVIGATION.new_auto,
      NAVIGATION.about_us,
      NAVIGATION.sitemap
    ]
  },
  {
    title: 'services',
    submenu: []
  },
  {
    title: 'company',
    submenu: [
      NAVIGATION.about_us,
      NAVIGATION.how_it_works,
      NAVIGATION.reviews,
    ]
  }
]

const Footer = () => {
  const t = useTranslations()

  return (
    <footer className={style.block}>
      <Container>
        <div className={style.top}>
          <div className={style.column}>
            <Logo />
            <p className={style.text}>Carvago 2024 • All rights reserved</p>
            <Social />
          </div>
          <div className={style.column}>
            {
              MENU.map((el, idx) =>
                <ul
                  key={idx}
                  className={style.submenu}
                >
                  <li className={style.item}>
                    <h6>{t(el.title)}</h6>
                  </li>
                  {
                    el.submenu.map((sublink, index) =>
                      <li
                        className={style.item}
                        key={index}
                      >
                        <Link
                          href={sublink.link}
                          rel="noreferrer"
                          className={style.link}
                        >
                          {t(sublink.text)}
                        </Link>
                      </li>
                    )
                  }
                </ul>
              )
            }
          </div>
        </div>
        <div className={style.bottom}>
          <p className={style.transfer}>{t('notification.payement')}</p>
          <div className={style.payments}>
            {
              PAYMENTS.map((el, idx) =>
                <Image
                  key={idx}
                  width={43}
                  height={28}
                  className={style.payment}
                  src={`/images/payements/${el}.svg`}
                  priority={false}
                  alt={el}
                />
              )
            }
          </div>
        </div>
      </Container>
      <Container>
        <p className={style.copyright}>This is a commercial communication of the company Carvago s.r.o. It is not a draft agreement or contract within the meaning of § 1731 of Act No. 89/2012 Coll. of the Commercial Code. The lender is Santander Consumer Bank, Santander-Platz 1, 410 61 Mönchengladbach. ¹Representative example of low rate financing: Net loan amount €20,000; down payment €10,000; contract term 60 months; annual percentage rate of charge 7.99%, fixed borrowing rate 7.71% p.a.; 60 monthly instalments of €99 each; final instalment €8,368.41; total amount €14,160.00. The above information also represents the representative calculation example pursuant to § 6a para. 4 PAngV. Please note that we will make a creditworthiness enquiry. All prices include VAT. ²Net loan amount 20,000 €; contract term 60 months; annual percentage rate of charge 7.99%, fixed borrowing rate 7.71% p.a.; 60 monthly instalments of 212.00 € each; total amount 12,690.36 €. The above information also represents the representative calculation example pursuant to § 6a para. 4 PAngV. Please note that we will make a creditworthiness enquiry. All prices include VAT.        </p>
      </Container>
    </footer>
  )
}

export default Footer
