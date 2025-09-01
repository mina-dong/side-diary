/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",          // Vite의 루트 html
    "./src/**/*.{js,ts,jsx,tsx}",  // src 폴더 내 JS/TS/JSX/TSX 파일 모두 탐색
  ],
  theme: {
    extend: {},
  },
  // //tailwind는 동적 안되서 이렇게 설정을 해야한다... - 코드 수정으로 주석처리
   safelist: [
  //       // 배경색
        'bg-red-100',
        'bg-yellow-100',
        'bg-green-100',
        'bg-blue-100',
        'bg-purple-100',

        // 'bg-red-300',
        // 'bg-yellow-300',
        // 'bg-green-300',
        // 'bg-blue-300',
        // 'bg-purple-300',

  //       // 타이틀 색상
  //       'text-red-800',
  //       'text-yellow-800',
  //       'text-green-800',
  //       'text-blue-800',
  //       'text-purple-800',
  //       'text-gray-800',
    ],
  plugins: [],
}

