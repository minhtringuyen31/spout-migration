import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar expanded={isSidebarOpen} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
