import React, { useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import DashboardCards from "../../components/admin/DashboardCards";
import RecentActivity from "../../components/admin/RecentActivity";
import FarmerGrowthChart from "../../components/admin/FarmerGrowthChart";
import QuickActions from "../../components/admin/QuickActions";

const AdminDashboard = () => {

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="min-h-screen bg-[#eef8f3] flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navigation */}
        <AdminNavbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* Statistics Cards */}
          <DashboardCards />

          {/* Activity & Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

            <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
              <RecentActivity />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
              <FarmerGrowthChart />
            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <QuickActions />
          </div>

        </main>

      </div>
    </div>
  );
};

export default AdminDashboard;