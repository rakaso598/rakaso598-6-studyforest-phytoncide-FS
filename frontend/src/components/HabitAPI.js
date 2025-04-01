import axiosInstance from "../api/axiosInstance.js";

const HABIT_URL = "/api/habits";

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};

export const getHabits = async (studyId) => {
  try {
    const res = await axiosInstance.get(`${HABIT_URL}/gethabit/${studyId}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const patchHabits = async (habitId, data) => {
  try {
    const res = await axiosInstance.patch(
      `${HABIT_URL}/patchhabit/${habitId}`,
      data
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const postHabit = async (studyId, data) => {
  try {
    const res = await axiosInstance.post(
      `${HABIT_URL}/posthabit/${studyId}`,
      data
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
export const deleteHabit = async (habitId) => {
  try {
    const res = await axiosInstance.delete(
      `${HABIT_URL}/deletehabit/${habitId}`
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
