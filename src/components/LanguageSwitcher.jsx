import React, { useState, useRef, useEffect } from 'react'
import { useLang } from '../context/LangContext.jsx'

export default function LanguageSwitcher({ variant = 'app' }) {
  const { lang, setLang, languages } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="lang-select" ref={ref}>
      <button className="lang-btn" onClick={() => setOpen((o) => !o)}>
        <span>{languages[lang].label}</span> ▾
      </button>
      {open && (
        <div className="lang-menu open">
          {Object.entries(languages).map(([code, l]) => (
            <div
              key={code}
              className={`lang-option${code === lang ? ' active' : ''}`}
              onClick={() => { setLang(code); setOpen(false) }}
            >
              <span>{l.name}</span>
              <small>{l.label}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
