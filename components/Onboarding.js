'use client'
import { useState } from 'react'
import styles from './Onboarding.module.css'

const genres = ['인디록','포스트록','얼터너티브','포크','재즈','블루스','메탈','팝록','펑크','클래식록','슈게이징','드림팝']

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [type, setType] = useState(null)
  const [genres_, setGenres] = useState([])

  function toggleGenre(g) {
    if (genres_.includes(g)) {
      setGenres(genres_.filter(x => x !== g))
    } else {
      if (genres_.length >= 3) return
      setGenres([...genres_, g])
    }
  }

  function finish() {
    onComplete({ type, genres: genres_ })
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        {step === 1 && (
          <div className={styles.step}>
            <div className={styles.badge}>👋 환영해요!</div>
            <h2 className={styles.title}>BAND.에 오신 것을<br />환영합니다</h2>
            <p className={styles.sub}>밴드 음악을 위한 특별한 공간이에요</p>
            <div className={styles.typeGrid}>
              <div className={`${styles.typeCard} ${type === 'player' ? styles.selected : ''}`} onClick={() => setType('player')}>
                <div className={styles.typeIcon}>🎸</div>
                <div className={styles.typeLabel}>연주자</div>
                <div className={styles.typeDesc}>악기를 연주하며<br />음악을 배워요</div>
              </div>
              <div className={`${styles.typeCard} ${type === 'listener' ? styles.selected : ''}`} onClick={() => setType('listener')}>
                <div className={styles.typeIcon}>🎧</div>
                <div className={styles.typeLabel}>감상자</div>
                <div className={styles.typeDesc}>밴드 음악을<br />즐겨 들어요</div>
              </div>
            </div>
            <button className={styles.nextBtn} disabled={!type} onClick={() => setStep(2)}>다음</button>
            <button className={styles.skipBtn} onClick={finish}>건너뛰기</button>
          </div>
        )}
        {step === 2 && (
          <div className={styles.step}>
            <div className={styles.badge}>🎵 취향 선택</div>
            <h2 className={styles.title}>좋아하는 장르를<br />골라주세요</h2>
            <p className={styles.sub}>{genres_.length}개 선택됨 (최대 3개)</p>
            <div className={styles.genreGrid}>
              {genres.map(g => (
                <div key={g} className={`${styles.genreChip} ${genres_.includes(g) ? styles.selected : ''}`} onClick={() => toggleGenre(g)}>
                  {g}
                </div>
              ))}
            </div>
            <button className={styles.nextBtn} disabled={genres_.length === 0} onClick={() => setStep(3)}>다음</button>
          </div>
        )}
        {step === 3 && (
          <div className={styles.step}>
            <div className={styles.ahaIcon}>✨</div>
            <h2 className={styles.title}>{type === 'listener' ? '지금 기분에 맞는\n플레이리스트예요' : '오늘 연습할 곡\n준비됐어요!'}</h2>
            <p className={styles.sub}>선택한 장르 기반으로 자동 생성했어요</p>
            <div className={styles.ahaSongs}>
              {['Karma Police — Radiohead','Skinny Love — Bon Iver','천천히 — 혁오'].map(s => (
                <div key={s} className={styles.ahaSong} onClick={() => onComplete({ type, genres: genres_, startSong: s })}>
                  <span className={styles.ahaSongIcon}>🎸</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <button className={styles.nextBtn} onClick={finish}>시작하기</button>
          </div>
        )}
      </div>
    </div>
  )
}
