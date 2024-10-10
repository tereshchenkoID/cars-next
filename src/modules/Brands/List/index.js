import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import { selectBrands, deleteBrands } from '@/store/actions/brandsAction'

import Image from 'next/image'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const List = ({ show, setShow }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const brands = useSelector((state) => state.brands)

  const selected = useMemo(() => {
    const selectedOptions = []

    brands.forEach((brand) => {
      const options = brand.options.filter(option => brand.visible === "1" && option.selected === "1")
      if (options.length > 0) {
        const optionNames = options.map(option => option.name).join(', ')
        selectedOptions.push({
          id: brand.id,
          name: brand?.name,
          options: options[0].id === '0' ? t('all_models') : optionNames
        })
      }
    })

    return selectedOptions
  }, [brands])

  return (
    <ul className={style.block}>
      {
        selected.map((el, idx) =>
          <li
            key={idx}
            className={style.item}
            onClick={() => {
              dispatch(selectBrands(el.id))
              setShow(true)
            }}
          >
            <Image
              width={32}
              height={32}
              className={style.img}
              src={`/images/brands/${el.id}.webp`}
              priority={true}
              alt={el.name}
            />
            <span className={style.meta}>
              <h6 className={style.title}>{el.name}</h6>
              <p className={style.model}>{el.options}</p>
            </span>
            <button
              type="button"
              className={style.remove}
              aria-label={t('remove')}
              title={t('remove')}
              onClick={(e) => {
                e.stopPropagation()
                dispatch(deleteBrands(el.id))
              }}
            >
              <Icon
                iconName={'circle-plus'}
                width={20}
                height={20}
                className={style.close}
              />
            </button>
          </li>
        )
      }
    </ul>
  )
}

export default List
