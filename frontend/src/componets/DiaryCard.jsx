// DiaryCard.jsx
import { useMemo } from "react";

// 색상별 Tailwind 클래스 세트
const colorSetMap = {
  RED: {
    background: "bg-rose-100",
    title: "text-rose-800",
    content: "text-rose-600",
    footer: "text-rose-400",
    button: "text-rose-400 hover:text-rose-600"
  },
  BLUE: {
    background: "bg-sky-100",
    title: "text-sky-800",
    content: "text-sky-600",
    footer: "text-sky-400",
    button: "text-sky-400 hover:text-sky-600"
  },
  GREEN: {
    background: "bg-lime-100",
    title: "text-lime-800",
    content: "text-lime-600",
    footer: "text-lime-400",
    button: "text-lime-400 hover:text-lime-600"
  },
  PURPLE: {
    background: "bg-violet-100",
    title: "text-violet-800",
    content: "text-violet-600",
    footer: "text-violet-400",
    button: "text-violet-400 hover:text-violet-600"
  },
  YELLOW: {
    background: "bg-yellow-100",
    title: "text-yellow-800",
    content: "text-yellow-600",
    footer: "text-yellow-400",
    button: "text-yellow-400 hover:text-yellow-600"
  },
  // 필요하면 더 추가
};

export default function DiaryCard({ diary, onEdit, onDelete, currentUserId }) {
  const isMyDiary = diary.userId === Number(currentUserId);

  // 백엔드에서 받은 COLOR 값으로 Tailwind 세트 선택
  const colorSet = colorSetMap[diary.background?.toUpperCase()] || {
    background: "bg-gray-100",
    title: "text-gray-800",
    content: "text-gray-600",
    footer: "text-gray-400",
  };

  // 랜덤 회전 각도 (예: -3도 ~ +3도)
  const randomRotate = useMemo(() => Math.floor(Math.random() * 7) - 3, []);

  return (
    <div
      className={`diary-card flex flex-col shadow-md relative w-64 min-h-64 pt-6 px-6 pb-6 mb-6 ${colorSet.background}`}
      style={{ transform: `rotate(${randomRotate}deg)` }}
    >
        <button
          onClick={() => onDelete(diary)}
          className={`absolute top-2 right-2 px-3 py-1 ${colorSet.button} transition-colors`}
        >
          x
        </button>

        <h3 className={`text-xl font-semibold mb-2 break-words text-left ${colorSet.title}`}>
          {diary.title}
        </h3>
        
      

      <p className={`mb-2 text-sm  break-words text-left ${colorSet.content}`}>
        {diary.content}
      </p>
      <div className={`text-xs mt-auto ${colorSet.footer}`}>
        작성자: {diary.userNickname} | 날짜: {new Date(diary.createAt).toLocaleDateString()}
      </div>


      {isMyDiary && (
        <div className="mt-2 flex w-full justify-center gap-2">
          <button
            onClick={() => onEdit(diary)}
            className={`px-3 py-1 text-sm text-center rounded-md ${colorSet.button} transition-colors`}
          >
            수정
          </button>
          
        </div>
      )}

    </div>
  );
}
