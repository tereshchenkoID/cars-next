import { DEFAULT } from "@/constant/config"

export const getYears = () => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString())
  years.unshift(DEFAULT)

  return years
}
