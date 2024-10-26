import { API_BASE_URL } from '@/constant/config'

export async function fetchData(url) {
  try {
    const res = await fetch(`${API_BASE_URL}/${url}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return null;
  }
}