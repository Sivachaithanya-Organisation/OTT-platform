import React, { useEffect, useState, useCallback } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../api.js'
import Navbar from '../components/Navbar.jsx'
import PosterShelf from '../components/PosterShelf.jsx'
import ShowModal from '../components/ShowModal.jsx'

export default function Home() {
  const { t } = useLang()
  const { token, guest } = useAuth()
  const [shows, setShows] = useState([])
  const [watchlistIds, setWatchlistIds] = useState(new Set())
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const all = await api.shows()
    let ids = new Set()
    if (token) {
      const wl = await api.watchlist(token)
      ids = new Set(wl.map((s) => s.id))
    }
    setShows(all.map((s) => ({ ...s, in_watchlist: ids.has(s.id) })))
    setWatchlistIds(ids)
    setLoading(false)
  }, [token])

  useEffect(() => { load() }, [load])

  const toggleList = async (show) => {
    if (!token) return
    const res = await api.toggleWatchlist(show.id, token)
    setShows((prev) => prev.map((s) => (s.id === show.id ? { ...s, in_watchlist: res.in_watchlist } : s)))
    setActive((prev) => (prev && prev.id === show.id ? { ...prev, in_watchlist: res.in_watchlist } : prev))
  }

  if (loading) {
    return (
      <div id="app" className="visible">
        <Navbar />
        <div className="loading-state">{t('loading')}</div>
      </div>
    )
  }

  const top10 = shows.filter((s) => s.shelf === 'top10').sort((a, b) => (a.rank || 99) - (b.rank || 99))
  const newShows = shows.filter((s) => s.shelf === 'new')
  const because = shows.filter((s) => s.shelf === 'because')
  const myList = shows.filter((s) => s.in_watchlist)
  const hero = top10[0]

  return (
    <div id="app" className="visible">
      <Navbar />

      {hero && (
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-badge">{t('hero_badge')}</div>
            <h1 className="hero-title">{hero.title}</h1>
            <div className="hero-meta">
              <span>{hero.year}</span><span className="dot" />
              <span>{hero.seasons} Season{hero.seasons > 1 ? 's' : ''}</span><span className="dot" />
              <span>{hero.genre}</span><span className="dot" />
              <span>{hero.rating}</span>
            </div>
            <p className="hero-desc">{hero.synopsis}</p>
            <div className="hero-actions">
              <button className="btn-play"><span>▶</span> {t('play')}</button>
              <button className="btn-info" onClick={() => setActive(hero)}>{t('more_info')}</button>
            </div>
          </div>
        </section>
      )}

      <main className="shelves">
        {!guest && (
          <PosterShelf
            title={t('nav_mylist')}
            count={myList.length ? `${myList.length}` : ''}
            shows={myList.length ? myList : []}
            onOpen={setActive}
          />
        )}
        {!guest && myList.length === 0 && (
          <p className="empty-hint">{t('my_list_empty')}</p>
        )}
        <PosterShelf title={t('shelf_top10')} count={`${top10.length}`} shows={top10} onOpen={setActive} />
        <PosterShelf title={t('shelf_new')} count={`${newShows.length}`} shows={newShows} onOpen={setActive} />
        <PosterShelf title={t('shelf_because')} count={`${because.length}`} shows={because} onOpen={setActive} />
      </main>

      <footer>{t('footer_text')}</footer>

      <ShowModal show={active} onClose={() => setActive(null)} onToggleList={toggleList} canList={!guest} />
    </div>
  )
}
