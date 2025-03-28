// src/api/axiosInstance.js
import axios from 'axios';

console.log('[VITE_API_URL]', import.meta.env.VITE_API_URL); // ✅ 콘솔 확인용
console.log('[MODE]', import.meta.env.MODE); // ✅ 현재 모드 확인용

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
