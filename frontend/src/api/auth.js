// src/api/auth.js
import api from './axios';
//axios.post -> api.post로 수정했는데 그 이유가 api 에서 베이스 url을 설정했기 때문임.

export const login = async (email, password) =>{
    const response = await api.post('/api/users/login', {email, password});
    return response.data //토큰
}

export const register = async (email, password, nickname, invitationCode) =>{
    const response = await api.post('/api/users/register', {email, password, nickname, invitationCode});
    return response.data 
}