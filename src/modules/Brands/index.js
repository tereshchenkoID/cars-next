import { useState, useEffect } from 'react'

import { overflowBody } from '@/helpers/overflowBody'

import Toggle from './Toggle'
import Modal from './Modal'
import List from './List'

import style from './index.module.scss'

const Brand = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    overflowBody(show)
  }, [show])

  return (
    <div className={style.block}>
      <List 
        show={show} 
        setShow={setShow}
      />
      <Toggle 
        show={show} 
        setShow={setShow}
      />
      {
        show && 
        <Modal 
          show={show} 
          setShow={setShow}
        />
      }
    </div>
  )
}

export default Brand
