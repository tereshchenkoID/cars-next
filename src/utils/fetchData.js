export async function fetchData(url) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/${url}`, 
      {      
        cache: 'no-cache'
      }
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return null;
  }
}