import style from './index.module.scss'

const Label = ({ data, isRequired }) => {
  return (
    <p className={style.block}>
      {data}
      {
        isRequired &&
        <span className={style.icon}>*</span>
      }
    </p>
  )
}

export default Label
