import { AuthProvider } from '@refinedev/core'
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
    if (cachedUser) return { authenticated: true }

    const res = await fetch('http://localhost:3001/admin/me', {
      credentials: 'include',
    })

    if (res.ok) {
      const data = await res.json()
      cachedUser = { id: data.userId, name: data.email }
      return { authenticated: true }
    }

    const refresh = await fetch('http://localhost:3001/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })

    if (refresh.ok) return { authenticated: true }

    return { authenticated: false, redirectTo: '/login' }
  },

  getIdentity: async () => {
    if (cachedUser) return cachedUser

    const res = await fetch('http://localhost:3001/admin/me', {
      credentials: 'include',
    })

    if (!res.ok) return null

    const data = await res.json()
    cachedUser = { id: data.userId, name: data.email }
    return cachedUser
  },

  onError: async (error: any) => {
    return { error: { name: 'AuthError', message: 'Auth error' } }
  },
}
