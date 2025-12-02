"use client"

import { useEffect, useState } from "react"
import { useBrandsStore } from "./brandsStore"
import { useSettingsStore } from "./settingsStore"
import { useFiltersStore } from "./filtersStore"

export default function ZustandProvider({ children, initialData }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (initialData.settings) {
      useSettingsStore.setState({ settings: initialData.settings })
    }

    if (initialData.filters) {
      useFiltersStore.setState({ filters: initialData.filters })
    }

    if (initialData.brands) {
      useBrandsStore.setState({ brands: initialData.brands })
    }

    setReady(true)
  }, [])

  if (!ready) return null

  return children
}
