import { Navigate, useParams } from 'react-router-dom'

import { useAuth } from '@/hooks'

type ProtectedRouteProps = {
  children: JSX.Element
}

export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { isAuthenticated } = useAuth()
  const { id } = useParams<{ id: string }>()

  if (!isAuthenticated) {
    if (id) {
      return <Navigate replace to={`/product/${id}`} />
    }

    return <Navigate replace to="/" />
  }

  return children
}
