import React from 'react'
import { useLang } from '../context/LangContext.jsx'

export default function Poster({ show, onOpen }) {
  const { t } = useLang()
  const style = { '--c1': show.color_a, '--c2': show.color_b }

  return (
    <div className="poster" style={style} onClick={() => onOpen(show)}>
      <div className="poster-card">
        {show.rank && <div className="poster-rank">{show.rank}</div>}
        <div className="poster-sheen" />
        <div className="poster-info">
          <span className="poster-genre">{show.genre}</span>
          <div className="poster-title">{show.title}</div>
        </div>
        {show.in_watchlist && <div className="poster-badge" title={t('remove_list')}>✓</div>}
      </div>
      <div className="poster-reflection" />
    </div>
  )
}
