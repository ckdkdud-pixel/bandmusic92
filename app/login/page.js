'use client'
import styles from './login.module.css'

export default function LoginPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.app}>
        {/* Status Bar */}
        <div className={styles.statusbar}>
          <span className={styles.time}>
            {new Date().getHours().toString().padStart(2,'0')}:{new Date().getMinutes().toString().padStart(2,'0')}
          </span>
          <div className={styles.icons}><span>📶</span><span>🔋</span></div>
        </div>

        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.logoWrap}>
            <div className={styles.logoIcon}>🎸</div>
            <div className={styles.logo}>BAND.</div>
            <div className={styles.logoSub}>밴드 음악 특화 플레이어</div>
          </div>

          {/* Features */}
          <div className={styles.features}>
            {[
              { icon: '🎸', text: '연주자를 위한 악보 & 연습 추천' },
              { icon: '🎧', text: '감상자를 위한 무드 플레이리스트' },
              { icon: '🔍', text: '밴드 음악 특화 검색' },
            ].map((f, i) => (
              <div key={i} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span className={styles.featureText}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Login Buttons */}
          <div className={styles.buttons}>
            <a href="/" className={styles.googleBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 계속하기
            </a>

            <div className={styles.divider}><span>또는</span></div>

            <a href="/" className={styles.emailBtn}>
              이메일로 로그인
            </a>

            <a href="/" className={styles.signupBtn}>
              이메일로 회원가입
            </a>
          </div>

          <div className={styles.terms}>
            가입하면 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 동의하는 것으로 간주됩니다
          </div>
        </div>
      </div>
    </div>
  )
}
