import axiosInstance from "@api/axiosInstance";

export const deleteStudy = async (studyId, password) => {
  try {
    const res = await axiosInstance.delete(`/studies/${studyId}`, {
      data: { password },
    });
    const result = res.data;
    return result;
  } catch (error) {
    console.error("스터디 삭제 오류 발생:", error);
    throw error;
  }
};
