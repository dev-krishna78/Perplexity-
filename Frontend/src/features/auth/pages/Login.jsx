import React, { useState } from 'react'
import {useAuth} from "../hooks/useAuth"
import {useNavigate} from "react-router-dom"


const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  

  const {handleLogin} = useAuth();
  const navigate = useNavigate()




  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    const response = await handleLogin(formData)


    console.log('Login Form Values:', response)
    navigate("/")
    setFormData({ email: '', password: '' })
  }

  

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition duration-200"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition duration-200"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-red-500 hover:text-red-400 transition duration-200">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Switch to Register */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-red-500 hover:text-red-400 font-semibold transition duration-200"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login