import classNames from 'classnames'

import Image from 'next/image'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Brand = ({ data, onChange, isWide = false }) => {
  const length = data?.options.length
  const counts = data?.options.filter(option => option.selected === "1").length

  return (
    <button
      type="button"
      className={
        classNames(
          style.block,
          isWide && style.wide,
          counts > 0 && style.active,
        )
      }
      aria-label={data.name}
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
      }
    </button>
  )
}

export default Brand
