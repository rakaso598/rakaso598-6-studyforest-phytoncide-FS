import axiosInstance from "../axiosInstance";

export const getStudyDetail = async (studyId) => {
  try {
    const res = await axiosInstance.get(`/studies/${studyId}`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
