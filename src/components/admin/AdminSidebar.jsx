import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaLeaf,
  FaBug,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import { Sprout } from "lucide-react";

const AdminSidebar = () => {

  const menuItems = [
    {
      name: "Home",
      icon: <FaTachometerAlt />,
      path: "/admin-dashboard",
    },
    {
      name: "All Farmers",
      icon: <FaUsers />,
      path: "/admin/farmers",
    },
    {
      name: "Farm Map",
      icon: <FaMapMarkedAlt />,
      path: "/admin/farm-map",
    },
    {
      name: "Disease Detection",
      icon: <FaLeaf />,
      path: "/admin/disease-detection",
    },

    {
      name: "Pesticide Control",
      icon: <FaBug />,
      path: "/admin/pesticides",
    },
    {
      name: "Analysis",
      icon: <FaChartBar />,
      path: "/admin/analysis",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="w-72 bg-green-900 text-white min-h-screen flex flex-col shadow-xl">

      {/* Logo */}
      <div className="p-6 border-b border-green-700">
        <h1 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
          <Sprout className="w-6 h-6 text-yellow-400" /> Uzhaviyar
        </h1>

        <p className="text-green-100 text-sm mt-1">
          Admin Portal
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                isActive
                  ? "bg-green-700 border-r-4 border-yellow-400"
                  : "hover:bg-green-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;