export default function DiaryCard({ diary, onEdit, currentUserId }) {
  //현재 일기가 로그인한 사용자와 일치하는지 여부
      // [디버깅 코드] console.log() 추가
    // console.log("-------------------");
    // console.log("일기 작성자 ID: ", diary.userId);
    // console.log("현재 로그인 ID:", Number(currentUserId));
    // console.log("-------------------");

  const isMyDiary = diary.userId === Number(currentUserId);

  return (
    <div className="border rounded-md p-4 shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{diary.title}</h3>
      <p className="mb-2">{diary.content}</p>
      <div className="text-sm text-gray-500">
        작성자: {diary.userNickname} | 날짜: {new Date(diary.createAt).toLocaleDateString()}
        {/* isMyDiary가 true일 때만 수정 버튼을 렌더링합니다. */}
        {isMyDiary && (
          <button
            onClick={() => onEdit(diary)}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            수정
          </button>
        )}
      </div>
      
    </div>
  );
}