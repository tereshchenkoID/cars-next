export async function fetchData(url, options = {}) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/${url}`,
      {
        ...options
        // cache: 'no-cache',
        // credentials: 'include',
      }
    )

    if (!res.ok) {
      // throw new Error(`Failed to fetch data from ${url}`)
    }
    return await res ? res.json() : null
  } catch (error) {
    console.error('Error fetching data:', error)
    return null;
  }
}
