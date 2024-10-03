import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";
import { addTeam, getTeamList } from "../services/apis/Team/teamService";

const fetcher = async (page: number, limit: number, search: string) => {
  return await getTeamList(page, limit, search);
};

export const useTeams = (page: number, limit: number, search: string) => {
  const { data, error, isLoading } = useSWR(
    [`/api/teams`, page, limit, search],
    () => fetcher(page, limit, search),
  );

  const addNewTeam = async (teamName: string) => {
    const body = {
      id: uuidv4(),
      name: teamName,
    };
    try {
      await addTeam(body);

      mutate([`/api/teams`, page, limit, search]);
    } catch (err) {
      console.error("Failed to add a new team:", err);
    }
  };

  // Edit Team Function

  // Delete Team Function

  return {
    teamsData: data,
    error,
    isLoading,
    addNewTeam,

    // Add other method
  };
};
