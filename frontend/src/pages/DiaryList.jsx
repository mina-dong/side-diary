import { useEffect, useState } from 'react';
import { getDiaryList } from '../api/diary';
import DiaryCard from '../componets/DiaryCard';

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

function DiaryList() {
    const [diaries, setDiaries] = useState([]);

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
    <div className='max-w-3xl mx-auto mt-6'>
        {diaries.length === 0 ? 
         (<p className='text-center text-gray-500'> 작성된 다이어리 없음</p>) 
        :
        (diaries.map((diary)=> <DiaryCard key={diary.id} diary={diary}/>))}

    </div>
  )
}

export default DiaryList