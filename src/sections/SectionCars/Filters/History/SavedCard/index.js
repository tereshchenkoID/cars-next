import { useTranslations } from 'next-intl'
import { useRouter} from 'next/navigation'
import { Fragment } from 'react'

import { useBrandsStore } from 'stores/brandsStore'
import { useSearchStore } from 'stores/searchStore'
import { getDate } from 'helpers/getDate'

import Button from 'components/Button'

import style from './index.module.scss'

const SavedCard = ({
  data,
  setActive,
  setShow,
  filtersProps,
  handleSaveHistory
}) => {
  const t = useTranslations()
  const router = useRouter()
  const { setBrands } = useBrandsStore()
  const { setSearch } = useSearchStore()

  const {
    handleLoad,
    generateSearchFromFilters,
    filters,
    brands,
  } = filtersProps

  const handleChecked = () => {
    const queryParams = new URLSearchParams(data.params)
    router.replace(`?${queryParams.toString()}`, { scroll: false })
    // window.history.pushState(null, '', `?${queryParams.toString()}`)

    const { date, makes } = generateSearchFromFilters(filters, queryParams)
    setBrands(makes)
    setSearch(date)
    handleLoad(0, date)
    setActive(0)
    setShow(false)
  }

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
    >
      <div className={style.head}>
        <h6 className={style.title}>
          {getDate(data.name)}
        </h6>
        <Button
          classes={['secondary', 'sm', 'square']}
          icon={'bookmark-plus'}
          onChange={(e) => {
            e.stopPropagation()
            handleSaveHistory('0', data)
          }}
        />
      </div>
      <ul className={style.tags}>
        {
          Object.entries(data.params).map(([key, value]) =>
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
        )}
      </ul>
      <Button
        classes={['primary', 'sm', 'wide']}
        placeholder={`${t(`results`)} ${data.results}`}
      />
    </div>
  )
}

export default SavedCard
