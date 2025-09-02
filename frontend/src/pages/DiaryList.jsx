import { useEffect, useState } from 'react';
import { deleteDiary, getDiaryList } from '../api/diary';

import DiaryCard from '../componets/DiaryCard';
import Header from '../componets/Header'; // Header 컴포넌트 불러오기
import WriteModal from './WriteModal';

// // 더미데이터
// const dummyDiaries = [
//   {
//     id: 1,
//     title: "첫 번째 일기",
//     content: "오늘은 날씨가 좋았다.",
//     nickname: "민아",
//     createAt: "2025-07-29T12:00:00"
//   },
//   {
//     id: 2,
//     title: "두 번째 일기",
//     content: "리액트 공부 중!",
//     nickname: "민아",
//     createAt: "2025-07-28T15:30:00"
//   }
// ];

function Main() {
  const [diaries, setDiaries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [userNickname, setUserNickname] = useState(localStorage.getItem('userNickname') || '');
  const [currentUserId, setCurrentUserId] = useState(null);

  //일기편집관련
  const [editModal, setEditModal] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);

  //회원로그인/헤더 관련
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const nickname = localStorage.getItem('userNickname');
    const userId = localStorage.getItem('userId');

    //토큰이 존재?
    if (token) {
      setIsLoggedIn(true);
      setUserNickname(nickname);
      setCurrentUserId(Number(userId));
    } else {
      setIsLoggedIn(false);
      setUserNickname('');
      setCurrentUserId(null);
    }
  }, [isLoggedIn]); // isLoggedIn을 의존성 배열에 추가하여 로그인 상태 변경 시 다시 실행
  //의존성 배열을 비워두면, 마운트 되는 순간 한번만 실행되며 초기설정에 적합함.

  // 상태가 바뀔 때마다 값 확인 - 디버그용 로그인 여부 / 닉네임 콘솔 출력
  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    console.log('userNickname:', userNickname);
    console.log('currentUserId:', currentUserId);
  }, [isLoggedIn, userNickname, currentUserId]);

  const fetchDiaries = async () => {
    try {
      const useDummy = false; // api인지 더미인지 선택

      if (useDummy) { setDiaries(dummyDiaries); }
      else {
        const data = await getDiaryList();
        setDiaries(data);
      }
    } catch (err) {
      alert('다이어리 목록 실패')
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [])

  //편집관련
  const handleEdit = (diary) => {
    setSelectedDiary(diary);
    setEditModal(true);
  };

  const handleDelete = async (diary) => {
    if (window.confirm("정말 일기 삭제?")) {
      try {
        await deleteDiary(diary.id);
        alert("삭제완료");
        fetchDiaries();
      } catch (err) {
        alert("삭제 실패");
      }
    }

  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} userNickname={userNickname} fetchDiaries={fetchDiaries} />
      <div className="flex justify-center">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {diaries.length === 0 ?
            (<p className='text-center text-gray-500'> 작성된 다이어리 없음</p>)
            :
            (diaries.map((diary) => <DiaryCard key={diary.id} diary={diary} currentUserId={currentUserId} onEdit={handleEdit} onDelete={handleDelete} />))}

        </div>
      </div>
      {/* 수정 모달 */}
      {editModal && (
        <WriteModal
          diaryToEdit={selectedDiary} //[추가]
          onClose={() => setEditModal(false)}
          onSuccess={fetchDiaries}
        />
      )}

      <footer className="text-center mt-16 text-sm text-gray-300 break-words">
        이 페이지에는 꾸불림체(우아한형제들), 스위트(SUNN YOUN)가 적용되어 있습니다 <br/>
        아이콘 출처: 
  <a
    href="https://github.com/halfmage/pixelarticons"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    halfmage (MIT)
  </a>,{' '}
  <a
    href="https://dribbble.com/Dooder"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    Dooder (CC Attribution)
  </a> <br/>
        © 2025{' '}
        <a
          href="https://github.com/mina-dong"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          minadong   </a>
      </footer>
    </>
  )
}

export default Main