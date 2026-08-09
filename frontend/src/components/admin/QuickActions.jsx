import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaMapMarkedAlt,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import AddFarmerModal from "./AddFarmerModal";
import { Users, Activity, FlaskConical } from "lucide-react";
import AdminCard from "./AdminCard";

const QuickActions = () => {
  const navigate = useNavigate();
  const { farmers, diseases, pesticides } = useApp();
  
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportPreviewData, setReportPreviewData] = useState(null);

  const [isAddFarmerOpen, setIsAddFarmerOpen] = useState(false);

  const actions = [
    {
      title: "Add Farmer",
      description: "Register a new farmer",
      icon: <FaUserPlus size={26} />,
      color: "bg-green-600",
      route: "/admin/add-farmer",
    },
    {
      title: "Farm Map",
      description: "View farm locations",
      icon: <FaMapMarkedAlt size={26} />,
      color: "bg-green-600",
      route: "/admin/farm-map",
    },
    {
      title: "Generate Reports",
      description: "View analytics reports",
      icon: <FaChartLine size={26} />,
      color: "bg-green-600",
      route: "/admin/reports",
    },
    {
      title: "Settings",
      description: "Manage application settings",
      icon: <FaCog size={26} />,
      color: "bg-green-600",
      route: "/admin/settings",
    },
  ];

  const handleSelectReport = (type) => {
    setSelectedReport(type);
    if (type === "farmer") {
      setReportPreviewData(
        farmers.map((f) => ({
          ID: f.id,
          Name: f.name,
          Village: f.village,
          Crop: f.crop,
          Status: f.status,
        }))
      );
    } else if (type === "disease") {
      setReportPreviewData(
        diseases.map((d) => {
          const farmerObj = farmers.find((f) => f.id === d.farmerId);
          return {
            ID: d.id,
            Farmer: farmerObj?.name || "Unknown",
            Disease: d.disease,
            Severity: d.severity,
            Status: d.status,
          };
        })
      );
    } else if (type === "pesticide") {
      setReportPreviewData(
        pesticides.map((p) => {
          const farmerObj = farmers.find((f) => f.id === p.farmerId);
          return {
            ID: p.id,
            Farmer: farmerObj?.name || "Unknown",
            Pesticide: p.pesticide,
            Dosage: p.dosage,
            "Spray Time": p.spray,
          };
        })
      );
    }
  };

  const handleDownload = () => {
    if (!reportPreviewData || reportPreviewData.length === 0) return;
    const headers = Object.keys(reportPreviewData[0]);
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of reportPreviewData) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedReport}-report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <AdminCard
            key={index}
            variant="action"
            title={action.title}
            description={action.description}
            icon={action.icon}
            iconBg={action.color}
            onClick={() => {
              if (action.title === "Generate Reports") {
                setIsReportModalOpen(true);
              } else if (action.title === "Add Farmer") {
                setIsAddFarmerOpen(true);
              } else {
                navigate(action.route);
              }
            }}
          />
        ))}
      </div>

      <AddFarmerModal
        isOpen={isAddFarmerOpen}
        onClose={() => setIsAddFarmerOpen(false)}
      />

      {isReportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-150 shadow-2xl max-w-2xl w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200 text-left">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsReportModalOpen(false);
                setSelectedReport(null);
                setReportPreviewData(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition bg-transparent border-none cursor-pointer text-lg font-bold"
            >
              ✕
            </button>

            {!selectedReport ? (
              // Step 1: Select Report Type
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Generate Report</h3>
                <p className="text-sm text-gray-500 mb-6">Choose a report type to view preview and download CSV.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleSelectReport("farmer")}
                    className="flex flex-col items-center justify-center p-5 border border-gray-200 hover:border-green-600 rounded-xl hover:bg-green-50/20 transition text-center group bg-white cursor-pointer"
                  >
                    <span className="mb-2 text-green-600"><Users className="w-8 h-8" /></span>
                    <span className="font-bold text-sm text-gray-800">Farmer Report</span>
                    <span className="text-[11px] text-gray-400 mt-1">List of all farmers</span>
                  </button>

                  <button
                    onClick={() => handleSelectReport("disease")}
                    className="flex flex-col items-center justify-center p-5 border border-gray-200 hover:border-green-600 rounded-xl hover:bg-green-50/20 transition text-center group bg-white cursor-pointer"
                  >
                    <span className="mb-2 text-red-600"><Activity className="w-8 h-8" /></span>
                    <span className="font-bold text-sm text-gray-800">Disease Report</span>
                    <span className="text-[11px] text-gray-400 mt-1">Disease cases log</span>
                  </button>

                  <button
                    onClick={() => handleSelectReport("pesticide")}
                    className="flex flex-col items-center justify-center p-5 border border-gray-200 hover:border-green-600 rounded-xl hover:bg-green-50/20 transition text-center group bg-white cursor-pointer"
                  >
                    <span className="mb-2 text-purple-600"><FlaskConical className="w-8 h-8" /></span>
                    <span className="font-bold text-sm text-gray-800">Pesticide Report</span>
                    <span className="text-[11px] text-gray-400 mt-1">Dosage schedules</span>
                  </button>
                </div>
              </div>
            ) : (
              // Step 2: Show Report Preview Table & Download Button
              <div className="text-left flex flex-col h-full max-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 capitalize">{selectedReport} Report Preview</h3>
                    <p className="text-xs text-gray-500">Previewing the latest dataset ({reportPreviewData?.length || 0} rows)</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedReport(null);
                      setReportPreviewData(null);
                    }}
                    className="text-xs text-green-700 font-bold hover:underline cursor-pointer bg-transparent border-none"
                  >
                    ← Back to selection
                  </button>
                </div>

                {/* Table container */}
                <div className="flex-1 overflow-auto border border-gray-100 rounded-xl mb-6 max-h-72">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-gray-50 text-gray-600 font-bold uppercase sticky top-0">
                      <tr>
                        {reportPreviewData && Object.keys(reportPreviewData[0] || {}).map((header) => (
                          <th key={header} className="p-3 border-b">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {reportPreviewData && reportPreviewData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          {Object.values(row).map((val, cellIdx) => (
                            <td key={cellIdx} className="p-3 text-gray-700">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedReport(null);
                      setReportPreviewData(null);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer bg-transparent"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-5 py-2 text-sm text-white bg-green-600 rounded-xl hover:bg-green-700 font-semibold cursor-pointer border-none"
                  >
                    Download CSV
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;