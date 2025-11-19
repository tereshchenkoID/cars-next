import { fetchData } from 'utils/fetchData'

import SectionVehicle from 'sections/profile/SectionVehicle'

const Vehicle = async ({ params }) => {
  const { id } = await params
  const [options, data] = await Promise.all([
    fetchData('filters/options'),
    fetchData(`item/${id}`)
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
