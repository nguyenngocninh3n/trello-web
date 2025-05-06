import axios from 'axios'
import { interceptorLoadingElements } from './formatters'
import { toast } from 'react-toastify'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/api'

const axiosInstance = axios.create()
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.timeout = 1000 * 60
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    interceptorLoadingElements(true)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

let axiosStore
let refreshTokenPromise = null

export const injectStore = mainStore => {
  axiosStore = mainStore
}

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    interceptorLoadingElements(false)
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    interceptorLoadingElements(false)
    if (error?.status !== 410) toast(error?.response?.data?.message, { type: 'error' })
    if (error?.status === 401) axiosStore.dispatch(logoutUserAPI(false))

    const originalRequest = error.config
    originalRequest._retry = false
    if (error.response.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then(response => {
            return response.accessToken
          })
          .catch(error => {
            axiosStore.dispatch(logoutUserAPI(false))
            return Promise.reject(error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }
      return refreshTokenPromise
        .then(accessToken => {
          return axiosInstance(originalRequest)
        })
        .catch(error => {})
    }
  }
)

// axiosInstance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     interceptorLoadingElements(false)
//     return response
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     interceptorLoadingElements(false)
//     if (error?.status !== 410) toast(error?.response?.data?.message, { type: 'error' })
//     if (error?.status === 410) axiosStore.dispatch(logoutUserAPI(false))

//     const originalRequest = error.config
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true
//       refreshTokenAPI()
//         .then(response => {
//           return response.data.accessToken
//         })
//         .catch(error => {
//           axiosStore.dispatch(logoutUserAPI(false))
//         })
//       return axiosInstance(originalRequest)
//     }
//     return Promise.reject(error)
//   }
// )
export default axiosInstance
