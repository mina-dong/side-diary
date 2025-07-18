/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",          // Vite의 루트 html
    "./src/**/*.{js,ts,jsx,tsx}",  // src 폴더 내 JS/TS/JSX/TSX 파일 모두 탐색
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

