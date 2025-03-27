import axios from "axios";
import SERVER_URL from "../server.js";

const instance = axios.create({
  baseURL: `${SERVER_URL}/api/habits`,
  // baseURL: `http://localhost:5090/api/habits/`,
});

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};

export const getHabits = async (studyId) => {
  try {
    const res = await instance.get(`/gethabit/${studyId}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const patchHabits = async (habitId, data) => {
  try {
    const res = await instance.patch(`/patchhabit/${habitId}`, data);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};
