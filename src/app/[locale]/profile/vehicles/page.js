import { getServerSession } from 'next-auth'
import { apiRequest } from 'utils/apiRequest'
import { authOptions } from 'app/api/auth/[...nextauth]/route'

import SectionVehicles from 'sections/profile/SectionVehicles'

const Vehicles = async ({ searchParams }) => {
  const cookies = await getServerSession(authOptions)
  const data = await apiRequest(
    'user/favorites/', {
      method: 'POST',
      params: await searchParams,
      cookies
    }
  )

  return (
    <SectionVehicles initialData={data} />
  )
}

export default Vehicles
