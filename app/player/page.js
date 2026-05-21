'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './player.module.css'

const SONGS = [
  { title: 'Karma Police', artist: 'Radiohead', album: 'OK Computer', duration: 261, coverClass: 'c1', emoji: '🎸', genre: '인디록', level: '중급', year: '1997' },
  { title: 'Skinny Love', artist: 'Bon Iver', album: 'For Emma, Forever Ago', duration: 238, coverClass: 'c5', emoji: '🌿', genre: '포크', level: '입문', year: '2007' },
  { title: '천천히', artist: '혁오', album: '23', duration: 204, coverClass: 'c2', emoji: '🎵', genre: '인디록', level: '입문', year: '2016' },
  { title: 'Exit Music (For a Film)', artist: 'Radiohead', album: 'OK Computer', duration: 264, coverClass: 'c4', emoji: '🎶', genre: '인디록', level: '중급', year: '1997' },
  { title: 'Holocene', artist: 'Bon Iver', album: 'Bon Iver', duration: 336, coverClass: 'c6', emoji: '🍂', genre: '포크', level: '중급', year: '2011' },
]

function fmt(s) {
  return `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`
}

export default function PlayerPage() {
  const [idx, setIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(32)
  const [liked, setLiked] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const timerRef = useRef(null)

  const song = SONGS[idx]
  const current = Math.floor(progress / 100 * song.duration)

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { next(); return 0 }
          return p + (100 / song.duration / 10)
        })
      }, 100)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isPlaying, idx])

  function next() {
    setIdx(i => (i + 1) % SONGS.length)
    setProgress(0)
    setIsPlaying(true)
  }

  function prev() {
    setIdx(i => (i - 1 + SONGS.length) % SONGS.length)
    setProgress(0)
    setIsPlaying(true)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.app}>
        {/* Status Bar */}
        <div className={styles.statusbar}>
          <span className={styles.time}>{new Date().getHours().toString().padStart(2,'0')}:{new Date().getMinutes().toString().padStart(2,'0')}</span>
          <div className={styles.icons}><span>📶</span><span>🔋</span></div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <a href="/" className={styles.backBtn}>‹</a>
          <div className={styles.headerTitle}>
            <div className={styles.headerLabel}>재생 중</div>
          </div>
          <button className={styles.moreBtn} onClick={() => {}}>•••</button>
        </div>

        {/* Cover Art */}
        <div className={styles.coverWrap}>
          <div className={`${styles.cover} ${song.coverClass} ${isPlaying ? styles.playing : ''}`}>
            {song.emoji}
          </div>
          <div className={styles.coverGlow + ' ' + song.coverClass} />
        </div>

        {/* Song Info */}
        <div className={styles.songInfo}>
          <div className={styles.songMeta}>
            <div>
              <div className={styles.songTitle}>{song.title}</div>
              <div className={styles.songArtist}>{song.artist} · {song.album}</div>
            </div>
            <button className={`${styles.likeBtn} ${liked ? styles.liked : ''}`} onClick={() => setLiked(l => !l)}>
              {liked ? '♥' : '♡'}
            </button>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>{song.genre}</span>
            <span className={`${styles.tag} ${styles.tagGreen}`}>{song.level}</span>
            <span className={styles.tag}>{song.year}</span>
          </div>
        </div>

        {/* Progress */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar} onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            setProgress(((e.clientX - rect.left) / rect.width) * 100)
          }}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}>
              <div className={styles.progressThumb} />
            </div>
          </div>
          <div className={styles.progressTimes}>
            <span>{fmt(current)}</span>
            <span>{fmt(song.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button className={`${styles.ctrl} ${shuffle ? styles.ctrlActive : ''}`} onClick={() => setShuffle(s => !s)}>⇄</button>
          <button className={styles.ctrlMain} onClick={prev}>⏮</button>
          <button className={styles.ctrlPlay} onClick={() => setIsPlaying(p => !p)}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className={styles.ctrlMain} onClick={next}>⏭</button>
          <button className={`${styles.ctrl} ${repeat ? styles.ctrlActive : ''}`} onClick={() => setRepeat(r => !r)}>↺</button>
        </div>

        {/* Queue */}
        <div className={styles.queue}>
          <div className={styles.queueTitle}>다음 재생</div>
          {SONGS.filter((_, i) => i !== idx).slice(0, 3).map((s, i) => (
            <div key={i} className={styles.queueItem} onClick={() => { setIdx(SONGS.indexOf(s)); setProgress(0); setIsPlaying(true) }}>
              <div className={`${styles.queueCover} ${s.coverClass}`}>{s.emoji}</div>
              <div className={styles.queueInfo}>
                <div className={styles.queueSongTitle}>{s.title}</div>
                <div className={styles.queueArtist}>{s.artist}</div>
              </div>
              <span className={styles.queueDuration}>{fmt(s.duration)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
