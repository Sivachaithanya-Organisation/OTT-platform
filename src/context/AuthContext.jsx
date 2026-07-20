import React, { createContext, useContext, useState, useCallback } from 'react'
import { api } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('velin_token'))
  const [user, setUser] = useState(null)
  const [guest, setGuest] = useState(false)

  const persist = (tok, usr) => {
    setToken(tok)
    setUser(usr)
    setGuest(false)
    if (tok) localStorage.setItem('velin_token', tok)
  }

  const login = useCallback(async (email, password) => {
    const data = await api.login(email, password)
    persist(data.access_token, data.user)
    return data.user
  }, [])

  const register = useCallback(async (email, displayName, password) => {
    const data = await api.register({ email, display_name: displayName, password })
    persist(data.access_token, data.user)
    return data.user
  }, [])

  const continueAsGuest = useCallback(() => {
    setGuest(true)
    setToken(null)
    setUser(null)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('velin_token')
    setToken(null)
    setUser(null)
    setGuest(false)
  }, [])

  const isAuthed = Boolean(token) || guest

  return (
    <AuthContext.Provider value={{ token, user, guest, isAuthed, login, register, continueAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
