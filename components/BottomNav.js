'use client'
import styles from './BottomNav.module.css'

const navItems = [
  { icon: '🏠', label: '홈', id: 'home' },
  { icon: '🔍', label: '탐색', id: 'search' },
  { icon: null, label: '연주', id: 'play', center: true },
  { icon: '📚', label: '보관함', id: 'library' },
  { icon: '👤', label: '프로필', id: 'profile' },
]

export default function BottomNav({ active, onChange, onToast }) {
  return (
    <nav className={styles.nav}>
      {navItems.map(item =>
        item.center ? (
          <div key={item.id} className={styles.center} onClick={() => onToast('🎸 연주 모드!')}>
            <div className={styles.centerBtn}>🎸</div>
            <span className={styles.centerLabel}>연주</span>
          </div>
        ) : (
          <div
            key={item.id}
            className={`${styles.item} ${active === item.id ? styles.active : ''}`}
            onClick={() => onChange(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        )
      )}
    </nav>
  )
}
