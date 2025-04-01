import axiosInstance from "@api/axiosInstance";

export const studyDelete = async (data) => {
  try {
    // backend api path
    const res = await axiosInstance.delete("", data);
    const result = res.data;

    return result;
  } catch (e) {
    console.log(e);
  }
};
