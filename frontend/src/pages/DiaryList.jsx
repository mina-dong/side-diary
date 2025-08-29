import { useEffect, useState } from 'react';
import { getDiaryList } from '../api/diary';

import DiaryCard from '../componets/DiaryCard';
import Header from '../componets/Header'; // Header 컴포넌트 불러오기
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [userNickname, setUserNickname] = useState(''); // 사용자 닉네임 관리

    //회원로그인/헤더 관련
    useEffect(()=>{
      const token = localStorage.getItem('authToken');
      const nickname = localStorage.getItem('userNickname');

      //토큰이 존재?
      if (token) {
        setIsLoggedIn(true);
        setUserNickname(nickname);
      } else {
        setIsLoggedIn(false);
        setUserNickname('');
      }
    }, []);
    //의존성 배열을 비워두면, 마운트 되는 순간 한번만 실행되며 초기설정에 적합함.

    useEffect(()=>{
        const fetchDiaries = async () => {
            try {
                const useDummy = true; // api인지 더미인지 선택

                if(useDummy) {setDiaries(dummyDiaries);}
                else{
                const data = await getDiaryList();
                setDiaries(data);
                }
            }catch (err) {
                alert('다이어리 목록 실패')
            }
        };
        fetchDiaries();
    }, [])

    

  return (
    <>
    <Header isLoggedIn={isLoggedIn} userNickname={userNickname} />
    <div className='max-w-3xl mx-auto mt-6'>
        {diaries.length === 0 ? 
         (<p className='text-center text-gray-500'> 작성된 다이어리 없음</p>) 
        :
        (diaries.map((diary)=> <DiaryCard key={diary.id} diary={diary}/>))}

    </div>
    </>
  )
}

export default Main