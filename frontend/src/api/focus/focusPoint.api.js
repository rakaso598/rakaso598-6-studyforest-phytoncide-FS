import axiosInstance from "@api/axiosInstance";

// 포인트 업데이트
const patchPoint = async (studyId, body) => {
  const res = await axiosInstance.patch(`/studies/${studyId}/focus`, body);

  return res.data;
};

export { patchPoint };
