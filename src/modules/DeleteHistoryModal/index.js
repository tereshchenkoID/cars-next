import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from '@/context/ModalContext'
import { useDispatch } from 'react-redux'
import { signIn } from 'next-auth/react'

import { setToastify } from '@/store/actions/toastifyAction'

import Button from '@/components/Button'

import style from './index.module.scss'

const DeleteHistoryModal = () => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [filter, setFilter] = useState({
    name: {
      value: '',
      isValid: false
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await signIn('login', {
        redirect: false,
        name: filter.name.value,
      })

      if (result?.ok) {
        // dispatch(
        //   setToastify({
        //     type: 'success',
        //     text: `${t('modal.login')} ${filter.username.value}`,
        //   }),
        // )
        // closeModal()
      }
      else {
        dispatch(
          setToastify({
            type: 'error',
            text: 'An error occurred while logging in.',
          }),
        );
      }
    } catch (error) {
      dispatch(
        setToastify({
          type: 'error',
          text: 'An unexpected error occurred.',
        }),
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className={style.block}>
      <h6 className={style.title}>Are you sure you wish to delete "111111"?</h6>
      <Button
        type={'submit'}
        classes={['primary', 'wide']}
        placeholder={t('delete_search')}
      />
       <Button
        classes={['alt', 'wide']}
        placeholder={t('dont_delete')}
        onChange={() => closeModal()}
      />
    </form>
  )
}

export default DeleteHistoryModal