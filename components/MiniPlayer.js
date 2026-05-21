'use client'
import styles from './MiniPlayer.module.css'

export default function MiniPlayer({ song, isPlaying, progress, onTogglePlay, onPrev, onNext }) {
  return (
    <div className={styles.miniPlayer}>
      <div className={`${styles.cover} ${song.coverClass}`}>{song.emoji}</div>
      <div className={styles.info}>
        <div className={styles.title}>{song.title}</div>
        <div className={styles.artist}>{song.artist}</div>
      </div>
      <div className={styles.controls}>
        <button className={styles.btn} onClick={onPrev}>⏮</button>
        <button className={`${styles.btn} ${styles.playBtn}`} onClick={onTogglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className={styles.btn} onClick={onNext}>⏭</button>
      </div>
      <div className={styles.progress}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
