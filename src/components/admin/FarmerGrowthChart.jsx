import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", farmers: 120 },
  { month: "Feb", farmers: 180 },
  { month: "Mar", farmers: 250 },
  { month: "Apr", farmers: 320 },
  { month: "May", farmers: 430 },
  { month: "Jun", farmers: 520 },
  { month: "Jul", farmers: 610 },
];

const FarmerGrowthChart = () => {
  return (
    <div className="w-full">

      {/* Heading */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Farmer Growth
          </h2>

          <p className="text-sm text-gray-500">
            Registered farmers over the last 7 months
          </p>
        </div>

        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          +18%
        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="farmers"
            stroke="#16a34a"
            strokeWidth={4}
            dot={{
              r: 5,
              fill: "#16a34a",
            }}
            activeDot={{
              r: 8,
            }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default FarmerGrowthChart;