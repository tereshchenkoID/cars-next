import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/Button'

import style from './index.module.scss'

const PhotoEditor = ({ blob, onClose }) => {
  const t = useTranslations()
  const canvasRef = useRef()
  // const originalBlob = useRef(blob)

  const [filters, setFilters] = useState({
    rotation: 0,
    scale: 1,
    contrast: 100,
    saturate: 100,
    brightness: 100,
    flipX: 1,
    flipY: 1,
  })

  const handleSave = (format = 'image/png', quality = 1.0) => {
    const canvas = canvasRef.current

    canvas.toBlob(
      (editedBlob) => {
        if (editedBlob) {
          const url = URL.createObjectURL(editedBlob)
          const link = document.createElement('a')

          link.href = url
          link.download = `edited-image.${format.split('/')[1]}`
          link.click()

          URL.revokeObjectURL(url)
          console.log('Edited Blob saved:', editedBlob)
        } else {
          console.error('Failed to generate Blob from canvas')
        }
      },
      format,
      quality
    )

    onClose()
  }

  const applyFilters = (image) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = image.width
    canvas.height = image.height

    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const { rotation, scale, contrast, saturate, brightness, flipX, flipY } = filters
    ctx.filter = `contrast(${contrast}%) saturate(${saturate}%) brightness(${brightness}%)`
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.scale(flipX, flipY)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(scale, scale)
    ctx.drawImage(image, -image.width / 2, -image.height / 2)
    ctx.restore()
  }

  const resetFilters = () => {
    setFilters({
      rotation: 0,
      scale: 1,
      contrast: 100,
      saturate: 100,
      brightness: 100,
      flipX: 1,
      flipY: 1,
    })
  }

  useEffect(() => {
    if (!blob) return

    const image = new Image()
    const url = URL.createObjectURL(blob)

    image.src = url
    image.onload = () => {
      applyFilters(image)
      URL.revokeObjectURL(url)
    }
  }, [blob, filters])

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className={style.block}>
      <div className={style.wrapper}>
        <div className={style.head}>
          <Button
            placeholder={t('save')}
            classes={['primary', 'sm']}
            onChange={handleSave}
          />
          <Button
            placeholder={t('cancel')}
            classes={['primary', 'sm']}
            onChange={onClose}
          />
        </div>

        <canvas ref={canvasRef} className={style.canvas}></canvas>

        <div className={style.controls}>
          {['rotation', 'contrast', 'saturate', 'brightness'].map((key) => (
            <label className={style.control} key={key}>
              <span>{t(key)}:</span>
              <input
                type="range"
                min={key === 'rotation' ? 0 : 0}
                max={key === 'rotation' ? 360 : 200}
                step={10}
                value={filters[key]}
                onChange={(e) => updateFilter(key, Number(e.target.value))}
              />
            </label>
          ))}
        </div>

        <div className={style.options}>
          <Button
            icon={'reset'}
            classes={['primary', 'square', 'sm']}
            onChange={resetFilters}
          />
          <Button
            icon={'flip-x'}
            classes={['primary', 'square', 'sm']}
            onChange={() => updateFilter('flipX', filters.flipX * -1)}
          />
          <Button
            icon={'flip-y'}
            classes={['primary', 'square', 'sm']}
            onChange={() => updateFilter('flipY', filters.flipY * -1)}
          />
          <Button
            icon={'zoom-plus'}
            classes={['primary', 'square', 'sm']}
            onChange={() => updateFilter('scale', filters.scale + 0.1)}
          />
          <Button
            icon={'zoom-minus'}
            classes={['primary', 'square', 'sm']}
            onChange={() => updateFilter('scale', filters.scale - 0.1)}
          />
        </div>
      </div>
    </div>
  )
}

export default PhotoEditor