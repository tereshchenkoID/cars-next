import { getServerSession } from 'next-auth'
import { apiRequest } from 'utils/apiRequest'
import { authOptions } from 'app/api/auth/[...nextauth]/route'

import SectionFavorites from 'sections/profile/SectionFavorites'
// import Logout from 'modules/Logout'

const Favorite = async ({ searchParams }) => {
  const cookies = await getServerSession(authOptions)
  const data = await apiRequest(
    'user/favorites/', {
      method: 'POST',
      params: await searchParams,
      cookies
    }
  )

  // if (data?.expired) {
  //   return <Logout />
  // }

  return (
    <SectionFavorites initialData={data} />
  )
}

export default Favorite
