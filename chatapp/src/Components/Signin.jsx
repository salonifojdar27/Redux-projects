import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/Firebase'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSignin(e) {
    e.preventDefault()
    if (!email || !password) return alert('Email and password required')
    await signInWithEmailAndPassword(auth, email, password)
    navigate('/')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleSignin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          SignIn
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Create Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white p-3 rounded-lg font-semibold shadow-md"
        >
          SignIn
        </button>

        {/* Already have an account */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:underline font-medium"
          >
            SignUp
          </a>
        </p>
      </form >
    </div>
  )
}
