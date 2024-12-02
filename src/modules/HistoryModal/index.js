import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from '@/context/ModalContext'
import { useDispatch } from 'react-redux'
import { signIn } from 'next-auth/react'

import { validationRules } from '@/utils/validationRules'

import { setToastify } from '@/store/actions/toastifyAction'

import Field from '@/components/Field'
import Button from '@/components/Button'
import InputGroup from '@/modules/InputGroup'

import style from './index.module.scss'

const HistoryModal = () => {
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

  const handleChange = (field, { value, isValid }) => {
    setFilter((prevData) => ({
      ...prevData,
      [field]: { value, isValid },
    }))
  }

  const isFormValid = useMemo(() => {
    return Object.values(filter).every((field) => field.isValid)
  }, [filter])

  return (
    <form onSubmit={handleSubmit} className={style.block}>
      <InputGroup
        label={t('name')}
        value={filter.name.value}
        rules={[
          validationRules.required,
          validationRules.minLength(3),
        ]}
        onValidationChange={(isValid) =>
          handleChange('name', { value: filter.name.value, isValid })
        }
      >
        <Field
          placeholder={t('name')}
          data={filter.name.value}
          onChange={(value) => handleChange('name', { value, isValid: filter.name.isValid })}
        />
      </InputGroup>

      <Button
        type={'submit'}
        classes={['primary', 'wide']}
        placeholder={t('save')}
        isDisabled={!isFormValid}
      />
    </form>
  )
}

export default HistoryModal