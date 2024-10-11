import { useDispatch } from 'react-redux'
import { useTranslations } from 'next-intl'

import classNames from 'classnames'

import { deleteBrands } from '@/store/actions/brandsAction'

import Image from 'next/image'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Brand = ({ data, onChange, isWide = false }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const length = data?.options.length
  const counts = data?.options.filter(option => option.selected === "1").length

  return (
    <div
      className={
        classNames(
          style.block,
          isWide && style.wide,
          counts > 0 && style.active,
        )
      }
      onClick={() => onChange(data.id)}
    >
      <Image
        width={32}
        height={32}
        className={style.img}
        src={`/images/brands/${data.id}.webp`}
        priority={true}
        alt={data.name}
      />
      {
        isWide &&
        <span className={style.text}>{data.name}</span>
      }
      {
        counts > 0 &&
        <>
          <span className={style.count}>
            {
              length === counts
                ?
                  <Icon
                    iconName={'check'}
                    width={16}
                    height={16}
                    className={style.icon}
                  />
                :
                  counts
            }
          </span>
          {
            isWide &&
              <button
                type="button"
                className={style.remove}
                aria-label={t('remove')}
                title={t('remove')}
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(deleteBrands(data.id))
                }}
              >
                <Icon
                  iconName={'trash'}
                  width={18}
                  height={18}
                />
              </button>
          }
        </>
      }
    </div>
  )
}

export default Brand
