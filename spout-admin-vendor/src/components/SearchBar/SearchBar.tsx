import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  handleSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="relative ">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search"
        className="w-full text-base py-2 pr-10 pl-14 bg-slate-50 border border-slate-40 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400"
      />

      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
        <FiSearch className="text-slate-500 text-xl" />
      </div>
    </div>
  );
};

export default SearchBar;
