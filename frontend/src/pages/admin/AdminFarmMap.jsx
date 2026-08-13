import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

import { useApp } from "../../context/AppContext";

export default function AdminFarmMap() {
  const { farmers } = useApp();
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Use the explicitly selected farmer, fallback to the first farmer in the list if available
  const displayFarmer = selectedFarmer || (farmers && farmers.length > 0 ? farmers[0] : null);

  // Filter for farmers that have a valid coordinate pair [latitude, longitude]
  const validFarmers = farmers ? farmers.filter(
    (f) => f.position && Array.isArray(f.position) && f.position.length === 2 && 
           typeof f.position[0] === "number" && typeof f.position[1] === "number"
  ) : [];

  return (
    <div className="min-h-screen flex bg-[#eef8f3]">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <AdminNavbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Farm Map
          </h1>

          <div className="grid grid-cols-3 gap-6">

            <div className="col-span-2">

              <MapContainer
                center={[10.9, 77.8]}
                zoom={7}
                style={{
                  height: "650px",
                  width: "100%",
                  zIndex: 0
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {validFarmers.map((farmer) => (
                  <Marker
                    key={farmer.id}
                    position={farmer.position}
                    eventHandlers={{
                      click: () => setSelectedFarmer(farmer),
                      popupopen: () => setSelectedFarmer(farmer),
                    }}
                  >
                    <Popup>{farmer.name}</Popup>
                  </Marker>
                ))}
              </MapContainer>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-5">
                Farmer Details
              </h2>

              {displayFarmer ? (
                <div className="space-y-3">
                  <p><b>ID:</b> {displayFarmer.id}</p>
                  <p><b>Name:</b> {displayFarmer.name}</p>
                  <p><b>Email:</b> {displayFarmer.email}</p>
                  <p><b>Mobile:</b> {displayFarmer.mobile}</p>
                  <p><b>Village:</b> {displayFarmer.village}</p>
                  <p><b>Crop:</b> {displayFarmer.crop || "Not Specified"}</p>
                  <p><b>Status:</b> {displayFarmer.status}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  {farmers && farmers.length > 0 ? "Select a farmer from the map to view details." : "No registered farmers found."}
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
