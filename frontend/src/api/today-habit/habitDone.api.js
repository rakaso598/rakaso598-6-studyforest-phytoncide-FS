import axiosInstance from "../axiosInstance";

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};

export const getHabitDone = async (studyId, habitId, day) => {
  try {
    const res = await axiosInstance.get(
      `studies/${studyId}/habits/${habitId}/${day}`
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const putHabitDone = async (studyId, habitId, day) => {
  try {
    const res = await axiosInstance.put(
      `studies/${studyId}/habits/${habitId}/${day}`
    ); //주소 수정해야함
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
