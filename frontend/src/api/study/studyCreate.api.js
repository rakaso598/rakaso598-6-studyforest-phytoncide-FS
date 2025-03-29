import axiosInstance from "../axiosInstance";

export const studyCreate = async (data) => {
  try {
    const res = await axiosInstance.post("/api/study-create", data);
    const result = res.data;

    return result;
  } catch (e) {
    console.log(e);
  }
};
