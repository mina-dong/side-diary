import axios from 'axios';

export const login = async (email, password) =>{
    const response = await axios.post('/api/login', {email, password});
    return response.data //토큰
}

export const register = async (email, password) =>{
    const response = await axios.post('/api/register', {email, password});
    return response.data //토큰
}