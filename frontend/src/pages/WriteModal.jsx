import React, { useState, useEffect } from 'react';
import { postDiary, putDiary } from "../api/diary";

const WriteModal = ({ onClose, onSuccess, diaryToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [background, setBackground] = useState('');

  //수정 모드일 경우 기존 데이터 채우기
  useEffect(() => {
    if (diaryToEdit) {
      setTitle(diaryToEdit.title);
      setContent(diaryToEdit.content);
      setBackground(diaryToEdit.background);
    }
  }, [diaryToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (diaryToEdit) {
        //[추가] 수정 모드 → PUT 요청
        await putDiary(diaryToEdit.id, { title, content, background });
        alert('포스트잇 수정 성공');
      } else {
        //[기존] 작성 모드 → POST 요청
        await postDiary({ title, content, background });
        alert('포스트잇 등록 성공');
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      alert(diaryToEdit ? '포스트잇 수정 실패' : '포스트잇 등록 실패');
    }
  };
  const colors = [
    { value: "RED", label: "빨강" },
    { value: "YELLOW", label: "노랑" },
    { value: "GREEN", label: "초록" },
    { value: "BLUE", label: "파랑" },
    { value: "PURPLE", label: "보라" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg min-w-[320px] w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-orange-500 font-handwriting text-center">
          {diaryToEdit ? "글 다듬기" : "글 남기기"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="제목 (10자 이내)"
            value={title}
            maxLength={10}
            onChange={e => setTitle(e.target.value)}
            className="border border-orange-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 w-full"
          />

          <textarea
            placeholder="내용 (150자 이내)"
            value={content}
            maxLength={150}
            onChange={e => setContent(e.target.value)}
            className="border border-orange-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 w-full min-h-[100px]"
          />

          <div className="flex justify-around mb-2">
            {colors.map(color => (
              <label key={color.value} className="flex flex-col items-center cursor-pointer">
                <input
                  type="radio"
                  name="background-color"
                  value={color.value}
                  checked={background === color.value}
                  onChange={e => setBackground(e.target.value)}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 rounded-full ${background === color.value ? 'ring-2 ring-offset-2 ring-orange-300' : ''
                    } bg-${color.value.toLowerCase()}-100`}
                ></div>
                <span className="text-xs mt-1 text-gray-700">{color.label}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
            >
              닫기
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-400 text-white rounded-xl hover:bg-orange-500 transition-colors"
            >
              {diaryToEdit ? "수정" : "작성"}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default WriteModal;