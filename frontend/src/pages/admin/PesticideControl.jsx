import React, { useState } from "react";
import { FaSearch, FaFlask } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useApp } from "../../context/AppContext";
import { updatePesticide as apiUpdatePesticide } from "../../services/api";

const PesticideControl = () => {
  const { farmers, diseases, pesticides, setPesticides, showToast } = useApp();
  const [search, setSearch] = useState("");
  const [toggleConfirm, setToggleConfirm] = useState(null);

  const pesticideList = pesticides.map((p) => {
    const farmer = farmers.find((f) => f.id === p.farmerId);
    const disease = diseases.find((d) => d.farmerId === p.farmerId);
    return {
      ...p,
      farmer: farmer ? farmer.name : "",
      village: farmer ? farmer.village : "",
      crop: farmer ? farmer.crop : "",
      disease: disease ? disease.disease : "",
      spray: p.sprayTime,
    };
  });

  const toggleStatus = (id) => {
    const item = pesticides.find((p) => p.id === id);
    if (!item) return;
    const newStatus = item.status === "Applied" ? "Recommended" : "Applied";
    setToggleConfirm({ id, newStatus });
  };

  const confirmToggleAction = async () => {
    if (toggleConfirm) {
      const original = pesticides.find((p) => p.id === toggleConfirm.id);
      if (original) {
        try {
          const updatedBody = { ...original, status: toggleConfirm.newStatus };
          await apiUpdatePesticide(toggleConfirm.id, updatedBody);
        } catch (err) {
          console.warn("Backend pesticide update fallback", err);
        }
      }
      setPesticides((prev) =>
        prev.map((p) => (p.id === toggleConfirm.id ? { ...p, status: toggleConfirm.newStatus } : p))
      );
      showToast(`Recommendation status changed to ${toggleConfirm.newStatus} successfully!`, "success");
      setToggleConfirm(null);
    }
  };

  const filtered = pesticideList.filter(
    (item) =>
      item.farmer.toLowerCase().includes(search.toLowerCase()) ||
      item.disease.toLowerCase().includes(search.toLowerCase()) ||
      item.crop.toLowerCase().includes(search.toLowerCase()) ||
      item.village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-[#eef8f3]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-6">

          <div className="flex justify-between items-center mb-6">

            <div>
            <h1 className="page-title">
              Pesticide Control
            </h1>

            <p className="page-subtitle">
              Recommended pesticides for detected crop diseases
            </p>
          </div>

          <div className="bg-green-600 text-white px-6 py-4 rounded-xl flex items-center gap-3">
            <FaFlask size={28} />
            <div>
              <p className="card-label text-white/90">Total Suggestions</p>
              <h2 className="card-value text-white">
                {pesticideList.length}
              </h2>
            </div>
          </div>

          </div>

          {/* Search */}

          <div className="relative w-80 mb-6">

            <FaSearch className="absolute left-3 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Farmer / Disease..."
              className="w-full border rounded-xl pl-10 py-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* Table */}

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-green-600 text-white">

                <tr>
                  <th className="table-header-cell">Farmer</th>
                  <th className="table-header-cell">Village</th>
                  <th className="table-header-cell">Crop</th>
                  <th className="table-header-cell">Disease</th>
                  <th className="table-header-cell">Pesticide</th>
                  <th className="table-header-cell">Dosage</th>
                  <th className="table-header-cell">Spray Time</th>
                  <th className="table-header-cell">Status</th>
                </tr>

              </thead>

              <tbody>

                {filtered.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-green-50"
                  >
                    <td className="table-body-cell">{item.farmer}</td>

                    <td className="table-body-cell">{item.village}</td>

                    <td className="table-body-cell">{item.crop}</td>

                    <td className="table-body-cell font-semibold text-red-600">
                      {item.disease}
                    </td>

                    <td className="table-body-cell">
                      {item.pesticide}
                    </td>

                    <td className="table-body-cell">
                      {item.dosage}
                    </td>

                    <td className="table-body-cell">
                      {item.spray}
                    </td>

                    <td className="table-body-cell">

                      <span
                        onClick={() => toggleStatus(item.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white cursor-pointer select-none transition-all duration-200 ${
                          item.status === "Applied"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

      {toggleConfirm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-150 shadow-2xl max-w-md w-full p-6 text-center animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Update Recommendation</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to change the status of this recommendation to "{toggleConfirm.newStatus}"?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setToggleConfirm(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer bg-transparent"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggleAction}
                className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors cursor-pointer border-none"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PesticideControl;