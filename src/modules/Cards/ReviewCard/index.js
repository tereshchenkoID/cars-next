import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { NAVIGATION } from 'constant/config'

import { useBrandsStore } from 'stores/brandsStore'

import Image from 'next/image'
import Reference from 'components/Reference'
import StarRating from 'modules/StarRating'

import style from './index.module.scss'

const ReviewCard = ({ data }) => {
  const t = useTranslations()
  const { brands } = useBrandsStore()

  const selectedModel = useMemo(() => {
    const selectedMake = brands.find((brand) => brand.id === data.make)
    if (selectedMake && selectedMake.options) {
      return selectedMake.options.find((option) => option.id === data.model) || null
    }
    return null
  }, [data])

  return (
    <div className={style.block}>
      <div className={style.picture}>
        <Image
          src={data.url}
          width={360}
          height={225}
          className={style.image}
          priority={false}
          alt={data.name}
        />
      </div>
      <div className={style.content}>
        <h6>{data.name}</h6>
        <StarRating data={data.rate} />
        <p>{data.text}</p>
      </div>
      <div className={style.footer}>
        <Image
          width={44}
          height={44}
          className={style.make}
          src={`/images/brands/${data.make}.webp`}
          priority={false}
          alt={`${t('make')} ${selectedModel?.name}`}
        />
        <div>
          <p>{selectedModel?.name}</p>
          <Reference
            link={`${NAVIGATION.buy.link}?make_${data.make}=${data.model}`}
            classes={['reference']}
            placeholder={t('similar_cars')}
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
