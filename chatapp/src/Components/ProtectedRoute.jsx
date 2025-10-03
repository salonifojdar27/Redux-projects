import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const me = useSelector(s => s.auth.user)
  if (!me) return <Navigate to="/signup" replace />
  return children
}
