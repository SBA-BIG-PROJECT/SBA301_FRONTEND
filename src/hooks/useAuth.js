import { useState, useEffect, useCallback } from 'react'
import { authService } from '../services'

/**
 * Custom hook to manage authentication
 */
export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage when component mounts
  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    const authenticated = authService.isAuthenticated()
    
    setUser(currentUser)
    setIsAuthenticated(authenticated)
    setLoading(false)
  }, [])

  // Register
  const register = useCallback(async (data) => {
    try {
      const response = await authService.register(data)
      setUser(response.user)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      throw error
    }
  }, [])

  // Login
  const login = useCallback(async (credentials) => {
    try {
      const response = await authService.login(credentials)
      setUser(response.user)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      throw error
    }
  }, [])

  // Logout
  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        await authService.logout(refreshToken)
      }
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      // Still clear local data if there's an error
      setUser(null)
      setIsAuthenticated(false)
      throw error
    }
  }, [])

  return {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout
  }
}
