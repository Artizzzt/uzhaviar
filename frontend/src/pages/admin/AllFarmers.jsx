import React, { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { deleteFarmer as apiDeleteFarmer, updateFarmer as apiUpdateFarmer } from "../../services/api";

const AllFarmers = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { farmers, setFarmers, showToast } = useApp();
  const [editingFarmer, setEditingFarmer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filteredFarmers = farmers.filter((farmer) =>
    (farmer.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (farmer.village || "").toLowerCase().includes(search.toLowerCase()) ||
    (farmer.crop || "").toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDeleteAction = async () => {
    if (deleteConfirmId) {
      try {
        await apiDeleteFarmer(deleteConfirmId);
      } catch (err) {
        console.warn("Backend delete error, fallback local remove", err);
      }
      setFarmers((prevFarmers) =>
        prevFarmers.filter((farmer) => farmer.id !== deleteConfirmId && farmer._id !== deleteConfirmId)
      );
      showToast("Farmer deleted successfully!", "success");
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="page-title">
                All Farmers
              </h1>

              <p className="page-subtitle">
                Manage all registered farmers
              </p>
            </div>

            {/* Total Farmers Card */}
            <div className="bg-green-600 text-white rounded-xl px-6 py-4 shadow-lg flex items-center gap-4">
              <FaUsers size={30} />
              <div>
                <p className="card-label text-white/90">Total Farmers</p>
                <h2 className="card-value text-white">
                  {farmers.length}
                </h2>
              </div>
            </div>

          </div>

          {/* Search */}
          <div className="relative w-80 mb-6">

            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

            <input
              type="text"
              placeholder="Search Farmer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="min-w-full">

              <thead className="bg-green-600 text-white">

                <tr>
                  <th className="table-header-cell">Farmer ID</th>
                  <th className="table-header-cell">Name</th>
                  <th className="table-header-cell">Email</th>
                  <th className="table-header-cell">Mobile</th>
                  <th className="table-header-cell">Village</th>
                  <th className="table-header-cell">Crop</th>
                  <th className="table-header-cell">Status</th>
                  <th className="table-header-cell text-center">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredFarmers.map((farmer, index) => (

                  <tr
                    key={farmer.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    } hover:bg-green-50`}
                  >
                    <td className="table-body-cell">{farmer.farmerId || farmer.id}</td>
                    <td className="table-body-cell font-medium">
                      {farmer.name}
                    </td>
                    <td className="table-body-cell">{farmer.email}</td>
                    <td className="table-body-cell">{farmer.mobile}</td>
                    <td className="table-body-cell">{farmer.village}</td>
                    <td className="table-body-cell">{farmer.crop}</td>

                    <td className="table-body-cell">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          farmer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : farmer.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {farmer.status}
                      </span>
                    </td>
                    <td className="table-body-cell">

                   <div className="flex justify-center gap-3">

  <button
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
    onClick={() =>
      navigate(`/admin/farmers/${farmer.id}`, {
        state: farmer,
      })
    }
  >
    <FaEye />
    View
  </button>

  <button
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
    onClick={() => setEditingFarmer({ ...farmer })}
  >
    <FaEdit />
    Edit
  </button>

  <button
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
    onClick={() => handleDelete(farmer.id)}
  >
    <FaTrash />
    Delete
  </button>

</div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-150 shadow-2xl max-w-md w-full p-6 text-center animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Farmer</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this farmer? This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer bg-transparent"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors cursor-pointer border-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editingFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl border border-green-100 mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Farmer Details</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await apiUpdateFarmer(editingFarmer.id, editingFarmer);
                } catch (err) {
                  console.warn("Backend update error, fallback local update only", err);
                }
                setFarmers((prev) =>
                  prev.map((f) => (f.id === editingFarmer.id ? editingFarmer : f))
                );
                setEditingFarmer(null);
                showToast("Farmer details updated successfully!", "success");
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Farmer ID</label>
                <input
                  type="text"
                  readOnly
                  value={editingFarmer.id}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 text-sm focus:outline-none cursor-not-allowed text-gray-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editingFarmer.name}
                  onChange={(e) => setEditingFarmer({ ...editingFarmer, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editingFarmer.email}
                  onChange={(e) => setEditingFarmer({ ...editingFarmer, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile</label>
                <input
                  type="text"
                  required
                  value={editingFarmer.mobile}
                  onChange={(e) => setEditingFarmer({ ...editingFarmer, mobile: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Village</label>
                <input
                  type="text"
                  required
                  value={editingFarmer.village}
                  onChange={(e) => setEditingFarmer({ ...editingFarmer, village: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop</label>
                <input
                  type="text"
                  required
                  value={editingFarmer.crop}
                  onChange={(e) => setEditingFarmer({ ...editingFarmer, crop: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                <select
                  value={editingFarmer.status}
                  onChange={(e) => setEditingFarmer({ ...editingFarmer, status: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingFarmer(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllFarmers;