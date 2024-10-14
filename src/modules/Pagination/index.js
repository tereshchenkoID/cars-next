import Button from '@/components/Button'

import style from './index.module.scss'

const Pagination = () => {

  return (
    <div className={style.block}>
      <Button 
        icon={"angle-down"}
        classes={['primary', 'square', 'sm', style.prev]}
        isDisabled={true}
      />
      <Button 
        placeholder={'1'}
        classes={['alt', 'square', 'sm', style.option, style.active]}
      />
      <Button 
        placeholder={'2'}
        classes={['alt', 'square', 'sm', style.option]}
      />
      <Button 
        placeholder={'50670'}
        classes={['alt', 'square', 'sm', style.option]}
      />
      <Button 
        icon={"angle-down"}
        classes={['primary', 'square', 'sm', style.next]}
      />
    </div>
  )
}

export default Pagination
