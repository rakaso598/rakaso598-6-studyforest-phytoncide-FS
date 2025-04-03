import axiosInstance from "../axiosInstance";

const HABIT_URL = "/studies";

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};

export const getHabits = async (studyId) => {
  try {
    const res = await axiosInstance.get(`${HABIT_URL}/${studyId}/habits`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const patchHabits = async (habitId, data) => {
  try {
    const res = await axiosInstance.patch(`${HABIT_URL}/${habitId}`, data);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const postHabit = async (studyId, data) => {
  try {
    const res = await axiosInstance.post(`${HABIT_URL}/${studyId}`, data);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
export const deleteHabit = async (habitId) => {
  try {
    const res = await axiosInstance.delete(`${HABIT_URL}/${habitId}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
