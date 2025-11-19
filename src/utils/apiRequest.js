import 'server-only'

export const apiRequest = async (endpoint, {
  method = 'GET',
  params = {},
  cookies
} = {}) => {
  const url = new URL(`${process.env.API_BASE_URL}/${endpoint}`)
  let body
  const options = {
    method,
    cache: 'no-cache',
    headers: {}
  }

  if (method === 'GET' && params && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value)
      }
    })
  }

  if (method === 'POST' && params && Object.keys(params).length > 0) {
    body = new FormData()
    Object.entries(params).forEach(([key, value]) => {
      body.append(key, value)
    })
  }

  if (cookies?.SID) {
    options.headers['Authorization'] = `Bearer ${cookies.SID}`
  }

  if (body) {
    options.body = body
  }

  try {
    const res = await fetch(url.toString(), options)
    const json = await res.json()

    if (!res.ok) {
      console.error(`❌ ${method} ${url} failed: ${res.status} ${res.statusText}`)
      return null
    }


    if (json?.code === '2') {
      return { expired: true }
    }

    return json
  } catch (error) {
    console.error('🔥 API error:', error)
    return null
  }
}
