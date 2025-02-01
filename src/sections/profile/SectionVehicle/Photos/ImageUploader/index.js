import { useTranslations } from 'next-intl'
import { useState } from "react"

import Button from "@/components/Button"
import Icon from "@/components/Icon"

import style from './index.module.scss'

const ImageUploader = ({ onUpload }) => {
  const t = useTranslations()
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => file.type.startsWith("image/"))

    if (validFiles.length < files.length) {
      alert("Only image files are allowed!")
    }

    setSelectedFiles((prev) => [...prev, ...validFiles])

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file))
    setPreviewImages((prev) => [...prev, ...newPreviews])
  }

  const handleRemoveImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event) => {
    // event.preventDefault()
    // if (selectedFiles.length === 0) {
    //   alert("Please select at least one image to upload.")
    //   return
    // }

    // const formData = new FormData()
    // selectedFiles.forEach((file, index) => {
    //   formData.append(`image_${index}`, file)
    // })

    // try {
    //   if (onUpload) {
    //     await onUpload(formData)
    //   }
    //   alert("Images uploaded successfully!")
    //   setSelectedFiles([])
    //   setPreviewImages([])
    // } catch (error) {
    //   console.error("Upload failed:", error)
    //   alert("Failed to upload images.")
    // }
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
      <form 
        onSubmit={handleSubmit}
        className={style.form}
      >
        <label className={style.label}>
          <input
            type="file"
            accept="image/*"
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

        {previewImages.length > 0 &&
          <>
            <div className={style.previews}>
              {previewImages.map((src, index) => (
                <div
                  key={index}
                  className={style.preview}
                >
                  <img
                    src={src}
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
              ))}
            </div>
            <Button
              type={'submit'}
              placeholder={t('upload')}
              classes={['primary', style.button]}
            />
          </>
        }
      </form>
    </div>
  )
}

export default ImageUploader
