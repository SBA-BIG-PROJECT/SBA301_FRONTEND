import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks'

/**
 * Admin Route Component
 * Protects routes that require ADMIN role
 */
export function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }
  
  // Check if authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check if admin (adjust 'role' or 'roles' based on your actual backend user object)
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN' || 
                  user?.roles?.includes('ADMIN') || user?.roles?.includes('ROLE_ADMIN') ||
                  user?.authorities?.some(a => a.authority === 'ROLE_ADMIN');

  if (!isAdmin) {
    // If logged in but not admin, redirect to home
    return <Navigate to="/" replace />
  }
  
  return children
}
