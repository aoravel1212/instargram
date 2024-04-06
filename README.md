# ☆Instargram
[Instargram 바로가기](https://instargram.vercel.app/)<br>
인스타그램을 클론코딩한 웹 사이트입니다.<br>

Next.js와 TypeScript를 기반으로 구축되었으며,<br>
사용자 인증은 NextAuth.js를 통해 이메일 및 구글 OAuth를 지원합니다.<br>
클라이언트 상태관리에는 React Context API, 서버 상태관리에는 SWR을 활용하였습니다.<br>
UI 디자인은 TailwindCSS를 통해 스타일링 되었습니다.<br>

<br>

## ⚒️ Stack
- TypeScript
- React
- Next.js
- NextAuth.js
- SWR
- TailwindCSS
- Sanity
- Vercel

<br>

## 📍 주요 기능
**1. 로그인 (/auth/signin)**
  - NextAuth.js 라이브러리를 이용하여 Email 인증 로그인과 Google OAuth 로그인 기능 구현
  - 따로 회원가입을 하지 않아도 이메일이나 구글로 인증을 하면 사이트 이용 가능
  - Email 로그인과 Google 로그인은 사용하는 메일 주소가 같다면, 하나의 유저로 관리됨

**2. 홈 화면 (/)**
  - Navbar와 팔로우 중인 유저의 게시글과 유저 자신의 게시글을 렌더링
  - Navbar에서 로그아웃 및 게시글 작성, 유저 검색 페이지로 이동 가능
  - 그 외 게시글 읽기・수정・삭제 및 좋아요・북마크, 댓글 작성 기능 구현

**3. 유저 검색 (/search)**
  - 검색하지 않은 상태에서는 모든 유저들이 화면에 렌더링됨
  - 아이디 또는 사용자 이름을 기준으로 필터링 (대소문자 구별X)
  - 클릭 시 해당 유저 페이지로 이동

**5. 유저 페이지 (/user/[username])**
  - 리액트의 Cache API 사용함으로써, 동일한 유저에 대한 요청이 반복될 때 캐시된 데이터를 반환하여 성능을 향상시킴
  - 반응형 디자인을 위해 grid를 활용하고, 게시글이 한 행에 세 개의 열씩 배치되도록 구현함
  - 게시글 렌더링 부분에 있어서 유저가 작성한 글, 좋아요한 글, 북마크한 글 세가지로 필터링 되도록 구현

**6. SEO 최적화**
  - 페이지의 제목과 설명과 같은 메타데이터를 동적으로 생성하여 검색 엔진 최적화(SEO)를 향상

<br>


## 🧑🏻‍💻 Start
```bash
npm install
npm run dev
```
