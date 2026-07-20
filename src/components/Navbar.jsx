import React from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Navbar() {
  const { t } = useLang()
  const { user, guest, logout } = useAuth()
  const initial = (user?.display_name || (guest ? 'G' : '?'))[0].toUpperCase()

  return (
    <header className="topnav">
      <div className="nav-left">
        <div className="brand">
          <div className="brand-mark">V</div>
          <div className="brand-name">VELIN</div>
        </div>
        <ul className="nav-links">
          <li><a href="#" className="active">{t('nav_home')}</a></li>
          <li><a href="#">{t('nav_series')}</a></li>
          <li><a href="#">{t('nav_movies')}</a></li>
          <li><a href="#">{t('nav_mylist')}</a></li>
        </ul>
      </div>
      <div className="nav-right">
        <button className="icon-btn" title="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <LanguageSwitcher />
        <button className="avatar" title={t('sign_out')} onClick={logout}>{initial}</button>
      </div>
    </header>
  )
}
