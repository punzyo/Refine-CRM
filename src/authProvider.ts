import { AuthProvider } from '@refinedev/core'
import Cookies from 'js-cookie'

let cachedUser: { id: string; name: string } | null = null

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      const data = await res.json()
      console.log(data)
      
      Cookies.set('permissions', JSON.stringify(data.permissions), {
        expires: 7,
        sameSite: 'Lax',
      })

      Cookies.set('user', JSON.stringify({ id: data.userId, name: data.email }), {
        expires: 7,
        sameSite: 'Lax',
      })

      cachedUser = { id: data.userId, name: data.email }

      return { success: true, redirectTo: '/' }
    }

    return {
      success: false,
      error: { name: 'LoginError', message: '帳號或密碼錯誤' },
    }
  },

  logout: async () => {
    await fetch('http://localhost:3001/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    Cookies.remove('permissions')
    Cookies.remove('user')
    cachedUser = null

    return { success: true, redirectTo: '/login' }
  },

  check: async () => {
    if (cachedUser) return { authenticated: true }

    const raw = Cookies.get('user')
    if (raw) {
      cachedUser = JSON.parse(raw)
      return { authenticated: true }
    }

    return { authenticated: false, redirectTo: '/login' }
  },

  getIdentity: async () => {
    if (cachedUser) return cachedUser

    const raw = Cookies.get('user')
    if (!raw) return null

    const parsed = JSON.parse(raw)
    cachedUser = parsed
    return parsed
  },

  getPermissions: async () => {
    const raw = Cookies.get('permissions')    
    return raw ? JSON.parse(raw) : []
  },

  onError: async () => {
    return { error: { name: 'AuthError', message: '驗證錯誤' } }
  },
}
