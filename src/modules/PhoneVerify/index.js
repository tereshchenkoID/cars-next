import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslations } from 'next-intl'

import { DOCUMENTS_VERIFICATIONS } from 'constant/config'

import { postData } from 'helpers/api'
import { setToastify } from 'store/actions/toastifyAction'

import Button from 'components/Button'
import Field from 'components/Field'
import Phone from 'components/Phone'
import Status from 'modules/Status'

import style from './index.module.scss'

const PhoneVerify = ({
  idx,
  filter,
  handleRemovePhone,
  handlePropsChange,
}) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const [code, setCode] = useState('')
  const action = filter.status === 0 ? 'getCode' : 'verify'

  const handleSubmit = (repeat) => {
    const formData = new FormData()
    formData.append('action', repeat ? 'getCode' : action)

    if (filter.status !== '0') (
      formData.append('code', code)
    )

    postData('profile/email/', formData).then(json => {
      if (json.code === "0") {
        dispatch(
          setToastify({
            type: 'success',
            text: json.message,
          }),
        ).then(() => {
          handlePropsChange(json.status || '2')
          setCode('')
        })
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          }),
        )
      }
    })
  }

  return (
    <div className={style.block}>
      <div className={style.left}>
        <Phone
          data={filter.data}
          onChange={(value) => handlePropsChange(value)}
          isLabel={idx === 0}
          isRequired={idx === 0}
          label={t('phone')}
        />
        {
          idx > 0 &&
          <Button
            icon={'trash'}
            classes={['secondary', 'square', 'sm']}
            title={t('remove')}
            onChange={handleRemovePhone}
          />
        }
      </div>
      <div className={style.right}>
        {
          filter.status === '2' &&
          <Field
            type={'text'}
            placeholder={t('code')}
            data={code}
            onChange={value => setCode(value)}
            isRequired={true}
          />
        }
        {
          (filter.status === '1' ||  filter.status === '3') &&
          <Status
            type={DOCUMENTS_VERIFICATIONS[filter.status]}
            data={t(`verification.${DOCUMENTS_VERIFICATIONS[filter.status]}`)}
          />
        }
        {
          (filter.status === '0' ||  filter.status === '2') &&
          <Button
            classes={['primary', 'sm']}
            placeholder={t(filter.status === '0' ? 'verify' : 'send')}
            onChange={() => handleSubmit(false)}
          />
        }
        {
          filter.status === '2' &&
          <Button
            classes={['primary', 'square', 'sm']}
            onChange={() => handleSubmit(true)}
            icon={'reload'}
          />
        }
      </div>
    </div>
  )
}

export default PhoneVerify
