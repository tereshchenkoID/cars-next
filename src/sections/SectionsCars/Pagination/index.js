import Button from '@/components/Button'

import style from './index.module.scss'

const Pagination = ({
  pagination,
  handlePrev,
  handleNext,
}) => {

  return (
    <div className={style.block}>
      <Button 
        icon={"angle-down"}
        classes={['primary', 'square', 'xs', style.prev]}
        onChange={handlePrev}
        isDisabled={pagination.page === 0 || pagination.page === 1}
      />
      <p className={style.count}>{pagination.page} / {pagination.pages}</p>
      <Button 
        icon={"angle-down"}
        onChange={handleNext}
        classes={['primary', 'square', 'xs', style.next]}
        isDisabled={pagination.page === pagination.pages}
      />
    </div>
  )
}

export default Pagination
