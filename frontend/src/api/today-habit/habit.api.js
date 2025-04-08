import axiosInstance from "../axiosInstance";

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};
export const getHabits = async (studyId) => {
  try {
    const res = await axiosInstance.get(`/studies/${studyId}/habits`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
export const putHabits = async (studyId, habits) => {
  try {
    const res = await axiosInstance.put(`/studies/${studyId}/habits`, {
      habits,
    });
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
export const getAllHabits = async (studyId) => {
  try {
    const res = await axiosInstance.get(`/studies/${studyId}/habits?all=true`);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
