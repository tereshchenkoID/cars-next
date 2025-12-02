import { create } from 'zustand'

import { getData } from 'helpers/api'

export const useBrandsStore = create((set, get) => ({
  brands: [],
  selectedBrand: null,

  setBrands: (value) => {
    if (value) {
      set({ brands: value })
      return value
    }

    const json = getData('filters/brands/')

    if (json) {
      set({ brands: json })
    }
  },

  updateBrands: (brandId, optionId, selected) => {
    const brands = get().brands

    const updated = brands.map((brand) => {
      if (brand.id !== brandId) return brand

      let updatedOptions = brand.options.map((opt) => {
        if (optionId === '0') {
          return {
            ...opt,
            selected: selected === '1' ? '1' : '0',
          }
        }

        if (opt.id === optionId) {
          return { ...opt, selected }
        }

        return opt
      })

      const onlyZeroOption = updatedOptions.length === 1

      if (onlyZeroOption) {
        return {
          ...brand,
          options: updatedOptions.map((opt) =>
            opt.id === '0'
              ? { ...opt, selected: opt.selected === '1' ? '1' : '0' }
              : opt
          ),
        }
      }

      const allExceptZeroSelected = updatedOptions
        .filter((opt) => opt.id !== '0')
        .every((opt) => opt.selected === '1')

      if (allExceptZeroSelected) {
        updatedOptions = updatedOptions.map((opt) =>
          opt.id === '0' ? { ...opt, selected: '1' } : opt
        )
      }

      const anyExceptZeroDeselected = updatedOptions
        .filter((opt) => opt.id !== '0')
        .some((opt) => opt.selected === '0')

      if (anyExceptZeroDeselected) {
        updatedOptions = updatedOptions.map((opt) =>
          opt.id === '0' ? { ...opt, selected: '0' } : opt
        )
      }

      return { ...brand, options: updatedOptions }
    })

    set({ brands: updated })
  },

  selectBrands: (brandId) => {
    if (brandId === null) {
      const updated = get().brands.map((b) => ({ ...b, active: false }))
      set({ brands: updated, selectedBrand: null })
      return
    }

    const updated = get().brands.map((b) => ({
      ...b,
      active: b.id === brandId,
    }))

    set({
      brands: updated,
      selectedBrand: brandId,
    })
  },

  deleteBrands: (brandId) => {
    const updated = get().brands.map((brand) => {
      if (brand.id === brandId) {
        return {
          ...brand,
          active: false,
          options: brand.options.map((o) => ({
            ...o,
            selected: '0',
          })),
        }
      }
      return brand
    })

    set({ brands: updated })

    if (get().selectedBrand === brandId) {
      set({ selectedBrand: null })
    }
  },
}))
