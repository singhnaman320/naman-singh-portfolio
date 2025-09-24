import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { LoadingPage } from '../UI/Loading'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingPage message="Checking authentication..." />
  }

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export default ProtectedRoute
