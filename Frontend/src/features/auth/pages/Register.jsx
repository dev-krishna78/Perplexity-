import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })


    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    const navigate = useNavigate()


    useEffect(()=>{
      if(!loading && user){
        navigate("/")
      }
    },[user, loading, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    setFormData({ username: '', email: '', password: '' })
  }

  return (
    <div className='h-screen w-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-3 scrollbar-hide overflow-hidden'>
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-red-600/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-sm relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-white/10 overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-5 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg mb-3 shadow-lg shadow-red-600/20">
                <span className="text-white font-bold text-base">✨</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">
                Create Account
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed">Join us and start exploring amazing features</p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Username Input */}
              <div className="group">
                <label htmlFor="username" className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="john_doe"
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-white/10 transition duration-300 backdrop-blur-sm text-sm"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:via-red-600/5 group-hover:to-red-600/0 transition duration-300 pointer-events-none"></div>
                </div>
              </div>

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

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 bg-white/5 border border-white/20 rounded accent-red-500 cursor-pointer transition duration-300 hover:border-red-500/50 mt-0.5"
                />
                <label htmlFor="terms" className="text-xs text-gray-400 leading-tight cursor-pointer hover:text-gray-300 transition duration-300">
                  I agree to the{' '}
                  <a href="#" className="text-red-400 hover:text-red-300 font-semibold transition duration-300">
                    Terms & Conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-lg transition duration-500 transform hover:scale-105 active:scale-100 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 text-sm tracking-wide mt-4"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 flex items-center gap-2">
              <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
            </div>

            {/* Switch to Login */}
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-red-400 hover:text-red-300 font-bold transition duration-300 relative group"
                >
                  Sign in here
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

export default Register