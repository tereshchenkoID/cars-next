import { fetchMetaTags } from 'utils/fetchMetaTags'

import SectionProfile from 'sections/profile/SectionProfile'

export async function generateMetadata() {
  return await fetchMetaTags('profile')
}

const Profile = async ({ children }) => {
  return (
    <>
      <SectionProfile />
      {children}
    </>
  )
}

export default Profile
