import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useApp } from "../../context/AppContext";
import { createFarmer, createDisease, createPesticide } from "../../services/api";

const AddFarmer = () => {
  const navigate = useNavigate();
  const { farmers, setFarmers, diseases, setDiseases, pesticides, setPesticides, showToast } = useApp();

  const ids = farmers.map((f) => parseInt(f.id.replace("F", ""), 10));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const nextId = "F" + String(maxId + 1).padStart(3, "0");

  const [farmer, setFarmer] = useState({
    id: nextId,
    name: "",
    email: "",
    mobile: "",
    village: "",
    crop: "",
    status: "Active",
  });

  const [diseaseForm, setDiseaseForm] = useState({
    disease: "None",
    severity: "Medium",
    status: "Detected",
    pesticide: "",
    dosage: "",
    sprayTime: "Morning",
  });

  const handleChange = (e) => {
    setFarmer({
      ...farmer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !farmer.id ||
      !farmer.name ||
      !farmer.email ||
      !farmer.mobile ||
      !farmer.village ||
      !farmer.crop
    ) {
      showToast("Please fill all required farmer fields.", "warning");
      return;
    }

    // Generate random coordinates near Coimbatore/Tamil Nadu
    const lat = 10.9 + Math.random() * 0.8;
    const lng = 77.0 + Math.random() * 0.8;

    const newFarmer = {
      ...farmer,
      position: [lat, lng],
      fertilizerName: "Urea",
      cropHealth: diseaseForm.disease && diseaseForm.disease !== "None" ? 75 : 90,
      diseaseControl: diseaseForm.disease && diseaseForm.disease !== "None" ? 65 : 85,
      fertilizer: 80,
      cropYield: 85,
      soilHealth: 82,
      temperature: 75,
      humidity: 70,
    };

    try {
      const savedFarmer = await createFarmer(newFarmer);
      setFarmers((prev) => [...prev, savedFarmer || newFarmer]);
    } catch (err) {
      console.warn("Backend createFarmer fallback", err);
      setFarmers((prev) => [...prev, newFarmer]);
    }

    // Add Disease (optional)
    if (diseaseForm.disease && diseaseForm.disease !== "None") {
      const nextDiseaseId = "D" + String(diseases.length + 1).padStart(3, "0");
      const newDisease = {
        id: nextDiseaseId,
        farmerId: farmer.id,
        disease: diseaseForm.disease,
        severity: diseaseForm.severity,
        status: diseaseForm.status,
        image: "/crop_health_analysis.png",
        symptoms: `Observed symptoms of ${diseaseForm.disease} on ${farmer.crop} crop.`,
        pesticide: diseaseForm.pesticide || "None",
        fertilizer: "NPK Mix",
        date: new Date().toLocaleDateString("en-IN"),
      };
      try {
        const savedDis = await createDisease(newDisease);
        setDiseases((prev) => [...prev, savedDis || newDisease]);
      } catch (err) {
        setDiseases((prev) => [...prev, newDisease]);
      }

      // Add Pesticide (optional)
      if (diseaseForm.pesticide) {
        const nextPesticideId = "P" + String(pesticides.length + 1).padStart(3, "0");
        const newPesticide = {
          id: nextPesticideId,
          farmerId: farmer.id,
          pesticide: diseaseForm.pesticide,
          dosage: diseaseForm.dosage || "100 ml/acre",
          sprayTime: diseaseForm.sprayTime,
          status: "Recommended",
        };
        try {
          const savedPest = await createPesticide(newPesticide);
          setPesticides((prev) => [...prev, savedPest || newPesticide]);
        } catch (err) {
          setPesticides((prev) => [...prev, newPesticide]);
        }
      }
    }

    showToast("Farmer added successfully!", "success");
    navigate("/admin/farmers");
  };

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="p-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-left">
            <h1 className="text-3xl font-bold text-green-700 mb-2">
              Add New Farmer
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Register a new farmer and optionally log crop disease details.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Column 1: Farmer Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-green-700 pb-1 border-b border-gray-100">Farmer Details</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Farmer ID</label>
                    <input
                      type="text"
                      name="id"
                      readOnly
                      value={farmer.id}
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-not-allowed text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter name"
                      value={farmer.name}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter email"
                      value={farmer.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile *</label>
                    <input
                      type="text"
                      name="mobile"
                      required
                      placeholder="Enter mobile number"
                      value={farmer.mobile}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Village *</label>
                      <input
                        type="text"
                        name="village"
                        required
                        placeholder="Village"
                        value={farmer.village}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop *</label>
                      <input
                        type="text"
                        name="crop"
                        required
                        placeholder="Crop"
                        value={farmer.crop}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status *</label>
                    <select
                      name="status"
                      value={farmer.status}
                      onChange={handleChange}
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Column 2: Disease Info (Optional) */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-green-700 pb-1 border-b border-gray-100">Disease Information (optional)</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Disease</label>
                    <select
                      value={diseaseForm.disease}
                      onChange={(e) => setDiseaseForm({ ...diseaseForm, disease: e.target.value })}
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="None">None (No disease log)</option>
                      <option value="Leaf Blast">Leaf Blast</option>
                      <option value="Red Rot">Red Rot</option>
                      <option value="Wilt Disease">Wilt Disease</option>
                      <option value="Panama Disease">Panama Disease</option>
                      <option value="Leaf Blight">Leaf Blight</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {diseaseForm.disease !== "None" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Severity</label>
                          <select
                            value={diseaseForm.severity}
                            onChange={(e) => setDiseaseForm({ ...diseaseForm, severity: e.target.value })}
                            className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                          <select
                            value={diseaseForm.status}
                            onChange={(e) => setDiseaseForm({ ...diseaseForm, status: e.target.value })}
                            className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="Detected">Detected</option>
                            <option value="Under Treatment">Under Treatment</option>
                            <option value="Recovered">Recovered</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Recommended Pesticide</label>
                        <input
                          type="text"
                          placeholder="Pesticide name"
                          value={diseaseForm.pesticide}
                          onChange={(e) => setDiseaseForm({ ...diseaseForm, pesticide: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      {diseaseForm.pesticide && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Dosage</label>
                            <input
                              type="text"
                              placeholder="e.g. 120 g/acre"
                              value={diseaseForm.dosage}
                              onChange={(e) => setDiseaseForm({ ...diseaseForm, dosage: e.target.value })}
                              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Spray Time</label>
                            <select
                              value={diseaseForm.sprayTime}
                              onChange={(e) => setDiseaseForm({ ...diseaseForm, sprayTime: e.target.value })}
                              className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="Morning">Morning</option>
                              <option value="Evening">Evening</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate("/admin/farmers")}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition border-none cursor-pointer"
                >
                  Save Farmer
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddFarmer;