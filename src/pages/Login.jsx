import React, { useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'

export default function Login() {
  const { t } = useLang()
  const { login, register, continueAsGuest } = useAuth()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'signin') {
        await login(email, password)
      } else {
        await register(email, name, password)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div id="login-screen">
      <div className="backdrop-collage">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} style={{
            '--tile-a': ['#5b3ce0', '#0e7c86', '#7c1f3d', '#8a6d1f', '#3f2a86', '#1f3a5f'][i % 6],
            '--tile-b': ['#241455', '#0a2e33', '#2b0a15', '#2e2508', '#160c33', '#0a1420'][i % 6],
          }} />
        ))}
      </div>

      <div className="login-lang"><LanguageSwitcher /></div>

      <form className="login-card" onSubmit={submit}>
        <div className="brand">
          <div className="brand-mark">V</div>
          <div className="brand-name">VELIN</div>
        </div>
        <h1>{t('login_title')}</h1>
        <p className="sub">{t('login_sub')}</p>

        {mode === 'signup' && (
          <div className="field">
            <label>{t('name_label')}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ada" />
          </div>
        )}
        <div className="field">
          <label>{t('email_label')}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
        </div>
        <div className="field">
          <label>{t('password_label')}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="••••••••" />
        </div>

        {error && <div className="form-error">{error}</div>}

        <button className="btn-primary" type="submit" disabled={busy}>
          {busy ? t('loading') : mode === 'signin' ? t('sign_in') : t('create_account_btn')}
        </button>
        <button type="button" className="btn-ghost" onClick={continueAsGuest}>{t('guest')}</button>

        <div className="login-foot">
          {mode === 'signin' ? (
            <>{t('no_account')} <span onClick={() => setMode('signup')}>{t('create_account')}</span></>
          ) : (
            <>{t('have_account')} <span onClick={() => setMode('signin')}>{t('back_to_sign_in')}</span></>
          )}
        </div>
      </form>
    </div>
  )
}
