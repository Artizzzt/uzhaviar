import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
 

const AppLayout = () => {
  const { user } = useApp();

  // Redirect to sign-in if not authenticated
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* App variant Navbar */}
      <Navbar variant="app" />

      {/* Sidebar + Content layout */}
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
          
          
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
