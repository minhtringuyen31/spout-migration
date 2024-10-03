import React from "react";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/logo.png";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import UserProfile from "../UserProfile/UserProfile";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-sm h-16 flex">
      <div className="w-80 flex justify-center items-center">
        <img src={logo} alt="Logo" className="w-[70%]" />
      </div>

      <div className="flex flex-1 mx-4 flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-6">
          <button onClick={toggleSidebar} className="text-2xl">
            <FiMenu />
          </button>
        </div>

        <div className="flex flex-row items-center gap-6">
          <LanguageDropdown />
          <UserProfile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
