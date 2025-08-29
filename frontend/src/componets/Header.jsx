// componets/Header.jsx

import React from 'react';

const Header = ({ isLoggedIn, userNickname }) => {
  return (
    <header className="main-header">
      <div className="header-container">
        <h1>나의 일기장</h1>

        <nav>
          <ul>
            {isLoggedIn ? (
                <>
                <li><span> 방가방가, {userNickname} 님!</span></li>
                <li><a href='/logout'>로그아웃</a></li>
                </>
                ) : (
                    <>
                    <li><a href="/login">로그인</a></li>
                    <li><a href="/register">회원가입</a></li>
                    </>
            )}

          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;