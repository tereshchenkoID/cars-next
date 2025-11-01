import { types } from 'store/actionTypes'

const initialState = {
  brands: [],
}

const brandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BRANDS: {
      return state
    }
    case types.SET_BRANDS: {
      return action.payload
    }
    case types.UPDATE_BRANDS: {
      return state.map(brand => {
        if (brand.id !== action.payload.brandId) {
          return brand
        }

        const updatedOptions = brand.options.map(option => {
          if (action.payload.optionId === "0") {
            return {
              ...option,
              selected: action.payload.selected === "1" ? "1" : "0",
            };
          }

          if (option.id === action.payload.optionId) {
            return { ...option, selected: action.payload.selected }
          }

          return option
        });

        // Check if only the "0" option exists
        const onlyZeroOption = updatedOptions.length === 1

        // If only the "0" option exists, toggle its selection state
        if (onlyZeroOption) {
          return {
            ...brand,
            options: updatedOptions.map(opt =>
              opt.id === "0" ? { ...opt, selected: opt.selected === "1" ? "1" : "0" } : opt
            ),
          };
        }

        // Check if all options (except "0") are selected
        const allExceptZeroSelected = updatedOptions
          .filter(opt => opt.id !== "0")
          .every(opt => opt.selected === "1");

        // If all options except "0" are selected, set "0" to selected
        if (allExceptZeroSelected) {
          return {
            ...brand,
            options: updatedOptions.map(opt =>
              opt.id === "0" ? { ...opt, selected: "1" } : opt
            ),
          };
        }

        // Check if any options (except "0") are deselected
        const anyExceptZeroDeselected = updatedOptions
          .filter(opt => opt.id !== "0")
          .some(opt => opt.selected === "0");

        // If any except "0" are deselected, deselect "0"
        if (anyExceptZeroDeselected) {
          return {
            ...brand,
            options: updatedOptions.map(opt =>
              opt.id === "0" ? { ...opt, selected: "0" } : opt
            ),
          };
        }

        return { ...brand, options: updatedOptions }
      });
    }
    case types.SELECT_BRANDS: {
      return state.map(brand => {
        if (action.payload === null) {
          return { ...brand, active: false }
        }

        return {
          ...brand,
          active: brand.id === action.payload
        }
      })
    }
    case types.DELETE_BRANDS: {
      return state.map(brand => {
        if (brand.id === action.payload) {
          return {
            ...brand,
            active: false,
            options: brand.options.map(option => ({
              ...option,
              selected: "0"
            }))
          }
        }
        return brand
      })
    }
    default: {
      return state
    }
  }
}

export default brandsReducer
