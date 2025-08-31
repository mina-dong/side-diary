import React, { useState, useEffect } from 'react';
import { postDiary, putDiary } from "../api/diary";

const WriteModal = ({ onClose, onSuccess, diaryToEdit}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

     //수정 모드일 경우 기존 데이터 채우기
    useEffect(() => {
      if (diaryToEdit) {
        setTitle(diaryToEdit.title);
        setContent(diaryToEdit.content);
      }
    }, [diaryToEdit]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (diaryToEdit) {
            //[추가] 수정 모드 → PUT 요청
            await putDiary(diaryToEdit.id, { title, content });
            alert('일기 수정 성공');
            } else {
            //[기존] 작성 모드 → POST 요청
            await postDiary({ title, content });
            alert('일기 등록 성공');
            }

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            alert(diaryToEdit ? '일기 수정 실패' : '일기 등록 실패');
        }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
        <h2 className="text-lg font-bold mb-4"> {diaryToEdit ? "글 수정" : "글 작성"} </h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="제목"  value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
          <textarea placeholder="내용" value={content} onChange={e => setContent(e.target.value)} className="border p-2 w-full mb-2" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="p-2 bg-gray-300 rounded">닫기</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">{diaryToEdit ? "수정" : "작성"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteModal;