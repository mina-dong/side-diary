// componets/Header.jsx

import React, { useState } from 'react';
import WriteModal from '../pages/WriteModal';

const Header = ({ isLoggedIn, userNickname, fetchDiaries }) => {
  const [showModal, setShowModal] = useState(false);
  const [fortuneText, setFortuneText] = useState(""); // 운세 내용

  const handleFortune = () => {
    const fortunes = [
      "킹왕짱을 선사합니다 😄",
      "이제 그만 눌러 ... ",
      "✨ 이걸 찾아내다니! 행운이 찾아올지도?",
      "🍀 오늘은 짜파게티 요리사",
      "붐업 두개 드림 😎"
    ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortuneText(randomFortune);
  };

  // 로그아웃 함수: 토큰/닉네임 삭제 후 새로고침 또는 리다이렉트
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userNickname');
    window.location.href = '/'; // 홈으로 이동(새로고침)
  };

  const handleWrite = () => {
    setShowModal(true);
  };

  const buttonClass = "flex items-center space-x-2 px-4 py-2 bg-orange-200 text-orange-700 rounded-full shadow-md hover:bg-orange-300 hover:text-orange-800 transition-colors duration-200";

  return (
    <header className="main-header">
      <div className="header-container ">
        <h1 className='text-5xl font-bold text-cyan-800 font-handwriting'>방명록</h1>

        <nav >
          <ul class="flex flex-col items-center space-x-4 mb-8">
            {isLoggedIn ? (
              <>
                <li className="text-gray-600 p-4"><span> 방가방가, {userNickname}!</span></li>
                {/* 운세 */}
                {fortuneText && (
                  <li id="fortune" className="text-center text-gray-600 mt-2">
                    {fortuneText}
                  </li>)}

                <br />
                <li className="flex space-x-2"><button onClick={handleWrite} className={buttonClass}>
                  <svg className='h-4 w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6Z" fill="#000000" /></svg>
                </button>

                  <button onClick={handleLogout} className={buttonClass}>
                    <svg className='h-4 w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3h16v4h-2V5H5v14h14v-2h2v4H3V3h2zm16 8h-2V9h-2V7h-2v2h2v2H7v2h10v2h-2v2h2v-2h2v-2h2v-2z" fill="#000000" />
                    </svg>
                  </button>


                  <button onClick={handleFortune} className={buttonClass}>
                    <svg className='h-4 w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3h16v2H5v14h14v2H3V3zm18 0h-2v18h2V3zM11 15h2v2h-2v-2zm2-8h-2v6h2V7z" fill="#000000" />
                    </svg>
                  </button>


                </li>
              </>
            ) : (
              <ul className="flex space-x-2 mt-6">
                <li ><a className={buttonClass} href='/login'>
                  <svg className='h-4 w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3H3v4h2V5h14v14H5v-2H3v4h18V3H5zm12 8h-2V9h-2V7h-2v2h2v2H3v2h10v2h-2v2h2v-2h2v-2h2v-2z" fill="#000000" />
                  </svg></a></li>


                <li><a className={buttonClass} href="/register">
                  <svg className='h-4 w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-6v2h-2v6h2V4h6V2zm0 8h-6v2h6v-2zm0-6h2v6h-2V4zM7 16h2v-2h12v2H9v4h12v-4h2v6H7v-6zM3 8h2v2h2v2H5v2H3v-2H1v-2h2V8z" fill="#000000" />
                  </svg></a></li>
              </ul>
            )}

          </ul>
        </nav>
        {showModal && <WriteModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchDiaries} />}
      </div>
    </header>
  );
};

export default Header;