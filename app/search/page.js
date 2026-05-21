'use client'
import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import Toast from '@/components/Toast'
import styles from './search.module.css'

const MOCK_RESULTS = [
  { title: 'Karma Police', artist: 'Radiohead', album: 'OK Computer', duration: '4:21', coverClass: 'c1', emoji: '🎸', genre: '인디록', level: '중급' },
  { title: 'Creep', artist: 'Radiohead', album: 'Pablo Honey', duration: '3:56', coverClass: 'c3', emoji: '🎼', genre: '얼터너티브', level: '입문' },
  { title: 'Skinny Love', artist: 'Bon Iver', album: 'For Emma', duration: '3:58', coverClass: 'c5', emoji: '🌿', genre: '포크', level: '입문' },
  { title: '천천히', artist: '혁오', album: '23', duration: '3:24', coverClass: 'c2', emoji: '🎵', genre: '인디록', level: '입문' },
  { title: 'Fake Plastic Trees', artist: 'Radiohead', album: 'The Bends', duration: '4:50', coverClass: 'c4', emoji: '🎶', genre: '얼터너티브', level: '중급' },
  { title: 'Holocene', artist: 'Bon Iver', album: 'Bon Iver', duration: '5:36', coverClass: 'c6', emoji: '🍂', genre: '포크', level: '중급' },
  { title: 'Exit Music', artist: 'Radiohead', album: 'OK Computer', duration: '4:24', coverClass: 'c1', emoji: '🎸', genre: '인디록', level: '고급' },
  { title: 'Skinny Love (Live)', artist: 'Bon Iver', album: 'Live', duration: '4:02', coverClass: 'c5', emoji: '🌿', genre: '포크', level: '중급' },
]

const TRENDING = ['Radiohead', 'Bon Iver', '혁오', 'The 1975', 'Sigur Rós', 'Explosions in the Sky', '술탄 오브 더 디스코', 'No Reply']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [playing, setPlaying] = useState(null)
  const [toast, setToast] = useState({ msg: '', visible: false })

  function showToast(msg) {
    setToast({ msg, visible: true })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2200)
  }

  function doSearch(q) {
    if (!q.trim()) return
    setQuery(q)
    setSearched(true)
  }

  const results = searched
    ? MOCK_RESULTS.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.artist.toLowerCase().includes(query.toLowerCase()) ||
        s.genre.includes(query)
      ).concat(MOCK_RESULTS).slice(0, 8)
    : []

  return (
    <div className={styles.wrap}>
      <div className={styles.app}>
        {/* Status Bar */}
        <div className={styles.statusbar}>
          <span className={styles.time}>{new Date().getHours().toString().padStart(2,'0')}:{new Date().getMinutes().toString().padStart(2,'0')}</span>
          <div className={styles.icons}><span>📶</span><span>🔋</span></div>
        </div>

        <div className={styles.scrollArea}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>검색</h1>
          </div>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.input}
              placeholder="곡, 아티스트, 장르 검색..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch(query)}
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => { setQuery(''); setSearched(false) }}>✕</button>
            )}
          </div>

          {!searched ? (
            <>
              {/* Trending */}
              <div className={styles.section}>
                <div className={styles.sectionTitle}>🔥 인기 검색어</div>
                <div className={styles.trendingList}>
                  {TRENDING.map((t, i) => (
                    <div key={i} className={styles.trendItem} onClick={() => doSearch(t)}>
                      <span className={styles.trendRank}>{i + 1}</span>
                      <span className={styles.trendName}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className={styles.section}>
                <div className={styles.sectionTitle}>장르 탐색</div>
                <div className={styles.catGrid}>
                  {[
                    { name: '인디록', emoji: '🎸', cls: 'c1' },
                    { name: '포스트록', emoji: '🎼', cls: 'c3' },
                    { name: '포크', emoji: '🌿', cls: 'c5' },
                    { name: '얼터너티브', emoji: '🎵', cls: 'c2' },
                    { name: '재즈', emoji: '🎷', cls: 'c6' },
                    { name: '메탈', emoji: '🤘', cls: 'c4' },
                  ].map((c, i) => (
                    <div key={i} className={`${styles.catCard} ${c.cls}`} onClick={() => doSearch(c.name)}>
                      <span className={styles.catEmoji}>{c.emoji}</span>
                      <span className={styles.catName}>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.results}>
              <div className={styles.resultsMeta}>"{query}" 검색 결과 {results.length}곡</div>
              {results.map((song, i) => (
                <div key={i} className={`${styles.resultItem} ${playing === i ? styles.playing : ''}`}
                  onClick={() => { setPlaying(i); showToast('▶ ' + song.title) }}>
                  <div className={`${styles.cover} ${song.coverClass}`}>
                    {playing === i ? (
                      <div className={styles.bars}>
                        <div className={styles.bar}/><div className={styles.bar}/><div className={styles.bar}/>
                      </div>
                    ) : song.emoji}
                  </div>
                  <div className={styles.info}>
                    <div className={styles.songTitle}>{song.title}</div>
                    <div className={styles.songSub}>{song.artist} · {song.album}</div>
                  </div>
                  <div className={styles.right}>
                    <span className={`${styles.pill} ${song.level === '입문' ? styles.green : ''}`}>{song.level}</span>
                    <span className={styles.duration}>{song.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ height: 100 }} />
        </div>

        <BottomNav active="search" onChange={() => {}} onToast={showToast} />
        <Toast message={toast.msg} visible={toast.visible} />
      </div>
    </div>
  )
}
