import React, { useState } from 'react'
import {useAuth} from "../hooks/useAuth"
import {useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  

  const {handleLogin} = useAuth();
  const navigate = useNavigate()


  // const [isLogin, setIsLogin] = useState(true)
               
   const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  useEffect(()=>{
  if(!loading && user){
      navigate("/")
  }
  },[user , loading , navigate])
 



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
    <div className='h-screen w-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-3 scrollbar-hide overflow-hidden'>
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-sm relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-white/10 overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-5 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg mb-3 shadow-lg shadow-red-600/20">
                <span className="text-white font-bold text-base">→</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed">Sign in to your account to continue exploring</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {/* Email Input */}
              <div className="group">
                <label htmlFor="email" className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-white/10 transition duration-300 backdrop-blur-sm text-sm"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:via-red-600/5 group-hover:to-red-600/0 transition duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-white/10 transition duration-300 backdrop-blur-sm text-sm"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:via-red-600/5 group-hover:to-red-600/0 transition duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a href="#" className="text-xs text-gray-400 hover:text-red-400 transition duration-300 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-lg transition duration-500 transform hover:scale-105 active:scale-100 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 text-sm tracking-wide mt-4"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 flex items-center gap-2">
              <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
            </div>

            {/* Switch to Register */}
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                Don't have an account?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-red-400 hover:text-red-300 font-bold transition duration-300 relative group"
                >
                  Create one
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login