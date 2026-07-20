import React, { createContext, useContext, useEffect, useState } from 'react'
import { languages } from '../i18n.js'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    document.documentElement.dir = languages[lang].dir
    document.documentElement.lang = lang
  }, [lang])

  const t = (key) => languages[lang].strings[key] || key

  return (
    <LangContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
