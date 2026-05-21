# BAND. — 밴드 음악 특화 앱

밴드 음악 특화 플레이어 앱입니다. Next.js로 만들어졌으며 Vercel에 바로 배포할 수 있습니다.

## 🚀 Vercel 배포 방법

### 방법 1: Vercel CLI (권장)

```bash
# 1. 의존성 설치
npm install

# 2. Vercel CLI 설치
npm i -g vercel

# 3. 배포
vercel

# 4. 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub + Vercel 연동

1. 이 폴더를 GitHub 레포지토리에 올리기
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/band-app.git
   git push -u origin main
   ```

2. [vercel.com](https://vercel.com) 에서 "New Project" 클릭
3. GitHub 레포지토리 연결
4. 배포 완료! ✅

## 💻 로컬 개발

```bash
npm install
npm run dev
# http://localhost:3000 에서 확인
```

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS Modules
- **Deployment**: Vercel

## 📱 주요 기능

- 연주자 / 감상자 모드 전환
- 온보딩 플로우 (유형 선택 → 장르 선택 → 시작 곡 선택)
- 미니 플레이어 (재생/일시정지/이전/다음)
- 장르 필터 칩
- 앨범 & 플레이리스트 추천
- 하단 네비게이션 바
