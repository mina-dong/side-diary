// componets/Header.jsx

import React, { useState } from 'react';
import WriteModal from '../pages/WriteModal';

const Header = ({ isLoggedIn, userNickname,  fetchDiaries}) => {
  const [showModal, setShowModal] = useState(false);
    // 로그아웃 함수: 토큰/닉네임 삭제 후 새로고침 또는 리다이렉트
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userNickname');
    window.location.href = '/'; // 홈으로 이동(새로고침)
  };

  const handleWrite = () => {
    setShowModal(true);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <h1>나의 일기장</h1>

        <nav>
          <ul>
            {isLoggedIn ? (
                <>
                <li><span> 방가방가, {userNickname} 님!</span></li>
                <li><button onClick={handleWrite} className="bg-transparent border-none text-blue-500 cursor-pointer">글작성하기</button></li>
                <li><button onClick={handleLogout} className="bg-transparent border-none text-blue-500 cursor-pointer">
                    로그아웃
                  </button></li>
                </>
                ) : (
                    <>
                    <li><a href="/login">로그인</a></li>
                    <li><a href="/register">회원가입</a></li>
                    </>
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