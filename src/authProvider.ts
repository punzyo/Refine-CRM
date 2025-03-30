import { AuthProvider } from '@refinedev/core'

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      return {
        success: true,
        redirectTo: '/',
      }
    } else {
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: '帳號或密碼錯誤',
        },
      }
    }
  },
  logout: async () => {
    await fetch('http://localhost:3001/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    return { success: true, redirectTo: '/login' }
  },

  check: async () => {
    const res = await fetch('http://localhost:3001/admin/me', {
      credentials: 'include',
    })

    if (res.ok) {
      return { authenticated: true }
    } else {
      return { authenticated: false, redirectTo: '/login' }
    }
  },

  getIdentity: async () => {
    const res = await fetch('http://localhost:3001/admin/me', {
      credentials: 'include',
    })

    if (!res.ok) return null

    const data = await res.json()
    return {
      id: data.userId,
      name: data.email,
    }
  },

  onError: async () => {
    return { error: { message: 'Auth error' } }
  },
}
