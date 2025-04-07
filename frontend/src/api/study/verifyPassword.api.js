import axiosInstance from "@api/axiosInstance";

export const verifyStudyPassword = async (studyId, password) => {
  try {
    const response = await axiosInstance.post(
      `/studies/${studyId}/verify-password`,
      {
        encryptedPassword: password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("비밀번호 확인 중 오류 발생:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "비밀번호 확인 중 오류가 발생했습니다.",
    };
  }
};
