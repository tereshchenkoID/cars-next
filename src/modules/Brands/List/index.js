import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'

import Image from 'next/image'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const List = () => {
  const t = useTranslations()
  const brands = useSelector((state) => state.brands)

  return (
    <ul className={style.block}>
      {
        brands.map((el, idx) =>
          (idx < 3 && el.visible === "1") &&
          <li
            key={idx}
            className={style.item}
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
              <p className={style.model}>Model</p>
            </span>
            <button
              type="button"
              className={style.remove}
              aria-label={'Remove'}
              title={'Remove'}
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
