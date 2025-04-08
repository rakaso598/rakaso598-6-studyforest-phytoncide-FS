import axiosInstance from "../axiosInstance";

export const studyCreate = async (data) => {
  try {
    const res = await axiosInstance.post("/studies/", data);
    const result = res.data;

    return result;
  } catch (e) {
    console.log(e);
  }
};
