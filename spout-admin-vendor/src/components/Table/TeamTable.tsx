import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Team } from "../../types/Team";
import SearchBar from "../SearchBar/SearchBar";
import AddTeamModal from "../Modal/AddTeamModal/AddTeamModal";

interface TeamTableProps {
  data: Team[];
  addNewTeam: (teamName: string) => void;
  handleSearch: (keyword: string) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  limit: number;
  numberOfData: number;
}

const TeamTable: React.FC<TeamTableProps> = ({
  data,
  addNewTeam,
  handleSearch,
  currentPage,
  setCurrentPage,
  limit,
  numberOfData,
}) => {
  const [selectedRows, setSelectedRows] = useState<Team[]>([]);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] =
    useState<boolean>(false);

  const handleOpenCreateTeamModal = () => {
    setIsCreateTeamModalOpen(true);
  };

  const handleCloseCreateTeamModal = () => {
    setIsCreateTeamModalOpen(false);
  };

  const handleCheckboxChange = (team: Team) => {
    if (selectedRows.some((selected) => selected.id === team.id)) {
      setSelectedRows(
        selectedRows.filter((selectedTeam) => selectedTeam.id !== team.id),
      );
    } else {
      setSelectedRows([...selectedRows, team]);
    }
  };

  const handleSelectAllCheckbox = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage * limit < numberOfData) setCurrentPage(currentPage + 1);
  };

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, numberOfData);

  return (
    <div className="w-full">
      <div className="border border-gray-300 rounded-xl bg-white  min-w-[900px]">
        <div className=" flex flex-row justify-between m-5 ">
          <div className="max-w-80 w-1/2">
            <SearchBar handleSearch={handleSearch} />
          </div>
          <button
            onClick={handleOpenCreateTeamModal}
            className="border border-blue-500 text-blue-500 font-medium px-4 py-2 rounded-md"
          >
            Create a new team
          </button>
        </div>
        <table className="min-w-full rounded-xl">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b border-gray-300 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAllCheckbox(e.target.checked)}
                  className="w-5 h-5 accent-blue-500"
                />
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-left">
                No
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-left">
                Team Name
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-left">
                Member
              </th>
              <th className="px-6 py-4 border-b border-gray-300 text-left">
                Action
              </th>
            </tr>
          </thead>

          {selectedRows.length > 0 && (
            <tbody>
              <tr>
                <td colSpan={5} className="px-6 py-4">
                  <div className="flex flex-row gap-4 items-center font-semibold text-blue-500">
                    <span>{selectedRows.length} contacts selected</span>
                    <button
                      onClick={() => {}}
                      className="flex items-center px-2 py-1 text-gray-500 rounded hover:bg-gray-200"
                    >
                      <FiTrash2 className="mr-3" />{" "}
                      <span className="font-semibold">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedRows.some(
                      (selected) => selected.id === row.id,
                    )}
                    onChange={() => handleCheckboxChange(row)}
                    className="w-5 h-5 accent-blue-500"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-300 truncate max-w-56">
                  {(currentPage - 1) * limit + index + 1}
                </td>

                <td className="px-6 py-4 border-b border-gray-300 truncate max-w-56">
                  {row.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 truncate max-w-56">
                  {row.user_count}
                </td>
                <td className="px-6 py-4 border-b border-gray-300 truncate max-w-56">
                  <div>
                    <button
                      className="text-gray-500 border-2 border-gray-300 bg-gray-50 p-2 rounded-md hover:text-gray-700 hover:bg-gray-200"
                      onClick={() => {}}
                    >
                      <FiEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500 font-semibold">
          Showing {start}-{end} of {numberOfData}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage * limit >= numberOfData}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      <AddTeamModal
        isOpen={isCreateTeamModalOpen}
        onClose={handleCloseCreateTeamModal}
        addNewTeam={addNewTeam}
      />
    </div>
  );
};

export default TeamTable;
