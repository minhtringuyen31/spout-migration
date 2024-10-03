import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {};

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex gap-2 justify-between items-center w-full h-full rounded-md bg-white hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="https://womensagenda.com.au/wp-content/uploads/2021/03/yasmin_poole.png"
            alt="avatar"
            className="h-10 aspect-square rounded-full mr-2"
          />
          <div className="flex flex-col items-start">
            <p className="font-medium text-gray-600">Moni Roy</p>
            <p className="font-medium text-sm text-gray-500">Admin</p>
          </div>
          <span className="border rounded-full p-1 text-gray-600">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 z-10 mt-4 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              <div className="w-full flex flex-col gap-1 px-4 py-2 text-gray-600 ">
                <p className="w-full font-medium ">Moni Roy</p>
                <p className="w-full text-sm">Miniroy@gmail.com</p>
                <button className="border border-blue-500 w-full rounded-md my-2 px-6 py-2 text-blue-500 hover:bg-blue-500 hover:text-white">
                  {" "}
                  Manage profile
                </button>
              </div>
              <div className="border-t" />
              <button
                className="w-full px-4 py-2 font-medium text-gray-600 text-start hover:bg-gray-100"
                onClick={() => console.log("Set status to Away")}
              >
                Set status to <span className="text-blue-500">Away</span>
              </button>
              <div className="w-full px-4 py-2 font-medium text-gray-600 text-start hover:bg-gray-100">
                Display sende's email
              </div>
              <button
                className="w-full px-4 py-2 font-medium text-gray-600 text-start hover:bg-gray-100"
                onClick={() => console.log("   Language")}
              >
                Language
              </button>
              <button
                className="w-full px-4 py-2 font-medium text-gray-600 text-start hover:bg-gray-100"
                onClick={() => console.log(" Term of use")}
              >
                Term of use
              </button>
              <button
                className="w-full px-4 py-2 font-medium text-gray-600 text-start hover:bg-gray-100"
                onClick={() => console.log("Privacy policy")}
              >
                Privacy policy
              </button>
              <button
                className="w-full px-4 py-2 font-medium text-gray-600 text-start hover:bg-gray-100"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
