import axiosInstance from "../axiosInstance";

const HABITDONE_URL = "/api/habitdone";

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};

export const getHabitDone = async (habitId, day) => {
  try {
    const res = await axiosInstance.get(
      `${HABITDONE_URL}/gethabitdone/${habitId}/${day}`
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const patchHabitDone = async (habitDoneId, data) => {
  try {
    const res = await axiosInstance.patch(
      `${HABITDONE_URL}/patchhabitdone/${habitDoneId}`,
      data
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const postHabitDone = async (data) => {
  try {
    const res = await axiosInstance.post(
      `${HABITDONE_URL}/posthabitdone`,
      data
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
