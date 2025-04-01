import axiosInstance from "@api/axiosInstance";

// 포인트 불러오기
const getPoint = async (id) => {
  const res = await axiosInstance.get(`/api/study/${id}/focus`);

  return res.data;
};

// 포인트 업데이트
const patchPoint = async (id, body) => {
  const res = await axiosInstance.patch(`/api/study/${id}/focus`, body);

  return res.data;
};

export { getPoint, patchPoint };
