import React from "react";
import {
  FaUsers,
  FaSeedling,
  FaLeaf,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import AdminCard from "./AdminCard";

const DashboardCards = () => {
  const { farmers, diseases } = useApp();
  const navigate = useNavigate();

  const cards = [
    {
      title: "Total Farmers",
      value: farmers.length.toString(),
      change: "+12% this month",
      icon: <FaUsers size={28} />,
      bg: "bg-blue-600",
      onClick: () => navigate("/admin/farmers"),
    },
    {
      title: "Active Farms",
      value: farmers.filter(f => f.status === "Active").length.toString(),
      change: "+8% this month",
      icon: <FaSeedling size={28} />,
      bg: "bg-green-600",
      onClick: () => navigate("/admin/farmers"),
    },
    {
      title: "Crop Health",
      value: "94%",
      change: "+3% improvement",
      icon: <FaLeaf size={28} />,
      bg: "bg-green-600",
      onClick: () => navigate("/admin/analysis"),
    },
    {
      title: "Disease Reports",
      value: diseases.length.toString(),
      change: "-5 from last week",
      icon: <FaExclamationTriangle size={28} />,
      bg: "bg-red-600",
      onClick: () => navigate("/admin/disease-detection"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <AdminCard
          key={index}
          variant="stat"
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
          iconBg={card.bg}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
};

export default DashboardCards;