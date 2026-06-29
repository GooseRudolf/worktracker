import axios from 'axios'
import { authStore, clearAuth, refreshToken } from '@/store/authStore'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

let refreshPromise: Promise<void> | null = null
instance.interceptors.request.use((config) => {
  const token = authStore.getState().access
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use( res => res, async error => {
    const original = error.config
    if (!error.response || error.response.status !== 401 || original._retry)
      return Promise.reject(error)
    if (original.url?.includes('/refresh'))
      return Promise.reject(error)
    original._retry = true
    try {
      if (!refreshPromise)
        refreshPromise = refreshToken()
      await refreshPromise
      return instance(original)
    } catch {
      clearAuth()
      return Promise.reject(error)
    } finally {
      refreshPromise = null
    }
  }
)
export default instance