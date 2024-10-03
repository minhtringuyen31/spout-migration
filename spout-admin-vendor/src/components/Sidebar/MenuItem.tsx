import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  menuItem: MenuItemType;
  active?: boolean;
  expanded: boolean;
}

type MenuItemType = {
  key: string;
  icon: React.ReactNode;
  label: string;
  url: string;
};

export function MenuItem({ menuItem, active, expanded }: MenuItemProps) {
  return (
    <li>
      <Link to={menuItem.url} className="flex flex-row gap-2">
        <div
          className={`flex w-1.5 items-center py-2 my-1 font-medium rounded-tr-md rounded-br-md cursor-pointer transition-colors group ${
            active ? "bg-[#4880FF] text-white" : "hover:bg-indigo-50 "
          }`}
        />
        <div
          className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
            active ? "bg-[#4880FF] text-white" : "hover:bg-indigo-50 "
          }`}
        >
          <div className="m-3 text-2xl">{menuItem.icon}</div>
          <span
            className={`overflow-hidden ${
              expanded ? "opacity-100 w-48 ml-3" : "opacity-0 w-0"
            }`}
          >
            {menuItem.label}
          </span>
        </div>
      </Link>
    </li>
  );
}
