import React, { useState } from 'react';
import { postDiary } from "../api/diary";

const WriteModal = ({ onClose, onSuccess}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await postDiary({ title, content });
        alert('일기 등록 성공');
        if (onSuccess) onSuccess(); // 작성 성공 시 목록 갱신 호출
        onClose();
        } catch (err) {
        alert('일기 등록 실패');
        }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
        <h2 className="text-lg font-bold mb-4">글 작성</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="제목"  value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
          <textarea placeholder="내용" onChange={e => setContent(e.target.value)} className="border p-2 w-full mb-2" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="p-2 bg-gray-300 rounded">닫기</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">작성</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteModal;