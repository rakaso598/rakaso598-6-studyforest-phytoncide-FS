import axiosInstance from "@api/axiosInstance";

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

// 정렬 옵션 매핑
export const SORT_OPTIONS = {
  "최근 순": { orderBy: "createAt", sort: "desc" },
  "오래된 순": { orderBy: "createAt", sort: "asc" },
  "많은 포인트 순": { orderBy: "point", sort: "desc" },
  "적은 포인트 순": { orderBy: "point", sort: "asc" },
};
