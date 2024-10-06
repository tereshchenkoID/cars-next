import { useSelector } from 'react-redux'

import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Card = ({ data }) => {
  const { auth } = useSelector((state) => state.auth)

  return (
    <div
      className={
        classNames(
          style.block,
        )
      }
    >
      <div className={style.left}>
        <button
          type={'button'}
          className={style.favorite}
          aria-label="Favorite"
        >
          <Icon 
            iconName={'heart'}
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className={style.right}>
        <h6 className={style.title}>Mercedes-Benz E 300 e T 230 kW</h6>

        <ul className={style.options}>
          <li className={style.option}>
            <Icon 
              iconName={'road'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>11 993km</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'calendar'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>12 / 2023</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'engine'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>12 / 2023</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'transmission'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>Automatic</p>
          </li>
          <li className={style.option}>
            <Icon 
              iconName={'hybrid'}
              width={18}
              height={18}
              className={style.icon}
            />
            <p>Hybrid</p>
          </li>
        </ul>

        <ul className={style.tags}>
          <li className={style.tag}>Parking assist system self-steering</li>
          <li className={style.tag}>Keyless entry</li>
          <li className={style.tag}>Heated steering wheel</li>
          <li className={style.tag}>Apple CarPlay</li>
        </ul>

        <div className={style.meta}>
          <h5>66 045 {auth?.account.currency.symbol}</h5>
        </div>
      </div>
    </div>
  )
}

export default Card
