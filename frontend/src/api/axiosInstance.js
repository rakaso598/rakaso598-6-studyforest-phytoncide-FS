// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true, 현재 캐쉬와 쿠키를 사용할껀지 묻는 속성 그러나 사용시 서버쪽에서 CORS 설정시 전체 허용이 불가능!!!
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
