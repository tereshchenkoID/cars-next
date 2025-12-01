import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslations } from 'next-intl'

import { setToastify } from 'store/actions/toastifyAction'

import Button from 'components/Button'
import Icon from 'components/Icon'

import style from './index.module.scss'

const ImageUploader = ({ uploaded, handlePropsChange }) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => file.type.startsWith('image/'))

    if (validFiles.length < files.length) {
      dispatch(
        setToastify({
          type: 'error',
          text: t('notification.upload_image'),
        })
      )
    }

    // const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file))
    // handlePropsChange([...uploaded, ...newPreviewUrls])

    const newItems = validFiles.map(file => file)
    handlePropsChange([...uploaded, ...newItems])
  }

  const handleRemoveImage = (index) => {
    const updated = uploaded.filter((_, i) => i !== index)
    handlePropsChange(updated)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    const files = Array.from(event.dataTransfer.files)
    handleFiles(files)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={style.form}>
        <label className={style.label}>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className={style.input}
            multiple
          />
          <Icon
            iconName={'circle-plus'}
            width={24}
            height={24}
          />
          <p>{t('upload_photo')}</p>
        </label>

        {
          uploaded.length > 0 &&
          <div className={style.previews}>
            {
              uploaded.map((src, index) =>
                <div
                  key={index}
                  className={style.preview}
                >
                  <img
                    src={URL.createObjectURL(src)}
                    alt={`Preview ${index}`}
                  />
                  <div className={style.remove}>
                    <Button
                      classes={['primary', 'sm', 'square']}
                      icon={'xmark'}
                      onChange={() => handleRemoveImage(index)}
                    />
                  </div>
                </div>
              )
            }
          </div>
        }
      </div>
    </div>
  )
}

export default ImageUploader
