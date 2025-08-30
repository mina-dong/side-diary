import api from './axios';

export const getDiaryList = async ()=>{
    const response = await api.get('/api/diaries');
    return response.data
}

export const postDiary = async (data)=>{
    const config = getAuthHeaders();
    const response = await api.post('/api/diaries', data, config);
    return response.data
}


/**
 * JWT 토큰을 localStorage에서 가져와 Authorization 헤더를 포함한 axios 요청 설정을 반환합니다.
 * 토큰이 없으면 에러를 발생시킵니다.
 * returns {object} axios 요청 설정 객체 (headers 포함)
 * throws {Error} 인증 토큰이 없을 경우
 */
const getAuthHeaders = () => {
    // console.log(localStorage.getItem("authToken")); // 토큰확인용
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        console.error("인증 토큰을 찾을 수 없습니다. 로그인해주세요.");
        throw new Error("인증 토큰이 없습니다. 로그인해주세요.");
    }

    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};
