import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaChartLine } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import { useApp } from "../../context/AppContext";

const FarmerAnalytics = () => {
  const { farmers: rawFarmers, diseases } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const farmers = rawFarmers.map((f) => {
    const disease = diseases.find((d) => d.farmerId === f.id);
    return {
      ...f,
      farmer: f.name,
      disease: disease ? disease.disease : "None",
    };
  });

  const filtered = farmers.filter(
    (item) =>
      item.farmer.toLowerCase().includes(search.toLowerCase()) ||
      item.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-6">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="page-title">
                Farmer Analysis
              </h1>

              <p className="page-subtitle">
                Analyze farmer crop performance
              </p>
            </div>

            <div className="bg-green-600 text-white px-6 py-4 rounded-xl flex items-center gap-3">
              <FaChartLine size={26}/>
              <div>
                <p className="card-label text-white/90">Total Farmers</p>
                <h2 className="card-value text-white">
                  {farmers.length}
                </h2>
              </div>
            </div>

          </div>

          <div className="relative w-80 mb-6">
            <FaSearch className="absolute left-3 top-4 text-gray-400"/>
            <input
              type="text"
              placeholder="Search Farmer..."
              className="w-full border rounded-xl pl-10 py-3"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-green-600 text-white">

                <tr>
                  <th className="table-header-cell text-left">Farmer ID</th>
                  <th className="table-header-cell text-left">Farmer</th>
                  <th className="table-header-cell text-left">Village</th>
                  <th className="table-header-cell text-left">Crop</th>
                  <th className="table-header-cell text-left">Disease</th>
                  <th className="table-header-cell text-left">Action</th>
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

                      <button
                        onClick={() =>
                          navigate(`/admin/analysis/${item.id}`, {
                            state: item,
                          })
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Analyze
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

export default FarmerAnalytics;