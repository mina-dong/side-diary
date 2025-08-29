import api from './axios';

export const getDiaryList = async ()=>{
    const response = await api.get('/api/diaries');
    return response.data
}

export const postDiary = async (data)=>{
    const response = await api.post('/api/diaries', data);
    return response.data
}