import React from "react";

const AdminCard = ({
  variant = "stat", // "stat" or "action"
  title,
  value, // for stat cards
  change, // for stat cards
  description, // for action cards
  icon,
  iconBg = "bg-green-600",
  onClick,
  className = "",
}) => {
  const isStat = variant === "stat";

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
        onClick ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg" : ""
      } ${className}`}
    >
      <div className="flex justify-between items-start w-full">
        {/* Left Side Content */}
        <div className="flex-1 text-left">
          {isStat ? (
            <>
              <p className="card-label text-gray-500">
                {title}
              </p>
              <h2 className="card-value text-gray-800">
                {value}
              </h2>
              {change && (
                <p className="text-sm text-green-600 font-semibold mt-3">
                  {change}
                </p>
              )}
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gray-800">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {description}
              </p>
            </>
          )}
        </div>

        {/* Right Side Icon */}
        {icon && (
          <div
            className={`${iconBg} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 ml-4`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
