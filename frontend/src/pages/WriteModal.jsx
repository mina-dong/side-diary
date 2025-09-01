    import React, { useState, useEffect } from 'react';
    import { postDiary, putDiary } from "../api/diary";

    const WriteModal = ({ onClose, onSuccess, diaryToEdit}) => {
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
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-lg font-bold mb-4 text-orange-800/80"> {diaryToEdit ? "글 다듬기" : "글 남기기"} </h2>
            <form onSubmit={handleSubmit}>
              
              <input type="text" placeholder="제목"  value={title} onChange={e => setTitle(e.target.value)} className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full mb-2" />

              <textarea placeholder="내용" value={content} onChange={e => setContent(e.target.value)} className="border rounded-xl p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-gray-200" />

              <div className="flex justify-around mb-4">
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
                        <div className={`w-4 h-4 rounded-full border-2 ${background === color.value ? 'ring-2 ring-offset-2 ring-gray-200' : ''} bg-${color.value.toLowerCase()}-100`}></div>
                        <span className="text-xs mt-1 text-gray-800">{color.label}</span>
                    </label>
                ))}
            </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="p-2 bg-gray-200 rounded-full">닫기</button>
                <button type="submit" className="p-2 bg-orange-400 text-white rounded-full hover:bg-orange-600">{diaryToEdit ? "수정" : "작성"}</button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    export default WriteModal;