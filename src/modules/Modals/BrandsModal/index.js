import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

import { ACTIVE, DEFAULT } from 'constant/config'
import { useBrandsStore } from 'stores/brandsStore'

import Image from 'next/image'
import Button from 'components/Button'
import Field from 'components/Field'
import Checkbox from 'components/Checkbox'
import Backdrop from 'modules/Modals/Backdrop'
import Brand from './Brand'

import style from './index.module.scss'

const BrandsModal = ({ show, setShow }) => {
  const t = useTranslations()
  const { brands, selectBrands, updateBrands } = useBrandsStore()
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
    updateBrands(activeBrand.id, model.id, model.selected === ACTIVE ? DEFAULT : ACTIVE)
  }

  const handleSelectBrand = (id) => {
    console.log(id)
    selectBrands(id)
    setQuery('')
  }

  const handleClose = () => {
    setShow(!show)
    setQuery('')
    handleSelectBrand(null)
  }

  return (
    <div className={style.block}>
      <Backdrop
        data={true}
        onChange={() => handleClose()}
        size={'lg'}
      />
      <div className={style.wrapper}>
        <div className={style.header}>
          <h6 className={style.title}>
            {
              activeBrand &&
              <>
                <Button
                  icon={'angle-left'}
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
            <Button
              icon={'xmark'}
              classes={['secondary', 'square', 'sm', style.close]}
              onChange={handleClose}
            />
          </h6>
          <Field
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
                                  el.visible === ACTIVE &&
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
                                el.visible === ACTIVE &&
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
                                el.visible === ACTIVE &&
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
                  classes={['primary', 'md', 'wide']}
                  isDisabled={!activeModels}
                  onChange={() => handleSelectBrand(null)}
                />
              :
                <Button
                  placeholder={t('offers')}
                  classes={['primary', 'md', 'wide']}
                  isDisabled={true}
                  // onChange={() => handleSelectBrand(null)}
                />
          }
        </div>
      </div>
    </div>
  )
}

export default BrandsModal
