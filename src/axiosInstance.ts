import axios from 'axios'
import { authProvider } from './authProvider'
const axiosInstance = axios.create({
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    return config
  },
  (error) => Promise.reject(error)
)


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (originalRequest.headers?.['x-retry']) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401) {
      originalRequest.headers['x-retry'] = 'true'

      try {
        await axiosInstance.post(
          'http://localhost:3001/auth/refresh',
          {},
          {
            headers: {
              'x-retry': 'true',
            },
          }
        )

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        authProvider.logout?.({})
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
export default axiosInstance
