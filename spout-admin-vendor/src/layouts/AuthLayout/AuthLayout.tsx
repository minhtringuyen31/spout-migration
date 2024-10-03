import { useState } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen w-screen p-4">
      <div className="flex justify-between w-full h-16">
        <img src={"/logo.webp"} />
        <div className="flex justify-center items-center h-2/3 bg-transparent">
          <select
            className="bg-transparent"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
