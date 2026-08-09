import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useApp } from "../../context/AppContext";
import { updateFarmer as apiUpdateFarmer } from "../../services/api";

const EditFarmer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setFarmers, showToast } = useApp();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">
          Farmer details not found.
        </h2>
      </div>
    );
  }

  const [farmer, setFarmer] = useState({
    id: state.id,
    name: state.name,
    email: state.email,
    mobile: state.mobile,
    village: state.village,
    crop: state.crop,
    status: state.status,
  });

  const handleChange = (e) => {
    setFarmer({
      ...farmer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const dbId = state.id || state._id;
      const updated = await apiUpdateFarmer(dbId, farmer);
      setFarmers((prev) =>
        prev.map((f) => (f.id === state.id || f._id === dbId ? { ...f, ...farmer, ...(updated || {}) } : f))
      );
      showToast("Farmer details updated successfully!", "success");
    } catch (err) {
      console.warn("Backend update error, local update fallback", err);
      setFarmers((prev) =>
        prev.map((f) => (f.id === state.id ? { ...f, ...farmer } : f))
      );
      showToast("Farmer details updated locally!", "success");
    }

    navigate("/admin/farmers");
  };

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <AdminNavbar />

        <main className="p-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">

            <h1 className="text-3xl font-bold text-green-700 mb-8">
              Edit Farmer
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Farmer ID */}
              <div>
                <label className="block font-semibold mb-2">
                  Farmer ID
                </label>

                <input
                  type="text"
                  value={farmer.id}
                  readOnly
                  className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block font-semibold mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={farmer.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={farmer.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block font-semibold mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobile"
                  value={farmer.mobile}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Village */}
              <div>
                <label className="block font-semibold mb-2">
                  Village
                </label>

                <input
                  type="text"
                  name="village"
                  value={farmer.village}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Crop */}
              <div>
                <label className="block font-semibold mb-2">
                  Crop
                </label>

                <input
                  type="text"
                  name="crop"
                  value={farmer.crop}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block font-semibold mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={farmer.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Inactive</option>
                </select>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-10">

              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Save Changes
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default EditFarmer;