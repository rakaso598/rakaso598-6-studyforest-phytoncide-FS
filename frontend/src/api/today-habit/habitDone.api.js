import axiosInstance from "../axiosInstance";

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};

export const putHabitDone = async (studyId, habitId, day) => {
  try {
    const res = await axiosInstance.put(
      `studies/${studyId}/habits/${habitId}/${day}`
    );
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
