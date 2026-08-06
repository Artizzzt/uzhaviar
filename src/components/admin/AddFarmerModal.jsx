import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2 } from "lucide-react";

const AddFarmerModal = ({ isOpen, onClose }) => {
  const { farmers, setFarmers, diseases, setDiseases, pesticides, setPesticides, showToast } = useApp();

  const [farmerForm, setFarmerForm] = useState({
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

  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFarmerForm({
      ...farmerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile, village, crop, status } = farmerForm;

    if (!name || !email || !mobile || !village || !crop) {
      showToast("Please fill all required farmer fields.", "warning");
      return;
    }

    const ids = farmers.map((f) => parseInt(f.id.replace("F", ""), 10));
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const nextId = "F" + String(maxId + 1).padStart(3, "0");

    // Generate random coordinates near Coimbatore/Tamil Nadu
    const lat = 10.9 + Math.random() * 0.8;
    const lng = 77.0 + Math.random() * 0.8;

    const newFarmer = {
      id: nextId,
      name,
      email,
      mobile,
      village,
      crop,
      status,
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

    // 1. Add Farmer to Context
    setFarmers((prev) => [...prev, newFarmer]);

    // 2. Add Disease (optional)
    if (diseaseForm.disease && diseaseForm.disease !== "None") {
      const nextDiseaseId = "D" + String(diseases.length + 1).padStart(3, "0");
      const newDisease = {
        id: nextDiseaseId,
        farmerId: nextId,
        disease: diseaseForm.disease,
        severity: diseaseForm.severity,
        status: diseaseForm.status,
        image: "/crop_health_analysis.png",
        symptoms: `Observed symptoms of ${diseaseForm.disease} on ${crop} crop.`,
        pesticide: diseaseForm.pesticide || "None",
        fertilizer: "NPK Mix",
        date: new Date().toLocaleDateString("en-IN"),
      };
      setDiseases((prev) => [...prev, newDisease]);

      // 3. Add Pesticide (optional)
      if (diseaseForm.pesticide) {
        const nextPesticideId = "P" + String(pesticides.length + 1).padStart(3, "0");
        const newPesticide = {
          id: nextPesticideId,
          farmerId: nextId,
          pesticide: diseaseForm.pesticide,
          dosage: diseaseForm.dosage || "100 ml/acre",
          sprayTime: diseaseForm.sprayTime,
          status: "Recommended",
        };
        setPesticides((prev) => [...prev, newPesticide]);
      }
    }

    // Show success toast
    setSuccessMessage(`Farmer ${name} (ID: ${nextId}) added successfully!`);
    
    // Clear forms
    setFarmerForm({
      name: "",
      email: "",
      mobile: "",
      village: "",
      crop: "",
      status: "Active",
    });
    setDiseaseForm({
      disease: "None",
      severity: "Medium",
      status: "Detected",
      pesticide: "",
      dosage: "",
      sprayTime: "Morning",
    });

    // Close the modal and reset message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 2500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-150 shadow-2xl max-w-4xl w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition bg-transparent border-none cursor-pointer text-lg font-bold z-10"
          >
            ✕
          </button>

          <h3 className="text-xl font-bold text-gray-800 mb-2">Add New Farmer</h3>
          <p className="text-sm text-gray-500 mb-4">Register a new farmer and optionally log crop disease details.</p>

          <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Column 1: Farmer Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-green-700 pb-1 border-b border-gray-100">Farmer Details</h4>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter farmer name"
                    value={farmerForm.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email"
                    value={farmerForm.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile *</label>
                  <input
                    type="text"
                    name="mobile"
                    required
                    placeholder="Enter mobile number"
                    value={farmerForm.mobile}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      value={farmerForm.village}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop *</label>
                    <input
                      type="text"
                      name="crop"
                      required
                      placeholder="Crop"
                      value={farmerForm.crop}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status *</label>
                  <select
                    name="status"
                    value={farmerForm.status}
                    onChange={handleChange}
                    className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                          className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                          className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Spray Time</label>
                          <select
                            value={diseaseForm.sprayTime}
                            onChange={(e) => setDiseaseForm({ ...diseaseForm, sprayTime: e.target.value })}
                            className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer bg-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm text-white bg-green-600 rounded-xl hover:bg-green-700 font-semibold cursor-pointer border-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {successMessage && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-semibold">{successMessage}</span>
        </div>
      )}
    </>
  );
};

export default AddFarmerModal;
