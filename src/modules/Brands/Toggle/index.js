import classNames from 'classnames'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const Toggle = ({ show, setShow }) => {
  return (
    <button
      type={'button'}
      className={
        classNames(
          style.block,
          show && style.active
        )
      }
      aria-label={'Add a car'}
      onClick={() => setShow(!show)}
    >
      <Icon
        iconName={'circle-plus'}
        width={16}
        height={16}
        className={style.plus}
      />
      <span>Add a car</span>
      <Icon
        iconName={'angle-down'}
        width={16}
        height={16}
        className={style.arrow}
      />
    </button>
  )
}

export default Toggle
