import React from "react";
import { FiUsers } from "react-icons/fi";
import { MenuItem } from "./MenuItem";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  expanded: boolean;
}

type MenuItemType = {
  key: string;
  icon: React.ReactNode;
  label: string;
  url: string;
};

const Sidebar: React.FC<SidebarProps> = ({ expanded }) => {
  const location = useLocation();
  const menuItems: MenuItemType[] = [
    {
      key: "1",
      icon: <FiUsers />,
      label: "User Management",
      url: "/user-management",
    },
    {
      key: "2",
      icon: <FiUsers />,
      label: "Test",
      url: "/test-page",
    },
  ];

  return (
    <aside>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <ul className="flex-1 pr-3 py-3">
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              menuItem={item}
              active={location.pathname === item.url}
              expanded={expanded}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
