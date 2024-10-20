import { useRequest } from '@/hooks/useRequest'

export const getData = async url => {
  const { get } = useRequest(url)

  try {
    return await get()
  } catch (e) {
    console.log(e)
  }
}

export const postData = async (url, data, headers) => {
  const { post } = useRequest(url, data, headers)

  try {
    return await post()
  } catch (e) {
    console.log(e)
  }
}
