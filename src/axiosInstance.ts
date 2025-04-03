import axios from 'axios'

const axiosInstance = axios.create({
  withCredentials: true, 
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const res = await axios.post(
          'http://localhost:3001/auth/refresh',
          {},
          { withCredentials: true }
        )

        if (res.status === 200) {
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
