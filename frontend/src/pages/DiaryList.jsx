import { useEffect, useState } from 'react';
import { getDiaryList } from '../api/diary';

import DiaryCard from '../componets/DiaryCard';
import Header from '../componets/Header'; // Header 컴포넌트 불러오기
import WriteModal from './WriteModal';

// 더미데이터
const dummyDiaries = [
  {
    id: 1,
    title: "첫 번째 일기",
    content: "오늘은 날씨가 좋았다.",
    nickname: "민아",
    createAt: "2025-07-29T12:00:00"
  },
  {
    id: 2,
    title: "두 번째 일기",
    content: "리액트 공부 중!",
    nickname: "민아",
    createAt: "2025-07-28T15:30:00"
  }
];

function Main() {
  const [diaries, setDiaries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [userNickname, setUserNickname] = useState(localStorage.getItem('userNickname') || '');
  const [currentUserId, setCurrentUserId] = useState(null);

  //일기편집관련
  const [editModal, setEditModal] = useState(false); 
  const [selectedDiary, setSelectedDiary] = useState(null);

    //회원로그인/헤더 관련
    useEffect(()=>{
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

        if(useDummy) {setDiaries(dummyDiaries);}
        else{
        const data = await getDiaryList();
        setDiaries(data);
        }
    }catch (err) {
        alert('다이어리 목록 실패')
    }
  };
        
    useEffect(()=>{
        fetchDiaries();
    }, [])
  
    //편집관련
  const handleEdit = (diary) => {
    setSelectedDiary(diary);
    setEditModal(true);
  };


  return (
    <>
    <Header isLoggedIn={isLoggedIn} userNickname={userNickname}  fetchDiaries={fetchDiaries}/>
    <div className='max-w-3xl mx-auto mt-6'>
        {diaries.length === 0 ? 
         (<p className='text-center text-gray-500'> 작성된 다이어리 없음</p>) 
        :
        (diaries.map((diary)=> <DiaryCard key={diary.id} diary={diary} currentUserId={currentUserId} onEdit={handleEdit} />))}

    </div>
      {/* 수정 모달 */}
      {editModal && (
        <WriteModal 
          diaryToEdit={selectedDiary} //[추가]
          onClose={() => setEditModal(false)} 
          onSuccess={fetchDiaries}
        />
      )}

    </>
  )
}

export default Main