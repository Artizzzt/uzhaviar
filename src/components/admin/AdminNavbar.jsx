import React, { useState } from "react";
import {
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const AdminNavbar = () => {
  const { logout } = useApp();
  const navigate = useNavigate();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Farmer Registered",
      description: "Ramesh Kumar joined the platform.",
      time: "10 mins ago",
      read: false,
      path: "/admin/farmers",
    },
    {
      id: 2,
      title: "Crop Health Updated",
      description: "Rice field health improved to 94%.",
      time: "25 mins ago",
      read: false,
      path: "/admin/analysis",
    },
    {
      id: 3,
      title: "Disease Alert",
      description: "Leaf Blight detected in Farm #18.",
      time: "1 hour ago",
      read: false,
      path: "/admin/disease/D005",
    },
    {
      id: 4,
      title: "Farm Location Added",
      description: "A new farm was added in Coimbatore.",
      time: "2 hours ago",
      read: false,
      path: "/admin/farm-map",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-5">

      <div className="flex items-center justify-between">

        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Home
          </h1>

          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            Welcome back, Admin <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          </p>

          <p className="text-xs text-green-700 mt-1">
            {today}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition focus:outline-none"
            >
              <FaBell className="text-gray-700 text-lg" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden text-left">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <span className="font-bold text-gray-800 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={() =>
                          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                        }
                        className="text-xs text-green-700 font-semibold hover:underline bg-transparent border-none cursor-pointer"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setNotifications((prev) =>
                              prev.map((item) =>
                                item.id === n.id ? { ...item, read: true } : item
                              )
                            );
                            setIsNotificationsOpen(false);
                            if (n.path) {
                              navigate(n.path);
                            }
                          }}
                          className={`p-3.5 flex items-start gap-3 hover:bg-gray-50 transition cursor-pointer relative ${
                            !n.read ? "bg-green-50/20" : ""
                          }`}
                        >
                          {!n.read && (
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          )}
                          <div className="flex-1 pl-1.5">
                            <h4
                              className={`text-xs text-gray-800 ${
                                !n.read ? "font-bold" : "font-medium"
                              }`}
                            >
                              {n.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              {n.description}
                            </p>
                            <span className="text-[10px] text-gray-400 block mt-1.5">
                              {n.time}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Admin Profile */}
          <div className="relative">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 cursor-pointer select-none hover:opacity-90 transition"
            >
              <FaUserCircle className="text-5xl text-green-700" />
              <div>
                <h2 className="font-bold text-gray-800">
                  Admin
                </h2>
                <p className="text-sm text-gray-500">
                  Administrator
                </p>
              </div>
            </div>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4 space-y-4 text-left">
                  <div className="flex items-center gap-3 border-b border-gray-150 pb-3">
                    <FaUserCircle className="text-4xl text-green-700" />
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">Admin</h3>
                      <p className="text-[11px] text-gray-500 font-medium">
                        Administrator
                      </p>
                      <span className="text-[10px] text-gray-400">
                        admin@gmail.com
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/admin/settings");
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition bg-transparent border-none cursor-pointer"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                        navigate("/sign-in");
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg font-semibold transition bg-transparent border-none cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;