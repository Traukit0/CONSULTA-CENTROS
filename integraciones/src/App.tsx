"use client"

import { useState } from "react"
import LoginForm from "./components/LoginForm"
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    // You could also redirect to another page here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {isLoggedIn ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700">Welcome to the Dashboard</h1>
          <p className="text-gray-600 mt-2">You are now logged in!</p>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Log Out
          </button>
        </div>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App
