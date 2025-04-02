import axiosInstance from "@api/axiosInstance";

export const deleteStudy = async (id, password) => {
  try {
    console.log("Study api client function called");
    const res = await axiosInstance.delete(`api/study/${id}/delete`, {
      data: { password },
    });
    const result = res.data;
    return result;
  } catch (error) {
    console.error("스터디 삭제 오류 발생:", error);
  }
};
