import { create } from 'zustand'

export const useToastifyStore = create((set) => ({
  toastData: null,

  showToast: (type, text) =>
    set({ toastData: { type, text } }),

  clearToast: () =>
    set({ toastData: null })
}))
