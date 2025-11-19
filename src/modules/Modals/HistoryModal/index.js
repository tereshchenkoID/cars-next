import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useModal } from 'context/ModalContext'
import { useDispatch, useSelector } from 'react-redux'

import { validationRules } from 'utils/validationRules'
import { setToastify } from 'store/actions/toastifyAction'
import { postData } from 'helpers/api'

import Field from 'components/Field'
import Button from 'components/Button'
import InputGroup from 'modules/InputGroup'

import style from './index.module.scss'

const HistoryModal = ({id = null, type, name = '', data, setData = () => {} }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { closeModal } = useModal()
  const [filter, setFilter] = useState({
    name: {
      value: name,
      isValid: false
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', id)
    formData.append('counts', data?.results || null)
    formData.append('params', JSON.stringify(data?.params))
    formData.append('date', new Date().getTime())
    formData.append('name', filter.name.value)
    formData.append('type', type)

    postData('user/filters/', formData).then(json => {
      if (json) {
        dispatch(
          setToastify({
            type: 'success',
            text: type === '2' ? t('notification.history_saved') : t('notification.history_remove'),
          })
        )
        setData(json)
        closeModal()
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          })
        )
      }
    })
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
      {
        type === '2'
          ?
            <>
              <h6 className={style.title}>{t('notification.sure_remove')} "{name}"?</h6>
              <Button
                type={'submit'}
                classes={['primary', 'md', 'wide']}
                placeholder={t('delete_search')}
              />
              <Button
                classes={['alt', 'md', 'wide']}
                placeholder={t('dont_delete')}
                onChange={() => closeModal()}
              />
            </>
          :
            <>
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
                classes={['primary', 'md', 'wide']}
                placeholder={t('actions.save')}
                isDisabled={!isFormValid}
              />
            </>
      }

      {/* <h6 className={style.title}>{t('notification.sure_remove')} "{name}"?</h6>
      <Button
        type={'submit'}
        classes={['primary', 'wide']}
        placeholder={t('delete_search')}
      />
       <Button
        classes={['alt', 'wide']}
        placeholder={t('dont_delete')}
        onChange={() => closeModal()}
      /> */}
    </form>
  )
}

export default HistoryModal
