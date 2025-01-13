import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import SectionFavorites from '@/sections/SectionFavorites'

async function postData(endpoint, searchParams, cookies) {
  const formData = new FormData()
  formData.append('userId', cookies?.id || null)
  formData.append('sort', Number(searchParams?.sort) || 0)
  formData.append('page', Number(searchParams?.page) || 1)

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      body: formData,
      cache: 'no-cache',
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${res.statusText}`)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error posting data:', error)
    return null
  }
}

const Favorite = async ({ searchParams }) => {
  const cookies = await getServerSession(authOptions)
  const data = await postData('user/favorites/', searchParams, cookies)

  return (
    <SectionFavorites initialData={data} />
  )
}

export default Favorite