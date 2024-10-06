import style from './index.module.scss'

const Backdrop = ({ onChange = () => {} }) => {

  return (
    <div 
      className={style.block}
      onClick={onChange}
    />
  )
}

export default Backdrop
