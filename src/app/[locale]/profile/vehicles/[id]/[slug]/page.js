import SectionVehicle from '@/sections/SectionVehicle'
import { fetchData } from '@/utils/fetchData'

const Vehicle = async ({ params: { id } }) => {
  const [data, options] = await Promise.all([
    fetchData(`item/${id}`),
    fetchData('filters/options')
  ])

  return (
    <SectionVehicle data={data} options={options} />
  )
}

export default Vehicle