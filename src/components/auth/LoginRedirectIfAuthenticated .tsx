import { useGetIdentity } from '@refinedev/core'
import { Navigate } from 'react-router'
import Login from '../../pages/login'

export const LoginRedirectIfAuthenticated = () => {
  const { data, isLoading } = useGetIdentity()

  if (isLoading) return null

  if (data) {
    return <Navigate to="/" replace />
  }

  return <Login />
}
