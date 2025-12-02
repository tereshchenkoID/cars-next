import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
  auth: null,

  setAuth: (value) => {
    set({ auth: value })
    return value
  },
}))
