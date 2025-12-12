import { useTranslations } from 'next-intl'

import { DEFAULT } from 'constant/config'

import { getYears } from 'helpers/getYears'

import Field from 'components/Field'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Brands from 'modules/Brands'
import FiltersMultiSelect from 'modules/FiltersMultiSelect'
import FiltersColorSelect from 'modules/FiltersColorSelect'
import FiltersSelect from 'modules/FiltersSelect'

import style from './index.module.scss'

const All = ({
  showBrand,
  setShowBrands,
  filtersProps,
}) => {
  const t = useTranslations()
  const {
    handleChange,
    filters,
    search,
  } = filtersProps

  return (
    <>
      <Brands
        show={showBrand}
        setShow={setShowBrands}
        isWide={true}
        isLabel={true}
        label={t('make_or_model')}
      />
      <FiltersSelect
        placeholder={'state'}
        data={search?.state}
        onChange={(value) => handleChange('select', 'state', value)}
        isLabel={true}
        label={t('filters.state.0')}
      />
      <div className={style.wrapper}>
        <Field
          type={'number'}
          placeholder={t('from')}
          data={search?.mileage_from?.value[0] !== DEFAULT ? search?.mileage_from?.value[0] : ''}
          onChange={(value) => handleChange(filters.mileage_from.type, 'mileage_from', value)}
          isLabel={true}
          label={t('filters.mileage.0')}
        />
        <Field
          type={'number'}
          placeholder={t('to')}
          data={search?.mileage_to?.value[0] !== DEFAULT ? search?.mileage_to?.value[0] : ''}
          onChange={(value) => handleChange(filters.mileage_to.type, 'mileage_to', value)}
        />
      </div>
      <Checkbox
        placeholder={t('filters.vat_reclaimable.0')}
        data={search.vat_reclaimable?.value[0]}
        onChange={(value) => handleChange('select', 'vat_reclaimable', value)}
      />
      <Checkbox
        placeholder={t('filters.discount.0')}
        data={search.discount?.value[0]}
        onChange={(value) => handleChange('select', 'discount', value)}
      />
      <FiltersMultiSelect
        placeholder={'category'}
        options={filters.category.options}
        data={search.category}
        onChange={handleChange}
        isLabel={true}
        label={t('filters.category.0')}
      />
      <FiltersMultiSelect
        placeholder={'body'}
        options={filters.body.options}
        data={search.body}
        onChange={handleChange}
        isLabel={true}
        label={t('filters.body.0')}
      />
      <div className={style.wrapper}>
        <Field
          type={'number'}
          placeholder={t('from')}
          data={search.mileage_from?.value[0] !== DEFAULT ? search.mileage_from?.value[0] : ''}
          onChange={(value) => handleChange('field', 'mileage_from', value)}
          isLabel={true}
          label={t('filters.mileage.0')}
        />
        <Field
          type={'number'}
          placeholder={t('to')}
          data={search.mileage_to?.value[0] !== DEFAULT ? search.mileage_to?.value[0] : ''}
          onChange={(value) => handleChange('field', 'mileage_to', value)}
        />
      </div>
      <div className={style.wrapper}>
        <FiltersSelect
          placeholder={'year_from'}
          options={
            getYears().map(year => ({
              value: year === DEFAULT ? DEFAULT : year,
              label: year === DEFAULT ? t('from') : year,
            }))
          }
          data={search?.year_from}
          onChange={(value) => handleChange('select', 'year_from', value)}
          isLabel={true}
          label={t('filters.year.0')}
        />
        <FiltersSelect
          placeholder={'year_to'}
          options={
            getYears().map(year => ({
              value: year === DEFAULT ? DEFAULT : year,
              label: year === DEFAULT ? t('to') : year,
            }))
          }
          data={search?.year_to}
          onChange={(value) => handleChange('select', 'year_to', value)}
        />
      </div>
      <FiltersMultiSelect
        placeholder={'fuel_type'}
        options={filters.fuel_type.options}
        data={search.fuel_type}
        onChange={handleChange}
        isLabel={true}
        label={t('filters.fuel_type.0')}
      />
      <FiltersMultiSelect
        placeholder={'drive'}
        options={filters?.drive?.options}
        data={search?.drive}
        onChange={handleChange}
        isLabel={true}
        label={t('filters.drive.0')}
      />
      <FiltersMultiSelect
        placeholder={'transmission'}
        options={filters.transmission.options}
        data={search.transmission}
        onChange={handleChange}
        isLabel={true}
        label={t('filters.transmission.0')}
      />
      <FiltersMultiSelect
        placeholder={'eco'}
        options={filters.eco.options}
        data={search.eco}
        onChange={handleChange}
        isLabel={true}
        label={t('filters.eco.0')}
      />
      <FiltersColorSelect
        placeholder={'color'}
        options={filters.color.options}
        data={search.color}
        onChange={handleChange}
        isLabel={true}
        label={t('filters.color.0')}
      />
    </>
  )
}

export default All
