import { getServerSession } from 'next-auth'
import { apiRequest } from 'utils/apiRequest'
import { authOptions } from 'app/api/auth/[...nextauth]/route'

import SectionArchive from 'sections/profile/SectionArchive'

const Archive = async ({ searchParams }) => {
  const cookies = await getServerSession(authOptions)
  const data = await apiRequest(
    'user/favorites/', {
      method: 'POST',
      params: searchParams,
      cookies
    }
  )

  return (
    <SectionArchive initialData={data} />
  )
}

export default Archive
