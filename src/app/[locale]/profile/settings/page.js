import { fetchMetaTags } from '@/utils/fetchMetaTags'

import SectionSettings from '@/sections/SectionSettings'

export async function generateMetadata() {
  return await fetchMetaTags('profile/settings')
}

const Settings = async () => {

  return (
    <SectionSettings />
  )
}

export default Settings