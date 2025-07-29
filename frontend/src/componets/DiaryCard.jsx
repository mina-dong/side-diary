export default function DiaryCard({ diary }) {
  return (
    <div className="border rounded-md p-4 shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{diary.title}</h3>
      <p className="mb-2">{diary.content}</p>
      <div className="text-sm text-gray-500">
        작성자: {diary.nickname} | 날짜: {new Date(diary.createAt).toLocaleDateString()}
      </div>
    </div>
  );
}