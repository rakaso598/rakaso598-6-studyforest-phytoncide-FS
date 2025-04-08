import axiosInstance from "../axiosInstance";

// 특정 스터디 조회
export const getStudyDetail = async (studyId) => {
  try {
    const res = await axiosInstance.get(`/studies/${studyId}`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
