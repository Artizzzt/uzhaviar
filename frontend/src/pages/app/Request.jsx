import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Request = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!description.trim()) {
      alert("Please enter your request.");
      return;
    }

    const requests =
      JSON.parse(localStorage.getItem("farmerRequests")) || [];

    requests.push({
      message: description,
      time: new Date().toLocaleString(),
      status: "Pending",
    });

    localStorage.setItem(
      "farmerRequests",
      JSON.stringify(requests)
    );

    alert("Request submitted successfully!");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Send Request
        </h2>

        <textarea
          rows={6}
          placeholder="Describe your request..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleSubmit}
          className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Submit Request
        </button>

      </div>
    </div>
  );
};

export default Request;