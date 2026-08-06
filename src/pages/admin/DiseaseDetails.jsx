import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useApp } from "../../context/AppContext";

const DiseaseDetails = () => {
  const { farmers, diseases } = useApp();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const { id } = useParams();

  let state = locationState;
  if (!state && id) {
    const foundDisease = diseases.find((d) => d.id === id);
    if (foundDisease) {
      const farmer = farmers.find((f) => f.id === foundDisease.farmerId);
      state = {
        ...foundDisease,
        farmer: farmer ? farmer.name : "",
        village: farmer ? farmer.village : "",
        crop: farmer ? farmer.crop : "",
      };
    }
  }

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">
          Disease details not found.
        </h2>
      </div>
    );
  }

  const recommendation = {
    "Leaf Blast": {
      pesticide: "Tricyclazole 75 WP",
      fertilizer: "Balanced NPK Fertilizer",
      symptoms:
        "Diamond-shaped lesions appear on leaves and gradually spread.",
    },
    "Red Rot": {
      pesticide: "Carbendazim",
      fertilizer: "Organic Compost",
      symptoms:
        "Leaves become yellow and the stem turns reddish inside.",
    },
    "Wilt Disease": {
      pesticide: "Copper Oxychloride",
      fertilizer: "Vermicompost",
      symptoms:
        "Plants wilt suddenly due to fungal infection in roots.",
    },
    "Panama Disease": {
      pesticide: "Thiophanate Methyl",
      fertilizer: "Potassium Rich Fertilizer",
      symptoms:
        "Banana leaves turn yellow and collapse from the outer edge.",
    },
    "Leaf Blight": {
      pesticide: "Mancozeb",
      fertilizer: "Nitrogen Fertilizer",
      symptoms:
        "Brown lesions spread quickly over leaves reducing crop yield.",
    },
  };

  const info = recommendation[state.disease] || {};

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <AdminNavbar />

        <main className="p-8">

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h1 className="text-3xl font-bold text-red-600">
                  Disease Details
                </h1>

                <p className="text-gray-500 mt-2">
                  Complete disease report of the selected farmer.
                </p>

              </div>

              <button
                onClick={() => navigate(-1)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
              >
                ← Back
              </button>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Left */}

              <div className="space-y-5">

                <div>
                  <h2 className="font-bold text-green-700 text-xl mb-4">
                    Farmer Information
                  </h2>

                  <div className="space-y-3">

                    <p><b>Detection ID :</b> {state.id}</p>

                    <p><b>Farmer ID :</b> {state.farmerId}</p>

                    <p><b>Name :</b> {state.farmer}</p>

                    <p><b>Village :</b> {state.village}</p>

                    <p><b>Crop :</b> {state.crop}</p>

                  </div>

                </div>

                <hr />

                <div>

                  <h2 className="font-bold text-green-700 text-xl mb-4">
                    Disease Information
                  </h2>

                  <div className="space-y-3">

                    <p><b>Disease :</b> {state.disease}</p>

                    <p><b>Severity :</b> {state.severity}</p>

                    <p><b>Status :</b> {state.status}</p>

                    <p><b>Detection Date :</b> {state.date}</p>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">

                  <h2 className="font-bold text-red-700 text-xl mb-5">
                    Recommendation
                  </h2>

                  <div className="space-y-4">

                    <div>

                      <h3 className="font-semibold">
                        Symptoms
                      </h3>

                      <p className="text-gray-700">
                        {info.symptoms}
                      </p>

                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Recommended Pesticide
                      </h3>

                      <p className="text-gray-700">
                        {info.pesticide}
                      </p>

                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Recommended Fertilizer
                      </h3>

                      <p className="text-gray-700">
                        {info.fertilizer}
                      </p>

                    </div>

                  </div>

                </div>
<div className="mt-8">

  <h2 className="font-bold text-green-700 mb-4 text-xl">
    Disease Sample Image
  </h2>

  <img
    src={state.image}
    alt={state.disease}
    className="w-full aspect-[16/9] object-cover rounded-xl shadow-lg border"
    onError={(e) => {
      e.target.src = "/crop_health_analysis.png";
    }}
  />

  <p className="text-center mt-3 text-gray-600 font-medium">
    {state.disease}
  </p>

</div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default DiseaseDetails;