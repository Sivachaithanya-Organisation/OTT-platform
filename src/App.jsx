import React from 'react'
import { useAuth } from './context/AuthContext.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  const { isAuthed } = useAuth()
  return isAuthed ? <Home /> : <Login />
}
