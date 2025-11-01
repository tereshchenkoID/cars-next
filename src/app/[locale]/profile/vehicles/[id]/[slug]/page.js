import { fetchData } from 'utils/fetchData'

import SectionVehicle from 'sections/profile/SectionVehicle'

const Vehicle = async ({ params }) => {
  const { id } = await params
  const [data, options] = await Promise.all([
    fetchData(`item/${id}`),
    fetchData('filters/options')
  ])

  return (
    <SectionVehicle data={data} options={options} />
  )
}

export default Vehicle
