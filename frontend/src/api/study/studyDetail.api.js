import axiosInstance from "../axiosInstance";

export const getStudyDetail = async (id) => {
  try {
    const res = axiosInstance.get(`/api/study/${id}`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
