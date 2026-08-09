import React, { useState } from "react";
import { FaEye, FaSearch, FaVirus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import { useApp } from "../../context/AppContext";

const DiseaseDetection = () => {
  const { farmers, diseases: rawDiseases } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const diseases = rawDiseases.map((d) => {
    const farmer = farmers.find((f) => f.id === d.farmerId);
    return {
      ...d,
      farmer: farmer ? farmer.name : "",
      village: farmer ? farmer.village : "",
      crop: farmer ? farmer.crop : "",
    };
  });

  const filtered = diseases.filter((item) => {
    const matchesSearch = item.farmer.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter === "All" || item.severity === severityFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-6">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="page-title">
                Disease Detection
              </h1>

              <p className="page-subtitle">
                Monitor disease reports from all farmers
              </p>
            </div>

            <div className="bg-red-600 text-white px-6 py-4 rounded-xl flex items-center gap-3">
              <FaVirus size={28}/>
              <div>
                <p className="card-label text-white/90">Total Cases</p>
                <h2 className="card-value text-white">
                  {diseases.length}
                </h2>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-5 items-center justify-between">
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-3 top-4 text-gray-400"/>
              <input
                placeholder="Search Farmer..."
                className="w-full border rounded-xl pl-10 py-3 focus:outline-none"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
              >
                <option value="All">All Severities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Detected">Detected</option>
                <option value="Under Treatment">Under Treatment</option>
                <option value="Recovered">Recovered</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-green-600 text-white">

                <tr>
                  <th className="table-header-cell">Detection ID</th>
                  <th className="table-header-cell">Farmer</th>
                  <th className="table-header-cell">Village</th>
                  <th className="table-header-cell">Crop</th>
                  <th className="table-header-cell">Disease</th>
                  <th className="table-header-cell">Disease Image</th>
                  <th className="table-header-cell">Severity</th>
                  <th className="table-header-cell">Status</th>
                  <th className="table-header-cell text-center">Action</th>
                </tr>

              </thead>

              <tbody>

                {filtered.map((item)=>(
                  <tr key={item.id} className="border-b hover:bg-green-50">

                    <td className="table-body-cell">{item.id}</td>
                    <td className="table-body-cell">{item.farmer}</td>
                    <td className="table-body-cell">{item.village}</td>
                    <td className="table-body-cell">{item.crop}</td>
                    <td className="table-body-cell">{item.disease}</td>
                    <td className="table-body-cell">
                      <img
                        src={item.image}
                        alt={item.disease}
                        className="w-[60px] h-[60px] object-cover aspect-square rounded-lg border border-gray-300 shadow"
                        onError={(e) => {
                          e.target.src = "/crop_health_analysis.png";
                        }}
                      />
                    </td>
                    <td className="table-body-cell">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        item.severity==="High"
                        ? "bg-red-600"
                        : item.severity==="Medium"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                      }`}>
                        {item.severity}
                      </span>
                    </td>

                    <td className="table-body-cell">
                      <span className={`font-semibold text-xs ${
                        item.status === "Detected"
                          ? "text-red-600"
                          : item.status === "Under Treatment"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="table-body-cell text-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/disease/${item.id}`, {
                            state: item,
                          })
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                      >
                        <FaEye />
                        View
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
};

export default DiseaseDetection;