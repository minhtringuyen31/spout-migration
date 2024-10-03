// src/components/LanguageDropdown.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "../../constants/languages";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const LanguageDropdown: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].key);
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

  const handleLanguageChange = (key: string) => {
    setSelectedLanguage(key);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex gap-2 justify-between items-center w-full rounded-md bg-white text-base font-medium text-gray-500 hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={languages.find((lang) => lang.key === selectedLanguage)?.flag}
            alt={selectedLanguage}
            className=" h-8 rounded-md mr-2"
          />
          {languages.find((lang) => lang.key === selectedLanguage)?.title}

          <span>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 z-10 mt-4 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {languages.map((lang) => (
                <button
                  key={lang.key}
                  onClick={() => handleLanguageChange(lang.key)}
                  className="flex items-center w-full px-4 py-2 text-base text-left text-gray-500 hover:bg-gray-100 focus:outline-none"
                  role="menuitem"
                >
                  <img
                    src={lang.flag}
                    alt={lang.key}
                    className="w-10 rounded-md mr-2"
                  />
                  {lang.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageDropdown;
