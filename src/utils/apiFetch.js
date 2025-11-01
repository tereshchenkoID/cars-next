export async function apiFetch(path, options = {}) {
  const { method = 'GET', body } = options

  const res = await fetch(`/api/proxy?path=${encodeURIComponent(path)}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'API Error')
  return data
}
