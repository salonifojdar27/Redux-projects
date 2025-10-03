import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Home from './pages/Home'
import ProtectedRoute from './Components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
}
