import axios from "axios";

const BASE_URL = "http://localhost:5090/api/study";
const instance = axios.create({ baseURL: BASE_URL });

const getPoint = async (studyId) => {
  const res = await instance.get(`/${studyId}/focus`);

  return res.data;
};

const patchPoint = async (studyId, body) => {
  const res = await instance.patch(`/${studyId}/focus`, body);

  return res.data;
};

export { getPoint, patchPoint };
