/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",          // Vite의 루트 html
    "./src/**/*.{js,ts,jsx,tsx}",  // src 폴더 내 JS/TS/JSX/TSX 파일 모두 탐색
  ],
  theme: {
    extend: {},
  },
  //tailwind는 동적 안되서 이렇게 설정을 해야한다...
   safelist: [
        'bg-red-100',
        'bg-yellow-100',
        'bg-green-100',
        'bg-blue-100',
        'bg-purple-100',
        'bg-red-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-blue-200',
        'bg-purple-200',
    ],
  plugins: [],
}

