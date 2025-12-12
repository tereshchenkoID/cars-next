import { apiRequest } from './apiRequest'

export async function fetchMetaTags(url) {
  return await apiRequest(`metatags/${url}`, { method: 'GET' })
}
