import axiosInstance from "../axiosInstance";

export const getTeamList = async (
  page: number,
  limit: number,
  keyword: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/teams?page=${page}&limit=${limit}&search=${keyword}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching team list:", error);
    throw error;
  }
};

export const addTeam = async (postBody: { id: string; name: string }) => {
  try {
    const response = await axiosInstance.post("/teams", postBody);
    return response;
  } catch (error) {
    console.error("Error fetching team list:", error);
    throw error;
  }
};
