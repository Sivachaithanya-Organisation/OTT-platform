import React from 'react'
import { useLang } from '../context/LangContext.jsx'

export default function ShowModal({ show, onClose, onToggleList, canList }) {
  const { t } = useLang()
  if (!show) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}
           style={{ '--c1': show.color_a, '--c2': show.color_b }}>
        <div className="modal-art" />
        <div className="modal-body">
          <span className="poster-genre">{show.genre} · {show.year} · {show.rating}</span>
          <h2>{show.title}</h2>
          <p>{show.synopsis}</p>
          <div className="modal-actions">
            <button className="btn-play"><span>▶</span> {t('play')}</button>
            {canList && (
              <button className="btn-info" onClick={() => onToggleList(show)}>
                {show.in_watchlist ? t('remove_list') : t('add_list')}
              </button>
            )}
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  )
}
