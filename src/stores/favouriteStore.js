import { create } from 'zustand'

import { postData } from 'helpers/api'

export const useFavouriteStore = create((set) => ({
  favourite: '0',

  setFavourite: (value) => {
    if (value) {
      set({ favourite: value })
      return
    }

    const formData = new FormData()
    const json = postData('user/favorites/counter/', formData)

    if (json) {
      set({ favourite: json })
    }
  }
}))
