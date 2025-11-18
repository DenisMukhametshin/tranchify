import { useCallback, useEffect, useState } from 'react'

const AUTH_STORAGE_KEY = 'isAuthenticated'

export function useAuth(): {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
} {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false
    }
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    return stored === 'true'
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored === 'true' && !isAuthenticated) {
      setIsAuthenticated(true)
    } else if (stored !== 'true' && isAuthenticated) {
      setIsAuthenticated(false)
    }
  }, [isAuthenticated])

  const login = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      setIsAuthenticated(true)
    }
  }, [])

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      setIsAuthenticated(false)
    }
  }, [])

  return {
    isAuthenticated,
    login,
    logout,
  }
}
