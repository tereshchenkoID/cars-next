import axios from 'axios'
// import Cookies from 'js-cookie'

import { API_BASE_URL } from 'constant/config';

export const useRequest = (link, data, headers) => {
  // const token = Cookies.get('next-auth.session-token') || ''
  const server = axios.create({
    baseURL: `${API_BASE_URL}/${link}`,
    withCredentials: true,
    // credentials: 'include',
    // headers: {
    //   ...headers,
    //   // Authorization: `Bearer ${token}`,
    // },
  })


  // console.log(Cookies.get('SID'))

  // const handleSessionExpiry = (response) => {
  //   if (response?.data?.code === "2") {
  //     sessionStorage.clear()

  //     window.location.href = '/';
  //   }
  // };

  const get = async url => {
    try {
      const req = await server({
        method: 'get',
        url,
        headers,
      })
      // handleSessionExpiry(req)
      return await req.data
    } catch (e) {
      return e.response
    }
  }

  const post = async url => {
    try {
      const req = await server({
        method: 'post',
        url,
        data,
        headers,
      })
      // handleSessionExpiry(req)
      return await req.data
    } catch (e) {
      return e.response
    }
  }

  return {
    get,
    post,
  }
}
