import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import Image from 'next/image'
import Button from '@/components/Button'
import Field from '@/components/Field'

import style from './index.module.scss'

const Modal = ({ show, setShow }) => {
  const t = useTranslations()
  const brands = useSelector((state) => state.brands)
  const [active, setActive] = useState(null)

  const mostBrands = useMemo(
    () => brands.filter(brand => brand.recent === "1"),
    [brands]
  )

  const activeBrands = useMemo(() => {
    return brands.find(brand => brand.id === active)
  }, [active, brands]) 

  return (
    <div className={style.block}>
      <div 
        className={style.backdrop} 
        onClick={() => setShow(!show)}
      />
      <div className={style.content}>
        <div className={style.wrapper}>
          <Button
            icon={'xmark'}
            classes={['primary', 'square', style.close]}
            onChange={() => setShow(!show)}
          />
          <div className={style.header}>
            <h6 className={style.title}>
              {
                active &&
                <>
                  <Button 
                    icon={'angle-down'}
                    classes={['secondary', 'square', 'sm', style.arrow]}
                    onChange={() => setActive(null)}
                  />
                  <Image
                    width={32}
                    height={32}
                    className={style.img}
                    src={`/images/brands/${activeBrands.id}.webp`}
                    priority={true}
                    alt={"Make"}
                  />
                </>
              }
              <span>{active ? activeBrands.name : t('select_make')}</span>
            </h6>
            <Field 
              type={"text"}
              placeholder={t('make_or_model')}
              onChange={() => {}}
            />
          </div>
          <div className={style.body}>
            <p className={style.subtitle}>{t('most_searched_tags')}</p>
            <ul className={style.grid}>
              {
                mostBrands.map((el, idx) => 
                  el.visible === "1" &&
                  <li 
                    key={idx}
                    className={style.item}
                  >
                    <button
                      type="button"
                      className={
                        classNames(
                          style.button,
                          style.square,
                          active === el.id && style.active
                        )
                      }
                      aria-label={el.name}
                      onClick={() => setActive(el.id)}
                    >
                      <Image
                        width={32}
                        height={32}
                        className={style.img}
                        src={`/images/brands/${el.id}.webp`}
                        priority={true}
                        alt={el.name}
                      />
                    </button>
                  </li>
                )
              }
            </ul>
            <p className={style.subtitle}>{t('all_brands')}</p>
            <ul className={style.list}>
              {
                brands.map((el, idx) => 
                  el.visible === "1" &&
                  <li 
                    key={idx}
                    className={style.item}
                  >
                    <button
                      type="button"
                      className={
                        classNames(
                          style.button,
                          active === el.id && style.active
                        )
                      }
                      aria-label={el.name}
                      onClick={() => setActive(el.id)}
                    >
                      <Image
                        width={32}
                        height={32}
                        className={style.img}
                        src={`/images/brands/${el.id}.webp`}
                        priority={true}
                        alt={el.name}
                      />
                      <span>{el.name}</span>
                    </button>
                  </li>
                )
              }
            </ul>
          </div>
          {/* <div className={style.footer}>
            <Button 
              placeholder={`138 ${t('offers')}`}
              classes={['primary', 'wide']}
            />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Modal
