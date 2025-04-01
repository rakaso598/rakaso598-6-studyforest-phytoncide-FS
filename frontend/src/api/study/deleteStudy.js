import axiosInstance from "@api/axiosInstance";

export const deleteStudy = async (id, encryptedPassword) => {
  try {
    // backend api path
    const res = await axiosInstance.delete(`api/study/${id}/delete`, {
      data: { encryptedPassword },
    });
    const result = res.data;
    return result;
  } catch (error) {
    console.error("스터디 삭제 오류 발생:", error);
  }
};
