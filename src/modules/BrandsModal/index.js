import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import { ACTIVE, DEFAULT } from '@/constant/config'

import { selectBrands, updateBrands } from '@/store/actions/brandsAction'

import Image from 'next/image'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Checkbox from '@/components/Checkbox'
import Brand from './Brand'

import style from './index.module.scss'

const BrandsModal = ({ show, setShow }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands)
  const [query, setQuery] = useState('')

  const mostBrands = useMemo(
    () => brands.filter(brand => brand.recent === ACTIVE),
    [brands]
  )

  const activeBrand = useMemo(
    () => brands?.find(brand => brand.active) || null,
    [brands]
  )
  
  const activeModels = useMemo(
    () => activeBrand?.options?.find(model => model.selected === ACTIVE) || null,
    [activeBrand]
  )

  const searchBrands = useMemo(
    () => {
      if (query.length < 3) return []
    
      return (activeBrand ? activeBrand.options : brands).filter(brand =>
        brand.name.toString().toLowerCase().includes(query.toLowerCase())
      )
    }, 
    [query, brands]
  )

  const handleChecked = (model) => {
    dispatch(updateBrands(activeBrand.id, model.id, model.selected === ACTIVE ? DEFAULT : ACTIVE))
  }

  const handleSelectBrand = (id) => {
    dispatch(selectBrands(id))
    setQuery('')
  }

  const handleClose = () => {
    setShow(!show)
    setQuery('')
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
            onChange={handleClose}
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
                    alt={activeBrand.name}
                  />
                </>
              }
              <span>{activeBrand ? activeBrand.name : t('actions.select_make')}</span>
            </h6>
            <Field
              type={"text"}
              placeholder={t('make_or_model')}
              data={query}
              onChange={(value) => setQuery(value)}
            />
          </div>
          <div className={style.body}>
            {
              activeBrand
                ?
                  <ul className={style.models}>
                    {
                      query.length > 2 
                      ?
                        searchBrands.length > 0 
                          ?
                            searchBrands.map((el, idx) =>
                              el.visible === ACTIVE &&
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
                          :
                            <li className={style.item}>
                              {t('notification.not_found')}
                            </li>
                      :
                        activeBrand.options?.map((el, idx) =>
                          el.visible === ACTIVE &&
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
                :
                  <>
                    {
                      query.length > 2
                      ?
                        <>
                          <p className={style.subtitle}>{t('found_brands')}</p>
                          <ul className={style.list}>
                            {
                              searchBrands.length > 0
                                ?
                                  searchBrands.map((el, idx) =>
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
                                :
                                  <li className={style.item}>
                                    {t('notification.not_found')}
                                  </li>
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
                  </>
            }
          </div>
          <div className={style.footer}>
            {
              activeBrand
                ?
                  <Button
                    placeholder={t('actions.select_model')}
                    classes={['primary', 'wide']}
                    isDisabled={!activeModels}
                    onChange={() => handleSelectBrand(null)}
                  />
                :
                  <Button
                    placeholder={t('offers')}
                    classes={['primary', 'wide']}
                    isDisabled={true}
                    // onChange={() => handleSelectBrand(null)}
                  />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandsModal
