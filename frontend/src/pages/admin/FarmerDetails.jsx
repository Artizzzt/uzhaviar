import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const FarmerDetails = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-10">
        Farmer not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <AdminNavbar />

        <main className="p-8">

          <button
            onClick={() => navigate(-1)}
            className="mb-6 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            ← Back
          </button>

          <div className="bg-white rounded-2xl shadow p-8">

            <h1 className="text-3xl font-bold text-green-700 mb-6">
              Farmer Details
            </h1>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <strong>Farmer ID</strong>
                <p>{state.id}</p>
              </div>

              <div>
                <strong>Name</strong>
                <p>{state.name}</p>
              </div>

              <div>
                <strong>Email</strong>
                <p>{state.email}</p>
              </div>

              <div>
                <strong>Mobile</strong>
                <p>{state.mobile}</p>
              </div>

              <div>
                <strong>Village</strong>
                <p>{state.village}</p>
              </div>

              <div>
                <strong>Crop</strong>
                <p>{state.crop}</p>
              </div>

              <div>
                <strong>Status</strong>
                <p>{state.status}</p>
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default FarmerDetails;