import axiosInstance from "@api/axiosInstance";

// 스터디 목록 조회
export const getStudies = async ({
  offset = 0,
  limit = 6,
  sort = "desc",
  search = "",
  orderBy = "createAt",
} = {}) => {
  try {
    const response = await axiosInstance.get("/studies", {
      params: {
        offset,
        limit,
        sort,
        search,
        orderBy,
      },
    });
    return response.data.study;
  } catch (error) {
    console.error("Failed to fetch studies:", error);
    throw error;
  }
};

// 최근 조회한 스터디 목록 조회
export const getRecentlyViewedStudies = async (studyIds) => {
  const formattedStudyIds = studyIds.slice(1, -1);

  try {
    const response = await axiosInstance.get("/studies/recently", {
      params: {
        studyIds: formattedStudyIds,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch studies:", error);
    throw error;
  }
};

// 정렬 옵션 매핑
export const SORT_OPTIONS = {
  latest: { orderBy: "createAt", sort: "desc" },
  oldest: { orderBy: "createAt", sort: "asc" },
  highest_point: { orderBy: "point", sort: "desc" },
  lowest_point: { orderBy: "point", sort: "asc" },
};
