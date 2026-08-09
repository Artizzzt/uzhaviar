import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import {
  FaUserCircle,
  FaBell,
  FaTractor,
  FaGlobe,
  FaLock,
  FaQuestionCircle,
  FaSave,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useApp } from "../../context/AppContext";
import AddFarmerModal from "../../components/admin/AddFarmerModal";

const AdminSettings = () => {
    const navigate = useNavigate();
    const { farmers, showToast } = useApp();
    const [isAddFarmerOpen, setIsAddFarmerOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
const [showPasswordModal, setShowPasswordModal] = useState(false);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [isEditing, setIsEditing] = useState(false);

const [adminName, setAdminName] = useState("Admin");
const [adminEmail, setAdminEmail] = useState("admin@gmail.com");
const [adminPhone, setAdminPhone] = useState("+91 9876543210");
  return (
    <div className="min-h-screen flex bg-[#eef8f3]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-8">

          <h1 className="page-title mb-8">
            Settings
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Admin Profile */}
          <div className="bg-white rounded-2xl shadow p-6">

  <div className="flex justify-between items-center mb-5">

    <div className="flex items-center gap-3">
      <FaUserCircle className="text-3xl text-green-700" />
      <h2 className="text-xl font-bold">
        Admin Profile
      </h2>
    </div>

    {!isEditing ? (
      <button
        onClick={() => setIsEditing(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Edit
      </button>
    ) : (
      <button
        onClick={() => {
          localStorage.setItem("adminName", adminName);
          localStorage.setItem("adminEmail", adminEmail);
          localStorage.setItem("adminPhone", adminPhone);

          setIsEditing(false);

          showToast("Profile updated successfully!", "success");
        }}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Save
      </button>
    )}

  </div>

  <div className="space-y-4">

    <input
      type="text"
      value={adminName}
      onChange={(e) => setAdminName(e.target.value)}
      disabled={!isEditing}
      className={`w-full border rounded-lg p-3 ${
        !isEditing ? "bg-gray-100" : ""
      }`}
    />

    <input
      type="email"
      value={adminEmail}
      onChange={(e) => setAdminEmail(e.target.value)}
      disabled={!isEditing}
      className={`w-full border rounded-lg p-3 ${
        !isEditing ? "bg-gray-100" : ""
      }`}
    />

    <input
      type="text"
      value={adminPhone}
      onChange={(e) => setAdminPhone(e.target.value)}
      disabled={!isEditing}
      className={`w-full border rounded-lg p-3 ${
        !isEditing ? "bg-gray-100" : ""
      }`}
    />

  </div>

</div>
{/* Notifications */}

<div className="bg-white rounded-2xl shadow p-6">

  <div className="flex items-center gap-3 mb-6">
    <FaBell className="text-2xl text-yellow-500" />
    <h2 className="text-xl font-bold">
      Notifications
    </h2>
  </div>

  <div className="space-y-5">

    {/* Disease Alerts */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Disease Detection Alerts</h3>
        <p className="text-sm text-gray-500">
          Receive notifications when a new crop disease is detected.
        </p>
      </div>

      <input
        type="checkbox"
        checked={notifications}
        onChange={() => setNotifications(!notifications)}
        className="w-5 h-5 accent-green-600"
      />
    </div>

    {/* Farmer Registration */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">New Farmer Registration</h3>
        <p className="text-sm text-gray-500">
          Notify when a new farmer registers.
        </p>
      </div>

      <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-600" />
    </div>

    {/* Pesticide */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Pesticide Recommendations</h3>
        <p className="text-sm text-gray-500">
          Receive updates on recommended pesticides.
        </p>
      </div>

      <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-600" />
    </div>

    {/* Weather */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Weather Alerts</h3>
        <p className="text-sm text-gray-500">
          Get notifications about rainfall and temperature changes.
        </p>
      </div>

      <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-600" />
    </div>

    {/* Analysis */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Analysis Reports</h3>
        <p className="text-sm text-gray-500">
          Notify when a farmer analysis report is generated.
        </p>
      </div>

      <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-600" />
    </div>

    {/* System */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">System Updates</h3>
        <p className="text-sm text-gray-500">
          Receive notifications about new system features and maintenance.
        </p>
      </div>

      <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-600" />
    </div>

  </div>

</div>

      {/* Farmer Details */}

<div className="bg-white rounded-2xl shadow p-6">

  <div className="flex items-center gap-3 mb-6">
    <FaUsers className="text-2xl text-green-700" />
    <h2 className="text-xl font-bold">
      Farmer Details
    </h2>
  </div>

  <div className="space-y-5">

    {/* Total Farmers */}

    <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

      <div>
        <h3 className="card-label text-gray-800">
          Total Farmers
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Currently registered in the system.
        </p>
      </div>

      <span className="card-value text-green-700 mt-0">
        {farmers.length}
      </span>
    </div>

    {/* Add Farmer */}

    <button
      onClick={() => setIsAddFarmerOpen(true)}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
    >
      + Add New Farmer
    </button>

    {/* Remove Farmer */}

    <button
      onClick={() => navigate("/admin/farmers")}
      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
    >
      Remove Existing Farmer
    </button>

    {/* View Farmers */}

    <button
      onClick={() => navigate("/admin/farmers")}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
    >
      View All Farmers
    </button>

    {/* Quick Information */}

    <div className="bg-gray-100 rounded-lg p-4">

      <h3 className="font-semibold mb-2">
        Quick Information
      </h3>

      <ul className="list-disc ml-5 text-gray-600 space-y-1">
        <li>Add newly registered farmers.</li>
        <li>Edit existing farmer details.</li>
        <li>Remove inactive farmers.</li>
        <li>View complete farmer records.</li>
      </ul>

    </div>

  </div>

</div>     
            {/* Language */}

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3 mb-5">
                <FaGlobe className="text-2xl text-blue-600" />
                <h2 className="text-xl font-bold">
                  Language
                </h2>
              </div>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option>English</option>
            
              </select>

            </div>

            {/* Privacy */}

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3 mb-5">
                <FaLock className="text-2xl text-red-500" />
                <h2 className="text-xl font-bold">
                  Privacy & Security
                </h2>
              </div>

             <button
  onClick={() => setShowPasswordModal(true)}
  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
>
  Change Password
</button>

            </div>

            {/* Help */}

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3 mb-5">
                <FaQuestionCircle className="text-2xl text-purple-600" />
                <h2 className="text-xl font-bold">
                  Help & Support
                </h2>
              </div>

              <p className="text-gray-600">
                Email : support@uzhaviyar.com
              </p>

              <p className="text-gray-600 mt-2">
                Phone : +91 9876543210
              </p>

              <p className="text-gray-600 mt-2">
                Working Hours : 9 AM - 6 PM
              </p>

            </div>

          </div>

          <div className="mt-8 text-right">

            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-3 ml-auto">
              <FaSave />
              Save Changes
            </button>
{showPasswordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6">

      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Change Password
      </h2>

      <div className="space-y-4">

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => {
            setShowPasswordModal(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }}
          className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
  onClick={() => {
    // Check all fields
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      showToast("Please fill in all fields.", "warning");
      return;
    }

    // Get current saved password
    const savedPassword =
      localStorage.getItem("adminPassword") || "admin123";

    // Verify current password
    if (currentPassword !== savedPassword) {
      showToast("Current password is incorrect.", "error");
      return;
    }

    // Check new password length
    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters.", "warning");
      return;
    }

    // Check confirmation
    if (newPassword !== confirmPassword) {
      showToast("New password and Confirm password do not match.", "warning");
      return;
    }

    // Save new password
    localStorage.setItem("adminPassword", newPassword);

    showToast("Password changed successfully!", "success");

    // Clear fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    // Close modal
    setShowPasswordModal(false);
  }}
  className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
>
  Save
</button>
      </div>

    </div>

  </div>
)}
          </div>

        </main>

      </div>

      <AddFarmerModal
        isOpen={isAddFarmerOpen}
        onClose={() => setIsAddFarmerOpen(false)}
      />
    </div>
  );
};

export default AdminSettings;