export async function fetchMetaTags(url) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/metatags/${url}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch meta tags from ${url}`)
    }
    return await res.json()
  } catch (error) {
    console.error(`Error fetching meta tags on page ${url}:`, error)
    return null;
  }
}