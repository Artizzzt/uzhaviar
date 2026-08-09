import React from "react";
import {
  FaUserPlus,
  FaLeaf,
  FaBug,
  FaMapMarkerAlt,
} from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "New Farmer Registered",
    description: "Ramesh Kumar joined the platform.",
    time: "10 mins ago",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    icon: <FaLeaf />,
    title: "Crop Health Updated",
    description: "Rice field health improved to 94%.",
    time: "25 mins ago",
    color: "bg-lime-100 text-lime-700",
  },
  {
    id: 3,
    icon: <FaBug />,
    title: "Disease Alert",
    description: "Leaf Blight detected in Farm #18.",
    time: "1 hour ago",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 4,
    icon: <FaMapMarkerAlt />,
    title: "Farm Location Added",
    description: "A new farm was added in Coimbatore.",
    time: "2 hours ago",
    color: "bg-blue-100 text-blue-700",
  },
];

const RecentActivity = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Activity
        </h2>

        <button className="text-green-700 font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {activity.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {activity.description}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;