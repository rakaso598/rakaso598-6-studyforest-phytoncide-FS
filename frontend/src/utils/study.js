import { getStudies } from "@api/home/getStudy.api";

const loadMoreStudies = async (currentStudies, setStudies, setIsLoading) => {
  try {
    setIsLoading(true);
    const data = await getStudies({
      offset: currentStudies.length,
      limit: 6,
    });
    setStudies([...currentStudies, ...data]);
  } catch (error) {
    console.error("Failed to load more studies:", error);
  } finally {
    setIsLoading(false);
  }
};

const saveAndNavigateToStudy = (data, navigate) => {
  const storedData = localStorage.getItem("studyForestCardIds");
  const parsedData = storedData ? JSON.parse(storedData) : [];

  const isDuplicate = parsedData.some((item) => item === data.id);

  if (isDuplicate) {
    // 중복 제거
    const filtered = parsedData.filter((id) => id !== data.id);

    // 맨 앞에 추가
    filtered.unshift(data.id);

    // 가장 최근 10개 유지
    const limited = filtered.slice(-10);

    localStorage.setItem("studyForestCardIds", JSON.stringify(limited));
  } else {
    const newData = [data.id, ...parsedData];
    // 우선 최대 10개만
    const limitedData = newData.slice(0, 10);
    localStorage.setItem("studyForestCardIds", JSON.stringify(limitedData));
  }

  navigate(`/studies/${data.id}`);
};

export { loadMoreStudies, saveAndNavigateToStudy };
