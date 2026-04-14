import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)


   const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
    const navigate = useNavigate();

  useEffect(()=>{
  if(!loading && user){
      navigate("/")
  }
  },[user , loading , navigate])
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950 to-gray-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Toggle Tabs */}
        <div className="mb-8 flex gap-2 bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              isLogin
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/50'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              !isLogin
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/50'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container with smooth transition */}
        <div className="transition-all duration-500 ease-in-out">
          {isLogin ? (
            <Login onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <Register onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>© 2026 Perplexity. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Auth
