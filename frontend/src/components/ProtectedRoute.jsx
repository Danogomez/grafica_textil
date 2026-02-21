import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("fotovega_admin_token")
  if (!token) return <Navigate to="/admin" replace />
  return children
}
