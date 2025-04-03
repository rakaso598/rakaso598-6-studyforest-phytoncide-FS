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

export const patchHabit = async (studyId, habitId, data) => {
  try {
    const res = await axiosInstance.patch(
      `/studies/${studyId}/habits/${habitId}`,
      data
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const postHabit = async (studyId, data) => {
  try {
    const res = await axiosInstance.post(`/studies/${studyId}/habits`, data);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
export const deleteHabit = async (studyId, habitId) => {
  try {
    const res = await axiosInstance.delete(
      `/studies/${studyId}/habits/${habitId}`
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const getAllHabits = async (studyId) => {
  try {
    const res = await axiosInstance.get(`/studies/${studyId}/habits?all=true`); // Use query parameter
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
