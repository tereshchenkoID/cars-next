import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import { selectBrands, updateBrands } from '@/store/actions/brandsAction'

import Image from 'next/image'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Checkbox from '@/components/Checkbox'
import Brand from '../Brand'

import style from './index.module.scss'

const Modal = ({ show, setShow }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands)

  const mostBrands = useMemo(
    () => brands.filter(brand => brand.recent === "1"),
    [brands]
  )

  const activeBrand = useMemo(
    () => brands?.find(brand => brand.active) || null,
    [brands]
  )
  
  const activeModels = useMemo(
    () => activeBrand?.options?.find(model => model.selected === "1") || null,
    [activeBrand]
  )

  const handleChecked = (model) => {
    const newSelected = model.selected === "1" ? "0" : "1"
    dispatch(updateBrands(activeBrand.id, model.id, newSelected))
  }

  const handleSelectBrand = (id) => {
    dispatch(selectBrands(id))
  }

  const handleClose = () => {
    setShow(!show)
    handleSelectBrand(null)
  }

  return (
    <div className={style.block}>
      <div
        className={style.backdrop}
        onClick={handleClose}
      />
      <div className={style.content}>
        <div className={style.wrapper}>
          <Button
            icon={'xmark'}
            classes={['primary', 'square', style.close]}
            onClick={handleClose}
          />
          <div className={style.header}>
            <h6 className={style.title}>
              {
                activeBrand &&
                <>
                  <Button
                    icon={'angle-down'}
                    classes={['secondary', 'square', 'sm', style.arrow]}
                    onChange={() => handleSelectBrand(null)}
                  />
                  <Image
                    width={32}
                    height={32}
                    className={style.img}
                    src={`/images/brands/${activeBrand.id}.webp`}
                    priority={true}
                    alt={"Make"}
                  />
                </>
              }
              <span>{activeBrand ? activeBrand.name : t('select_make')}</span>
            </h6>
            <Field
              type={"text"}
              placeholder={t('make_or_model')}
              onChange={() => { }}
            />
          </div>
          <div className={style.body}>
            {
              activeBrand
                ?
                  <>
                    <ul className={style.models}>
                      {
                        activeBrand.options?.map((el, idx) =>
                          el.visible === "1" &&
                          <li
                            key={idx}
                            className={style.model}
                          >
                            <Checkbox
                              placeholder={el.name}
                              data={el.selected}
                              onChange={() => handleChecked(el)}
                            />
                          </li>
                        )
                      }
                    </ul>
                  </>
                :
                  <>
                    <p className={style.subtitle}>{t('most_searched_tags')}</p>
                    <ul className={style.grid}>
                      {
                        mostBrands.map((el, idx) =>
                          el.visible === "1" &&
                          <li
                            key={idx}
                            className={style.item}
                          >
                            <Brand 
                              data={el} 
                              onChange={handleSelectBrand}
                            />
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
                            <Brand 
                              data={el} 
                              isWide={true}
                              onChange={handleSelectBrand}
                            />
                          </li>
                        )
                      }
                    </ul>
                  </>
            }
          </div>
          <div className={style.footer}>
            {
              activeBrand &&
              <Button
                placeholder={t('select_model')}
                classes={['primary', 'wide']}
                isDisabled={!activeModels}
                onChange={() => handleSelectBrand(null)}
              />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
