'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import MiniPlayer from '@/components/MiniPlayer'
import BottomNav from '@/components/BottomNav'
import Toast from '@/components/Toast'
import Onboarding from '@/components/Onboarding'
import styles from './page.module.css'

const SONGS = [
  { title: 'Karma Police', artist: 'Radiohead', coverClass: 'c1', emoji: '🎸', genre: '인디록', level: '중급' },
  { title: 'Skinny Love', artist: 'Bon Iver', coverClass: 'c5', emoji: '🌿', genre: '포크', level: '입문' },
  { title: '천천히', artist: '혁오', coverClass: 'c2', emoji: '🎵', genre: '인디록', level: '입문' },
  { title: 'Exit Music (For a Film)', artist: 'Radiohead', coverClass: 'c4', emoji: '🎶', genre: '인디록', level: '중급' },
  { title: 'Motion Picture Soundtrack', artist: 'Radiohead', coverClass: 'c3', emoji: '🎼', genre: '포스트록', level: '고급' },
  { title: 'Holocene', artist: 'Bon Iver', coverClass: 'c6', emoji: '🍂', genre: '포크', level: '중급' },
]

const GENRES = ['전체', '인디록', '포스트록', '얼터너티브', '포크', '재즈', '블루스', '메탈']

const ALBUMS = [
  { title: 'OK Computer', artist: 'Radiohead', coverClass: 'c1', emoji: '🎸', songs: 12 },
  { title: 'For Emma', artist: 'Bon Iver', coverClass: 'c5', emoji: '🌿', songs: 9 },
  { title: '23', artist: '혁오', coverClass: 'c2', emoji: '🎵', songs: 10 },
  { title: 'In Rainbows', artist: 'Radiohead', coverClass: 'c3', emoji: '🎼', songs: 10 },
]

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [mode, setMode] = useState('player') // 'player' | 'listener'
  const [activeNav, setActiveNav] = useState('home')
  const [currentSong, setCurrentSong] = useState(SONGS[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(28)
  const [activeGenre, setActiveGenre] = useState('전체')
  const [toast, setToast] = useState({ msg: '', visible: false })
  const timerRef = useRef(null)
  const toastTimerRef = useRef(null)

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress(p => (p + 0.2) % 100)
      }, 100)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isPlaying])

  function showToast(msg) {
    clearTimeout(toastTimerRef.current)
    setToast({ msg, visible: true })
    toastTimerRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2200)
  }

  function playSong(song) {
    setCurrentSong(song)
    setIsPlaying(true)
    setProgress(0)
    showToast('▶ ' + song.title)
  }

  function onPrev() {
    const idx = SONGS.indexOf(currentSong)
    playSong(SONGS[(idx - 1 + SONGS.length) % SONGS.length])
  }

  function onNext() {
    const idx = SONGS.indexOf(currentSong)
    playSong(SONGS[(idx + 1) % SONGS.length])
  }

  function onboardingComplete({ type, genres, startSong }) {
    if (type === 'listener') setMode('listener')
    if (startSong) {
      const parts = startSong.split(' — ')
      const found = SONGS.find(s => s.title === parts[0])
      if (found) playSong(found)
    }
    setShowOnboarding(false)
  }

  const router = useRouter()
  const isPlayerMode = mode === 'player'

  function handleNav(id) {
    if (id === 'search') { router.push('/search'); return }
    setActiveNav(id)
  }

  return (
    <div className={styles.app}>
      {showOnboarding && <Onboarding onComplete={onboardingComplete} />}

      <div className={styles.scrollArea}>
        {/* Status Bar */}
        <div className={styles.statusbar}>
          <span className={styles.statusTime}>{new Date().getHours().toString().padStart(2,'0')}:{new Date().getMinutes().toString().padStart(2,'0')}</span>
          <div className={styles.statusIcons}>
            <span>📶</span><span>🔋</span>
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.greeting}>{isPlayerMode ? '안녕하세요, 준서님 👋' : '안녕하세요, 서연님 👋'}</div>
            <div className={styles.logo}>BAND.</div>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.iconBtn} onClick={() => showToast('🔔 알림')}>🔔</button>
            <button className={styles.iconBtn} onClick={() => showToast('⚙️ 설정')}>⚙️</button>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className={styles.modeToggle}>
          <button className={`${styles.modeBtn} ${isPlayerMode ? styles.active : ''}`} onClick={() => { setMode('player'); showToast('🎸 연주자 모드') }}>
            🎸 연주자
          </button>
          <button className={`${styles.modeBtn} ${!isPlayerMode ? styles.active : ''}`} onClick={() => { setMode('listener'); showToast('🎧 감상자 모드') }}>
            🎧 감상자
          </button>
        </div>

        {/* Hero */}
        <div className={styles.hero} onClick={() => showToast(isPlayerMode ? '🎸 연습 시작!' : '▶ 재생 시작!')}>
          <div className={styles.heroBg} />
          <div className={styles.heroGlow} />
          <div className={styles.heroGlow2} />
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>{isPlayerMode ? '✨ 오늘의 연습' : '🎧 오늘의 무드'}</div>
            <div className={styles.heroTitle}>
              {isPlayerMode ? <><span>오늘 연습할 곡</span><br/><span>3분 안에 찾아볼까요?</span></> : <><span>지금 기분에 딱 맞는</span><br/><span>플레이리스트 준비됐어요</span></>}
            </div>
            <div className={styles.heroSub}>{isPlayerMode ? '인디록 · 포스트록 기타 중심 추천' : '인디록 · 포스트록 무드 자동 생성'}</div>
            <div className={styles.heroCta}>
              <div className={styles.heroCtaBtn}>{isPlayerMode ? '연습 시작' : '바로 재생'} →</div>
              <div className={styles.heroCount}>{isPlayerMode ? '추천 23곡' : '3개 플레이리스트'}</div>
            </div>
          </div>
        </div>

        {/* Genre Chips */}
        <div className={styles.chipScroll}>
          {GENRES.map(g => (
            <div key={g} className={`${styles.chip} ${activeGenre === g ? styles.chipActive : ''}`} onClick={() => { setActiveGenre(g); showToast('🎵 ' + g) }}>
              {g}
            </div>
          ))}
        </div>

        {/* Recommended Albums */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>{isPlayerMode ? '기타 연습 추천' : '취향 기반 추천'}</span>
            <span className={styles.sectionMore} onClick={() => showToast('전체 보기')}>전체 보기</span>
          </div>
          <div className={styles.cardScroll}>
            {ALBUMS.map((a, i) => (
              <div key={i} className={styles.card} onClick={() => showToast('💿 ' + a.title)}>
                <div className={`${styles.cardCover} ${a.coverClass}`}>{a.emoji}</div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardTitle}>{a.title}</div>
                  <div className={styles.cardSub}>{a.artist}</div>
                  <div className={styles.cardMeta}>{a.songs}곡</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playlists */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>{isPlayerMode ? '나 같은 연주자 플레이리스트' : '비슷한 취향의 플레이리스트'}</span>
            <span className={styles.sectionMore} onClick={() => showToast('전체 보기')}>전체 보기</span>
          </div>
          <div className={styles.cardScroll}>
            {[
              { title: '인디록 기타 필수곡 50', emoji: '🎸', count: 50, coverClass: 'c1' },
              { title: '포크 감성 모음', emoji: '🌿', count: 32, coverClass: 'c5' },
              { title: '혁오 & 국내 인디', emoji: '🎵', count: 28, coverClass: 'c2' },
              { title: '포스트록 명작선', emoji: '🎼', count: 41, coverClass: 'c3' },
            ].map((pl, i) => (
              <div key={i} className={styles.card} onClick={() => showToast('▶ ' + pl.title)}>
                <div className={`${styles.cardCover} ${pl.coverClass}`}>{pl.emoji}</div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardTitle}>{pl.title}</div>
                  <div className={styles.cardSub}>플레이리스트</div>
                  <div className={styles.cardMeta}>{pl.count}곡</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Songs */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>최근 재생</span>
            <span className={styles.sectionMore} onClick={() => showToast('전체 보기')}>전체 보기</span>
          </div>
          <div className={styles.songList}>
            {SONGS.map((song, i) => {
              const isNow = currentSong.title === song.title
              return (
                <div key={i} className={`${styles.slItem} ${isNow ? styles.slActive : ''}`} onClick={() => playSong(song)}>
                  <div className={`${styles.slCover} ${song.coverClass}`}>
                    {isNow && isPlaying ? (
                      <div className={styles.bars}>
                        <div className={styles.bar} />
                        <div className={styles.bar} />
                        <div className={styles.bar} />
                      </div>
                    ) : song.emoji}
                  </div>
                  <div className={styles.slInfo}>
                    <div className={styles.slTitle}>{song.title}</div>
                    <div className={styles.slSub}>{song.artist} · {song.genre}</div>
                  </div>
                  <div className={styles.slActions}>
                    <span className={`${styles.pill} ${song.level === '입문' ? styles.pillGreen : ''}`}>{song.level}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>

      <div onClick={() => router.push('/player')} style={{cursor:'pointer'}}>
        <MiniPlayer
          song={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          onTogglePlay={(e) => { e.stopPropagation(); setIsPlaying(p => !p) }}
          onPrev={(e) => { e.stopPropagation(); onPrev() }}
          onNext={(e) => { e.stopPropagation(); onNext() }}
        />
      </div>

      <BottomNav active={activeNav} onChange={handleNav} onToast={showToast} />

      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  )
}
