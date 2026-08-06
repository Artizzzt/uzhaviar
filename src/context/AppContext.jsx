import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { mockUser } from '../data/mockData';
import { farmers as initialFarmers } from '../data/farmers';
import { diseases as initialDiseases } from '../data/diseases';
import { pesticides as initialPesticides } from '../data/pesticides';
import { CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Simple mock user authentication state
  const [user, setUser] = useState(mockUser);
  const [farmers, setFarmers] = useState(initialFarmers);
  const [diseases, setDiseases] = useState(initialDiseases);
  const [pesticides, setPesticides] = useState(initialPesticides);
  const [deletedFarmers, setDeletedFarmers] = useState([]);

  // State for the multi-step registration form
  const [registrationData, setRegistrationData] = useState({
    step: 1,
    name: "",
    phone: "",
    email: "",
    password: "",
    farmName: "",
    cropType: "",
    landArea: "",
    district: "",
    state: "Tamil Nadu",
  });

  const login = useCallback((email, password) => {
    setUser({
      name: "Farmer Murugan",
      email: email || "murugan@gmail.com",
      phone: "+91 98321-48321",
      id: "FRM-2026-979",
      lastLogin: new Date().toLocaleString(),
      cropType: "Wheat",
      landArea: "5 acres",
      location: "Coimbatore, Tamil Nadu"
    });
    return true;
  }, []);

  const register = useCallback((data) => {
    setUser({
      name: data.name || "New Farmer",
      email: data.email || "farmer@example.com",
      phone: data.phone || "+91 99999-99999",
      id: `FRM-2026-${Math.floor(100 + Math.random() * 900)}`,
      lastLogin: new Date().toLocaleString(),
      cropType: data.cropType || "Paddy",
      landArea: data.landArea || "3 acres",
      location: `${data.district || "Coimbatore"}, ${data.state || "Tamil Nadu"}`
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    // Auto dismiss after 3 seconds
    const timer = setTimeout(() => {
      setToast(prev => {
        if (prev?.message === message) {
          return null;
        }
        return prev;
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const value = useMemo(() => ({
    user,
    setUser,
    registrationData,
    setRegistrationData,
    login,
    logout,
    register,
    farmers,
    setFarmers,
    diseases,
    setDiseases,
    pesticides,
    setPesticides,
    showToast,
    deletedFarmers,
    setDeletedFarmers
  }), [user, registrationData, login, logout, register, farmers, diseases, pesticides, showToast, deletedFarmers]);

  const borderClasses = {
    success: "border-l-green-600",
    error: "border-l-red-600",
    warning: "border-l-yellow-500"
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast && (
        <div className={`fixed top-5 right-5 z-[9999] bg-white rounded-2xl shadow-2xl border-l-4 p-4 min-w-[320px] flex items-center justify-between gap-3 animate-in slide-in-from-top-5 duration-300 ${borderClasses[toast.type] || "border-l-green-600"}`}>
          <div className="flex items-center gap-3">
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
            {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />}
            {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
            <span className="text-sm font-semibold text-gray-800">{toast.message}</span>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-gray-400 hover:text-gray-600 transition bg-transparent border-none cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
