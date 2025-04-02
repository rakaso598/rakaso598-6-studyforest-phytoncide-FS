import axiosInstance from "@api/axiosInstance";

// 포인트 불러오기
const getPoint = async (studyId) => {
  const res = await axiosInstance.get(`/studies/${studyId}/focus`);

  return res.data;
};

// 포인트 업데이트
const patchPoint = async (studyId, body) => {
  const res = await axiosInstance.patch(`/studies/${studyId}/focus`, body);

  return res.data;
};

export { getPoint, patchPoint };
