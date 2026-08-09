import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const FarmerAnalysis = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={() => navigate("/admin/analysis")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Back
        </button>
      </div>
    );
  }

  const chartData = [
    { subject: "Crop Health", value: state.cropHealth },
    { subject: "Disease Control", value: state.diseaseControl },
    { subject: "Fertilizer", value: state.fertilizer },
    { subject: "Crop Yield", value: state.cropYield },
    { subject: "Soil Health", value: state.soilHealth },
    { subject: "Temperature", value: state.temperature },
    { subject: "Humidity", value: state.humidity },
  ];

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <AdminNavbar />

        <main className="p-8">

          <div className="bg-white rounded-2xl shadow-lg p-8">
<button
  onClick={() => navigate("/admin/analysis")}
  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg mb-6"
>
  <FaArrowLeft />
  Back
</button>
            <h1 className="text-3xl font-bold text-green-700 mb-2">
              Farmer Analysis
            </h1>

            <p className="text-gray-500 mb-8">
              Detailed analysis report of {state.farmer}
            </p>

            <div className="grid grid-cols-2 gap-8">

              <div>

                <table className="w-full">

                  <tbody>

                    <tr>
                      <td className="font-bold py-2">Farmer</td>
                      <td>{state.farmer}</td>
                    </tr>

                    <tr>
                      <td className="font-bold py-2">Village</td>
                      <td>{state.village}</td>
                    </tr>

                    <tr>
                      <td className="font-bold py-2">Crop</td>
                      <td>{state.crop}</td>
                    </tr>

                    <tr>
                      <td className="font-bold py-2">Disease</td>
                      <td>{state.disease}</td>
                    </tr>

                    <tr>
                      <td className="font-bold py-2">Recommended Fertilizer</td>
                      <td>{state.fertilizerName}</td>
                    </tr>

                  </tbody>

                </table>

              </div>

              <div className="w-full h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={chartData}
                    margin={{ top: 10, right: 35, bottom: 10, left: 35 }}
                  >
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#475569", fontSize: 11, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                    <Radar
                      name={state.farmer}
                      dataKey="value"
                      stroke="#16a34a"
                      fill="#22c55e"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

            </div>

            <div className="grid grid-cols-4 gap-5 mt-10">

              <div className="bg-green-100 rounded-xl p-5 text-center">
                <h3 className="font-bold">Crop Health</h3>
                <p className="text-3xl">{state.cropHealth}%</p>
              </div>

              <div className="bg-red-100 rounded-xl p-5 text-center">
                <h3 className="font-bold">Disease</h3>
                <p>{state.disease}</p>
              </div>

              <div className="bg-yellow-100 rounded-xl p-5 text-center">
                <h3 className="font-bold">Yield</h3>
                <p>{state.cropYield}%</p>
              </div>

              <div className="bg-blue-100 rounded-xl p-5 text-center">
                <h3 className="font-bold">Soil Health</h3>
                <p>{state.soilHealth}%</p>
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default FarmerAnalysis;