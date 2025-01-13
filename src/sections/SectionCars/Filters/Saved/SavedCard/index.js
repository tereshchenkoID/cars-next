import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { Fragment, useState, useRef } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import { setBrands } from '@/store/actions/brandsAction'
import { setSearch } from '@/store/actions/searchAction'

import Button from '@/components/Button'

import style from './index.module.scss'

const SavedCard = ({ 
  data, 
  setActive,
  handleAction,
  filtersProps, 
}) => {
  const t = useTranslations()
  const dispatch = useDispatch()

  const {
    handleLoad,
    generateSearchFromFilters,
    filters,
    brands,
  } = filtersProps

  const blockRef = useRef(null)
  const buttonRef = useRef(null)
  const [show, setShow] = useState(false)

  const handleChecked = () => {
    const queryParams = new URLSearchParams(data.params)
    window.history.pushState(null, '', `?${queryParams.toString()}`)

    const { date, makes } = generateSearchFromFilters(filters, queryParams)
    dispatch(setBrands(makes))
    dispatch(setSearch(date))
    handleLoad(0, date)
    setActive(0)
  }

  useOutsideClick(blockRef, () => setShow(false), { buttonRef })

  const getMakesModel = (key, value) => {
    const id = key.replace('make_', '')
    const models = value.split(',')
    const brand = brands.find((b) => b.id === id)
  
    if (!brand) return []
  
    const modelNames = models
      .map((id) => brand.options.find((option) => option.id === id)?.name)
      .filter(Boolean)
  
    return [brand.name, ...modelNames]
  }

  return (
    <div
      className={style.block}
      onClick={() => handleChecked()}
      ref={blockRef}
    >
      <div className={style.head}>
        <h6 className={style.title}>
          {data.name}
        </h6>
        <Button
          ref={buttonRef}
          classes={['secondary', 'sm', 'square']}
          icon={'dots'}
          onChange={(e) => {
            e.stopPropagation()
            setShow(!show)
          }}
        />
        {
          show &&
          <div className={style.options}>
            <Button
              icon={'edit'}
              classes={['secondary', 'left', 'wide', 'sm']}
              placeholder={'Rename'}
              onChange={(e) => {
                e.stopPropagation()
                handleAction(data.id, '1', data.name, data)
              }}
            />
            <Button
              icon={'trash'}
              classes={['secondary', 'left', 'wide', 'sm']}
              placeholder={'Delete'}
              onChange={(e) => {
                e.stopPropagation()
                handleAction(data.id, '2', data.name, null)
              }}
            />
          </div>
        }
      </div>
      {
        data.params &&
        <ul className={style.tags}>
          {Object.entries(data.params).map(([key, value]) => (
            <Fragment key={key}>
              {
                key.indexOf('make') !== -1 
                ? 
                  <li className={style.tag}>
                    {
                      getMakesModel(key, value).map((el, idx) =>
                        <Fragment key={idx}>
                          {el}
                          {idx === 0 
                            ? <>: </>
                            :
                              idx !== (getMakesModel(key, value).length - 1) &&  <>, </>
                          }
                        </Fragment>
                      )
                    }
                  </li>
                :  
                  (key.indexOf('_to') !== -1 || key.indexOf('_from') !== -1) 
                  ?
                    <li className={style.tag}>
                      {t(`filters.${key.split('_')[0]}.0`)} {t(key.split('_')[1])}: {value}
                    </li>
                  :
                    (key === 'vat_reclaimable' || key === 'discount') 
                    ?
                      <li className={style.tag}>{t(`filters.${key}.0`)}</li>
                    :
                      (key === 'page')
                      ?
                        <li className={style.tag}>
                          {t(`filters.page.0`)} {value}
                        </li>
                      :
                        value.split(';').map((el, idx) =>
                          <li
                            key={idx}
                            className={style.tag}
                          >
                            {t(`filters.${key}.${el}`)}
                          </li>
                        )
              }
            </Fragment>
          ))}
        </ul>
      }
      <Button
        classes={['primary', 'sm', 'wide']}
        placeholder={`${t(`results`)} ${data.counts}`}
      />
    </div>
  )
}

export default SavedCard
