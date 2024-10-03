import debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import TeamTable from "../../components/Table/TeamTable";
import { useTeams } from "../../hooks/useTeam";

const TeamList = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 8;

  const { teamsData, error, isLoading, addNewTeam } = useTeams(
    currentPage,
    limit,
    keyword,
  );

  const handleSearch = useCallback(
    debounce((value: string) => {
      setKeyword(value);
    }, 500), // Debounce delay of 500ms
    [],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between">
        <PageTitle title="All list" />
      </div>
      <div className="">
        <TeamTable
          data={teamsData.results}
          addNewTeam={addNewTeam}
          handleSearch={handleSearch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          numberOfData={teamsData.count}
        />
      </div>
    </div>
  );
};

export default TeamList;
