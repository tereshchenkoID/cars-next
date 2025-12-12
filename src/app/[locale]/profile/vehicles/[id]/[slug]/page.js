import { apiRequest } from 'utils/apiRequest'

import SectionVehicle from 'sections/profile/SectionVehicle'

const Vehicle = async ({ params }) => {
  const { id } = await params

  const [options, data] = await Promise.all([
    apiRequest('filters/options'),
    apiRequest(`item/${id}`)
  ])

  return (
    <SectionVehicle
      id={id}
      data={data}
      options={options}
    />
  )
}

export default Vehicle
