// src/api/axios.js

import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL, // 백엔드 서버의 기본 URL을 설정
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;