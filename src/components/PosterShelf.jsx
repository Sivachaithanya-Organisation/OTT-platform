import React, { useRef } from 'react'
import Poster from './Poster.jsx'

export default function PosterShelf({ title, count, shows, onOpen }) {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }

  if (!shows.length) return null

  return (
    <div className="shelf">
      <div className="shelf-head">
        <div className="shelf-title">{title}</div>
        <div className="shelf-count">{count}</div>
      </div>
      <div className="shelf-track-wrap">
        <button className="scroll-btn scroll-left" onClick={() => scroll(-1)}>‹</button>
        <div className="shelf-track" ref={trackRef}>
          {shows.map((show) => (
            <Poster key={show.id} show={show} onOpen={onOpen} />
          ))}
        </div>
        <button className="scroll-btn scroll-right" onClick={() => scroll(1)}>›</button>
      </div>
    </div>
  )
}
