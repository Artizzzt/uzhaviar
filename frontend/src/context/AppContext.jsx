import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from 'react';
import { mockUser, notifications as initialNotifications } from '../data/mockData';
import { farmers as initialFarmers } from '../data/farmers';
import { diseases as initialDiseases } from '../data/diseases';
import { pesticides as initialPesticides } from '../data/pesticides';
import { CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { 
  getFarmers, 
  getDiseases, 
  getPesticides, 
  loginApi, 
  registerApi, 
  createFarmer as apiCreateFarmer, 
  updateFarmer as apiUpdateFarmer, 
  deleteFarmer as apiDeleteFarmer,
  getNotifications,
  getNotificationPreferences,
  saveNotificationPreferences
} from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & Domain States
  const [user, setUser] = useState(mockUser);
  const [farmers, setFarmers] = useState(initialFarmers);
  const [diseases, setDiseases] = useState(initialDiseases);
  const [pesticides, setPesticides] = useState(initialPesticides);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationPreferences, setNotificationPreferences] = useState({ fertilizer: true, disease: true, weekly: true });
  const [deletedFarmers, setDeletedFarmers] = useState([]);

  // Load live data from Spring Boot API on mount
  useEffect(() => {
    let isMounted = true;
    async function loadBackendData() {
      try {
        const [farmersData, diseasesData, pesticidesData] = await Promise.allSettled([
          getFarmers(),
          getDiseases(),
          getPesticides()
        ]);

        if (isMounted) {
          if (farmersData.status === 'fulfilled' && Array.isArray(farmersData.value) && farmersData.value.length > 0) {
            setFarmers(farmersData.value);
          }
          if (diseasesData.status === 'fulfilled' && Array.isArray(diseasesData.value) && diseasesData.value.length > 0) {
            setDiseases(diseasesData.value);
          }
          if (pesticidesData.status === 'fulfilled' && Array.isArray(pesticidesData.value) && pesticidesData.value.length > 0) {
            setPesticides(pesticidesData.value);
          }
        }
      } catch (err) {
        console.warn("Spring Boot backend offline, falling back to local state.", err);
      }
    }
    loadBackendData();
    return () => { isMounted = false; };
  }, []);

  // Multi-step registration state
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

  const fetchUserNotifications = useCallback(async (farmerId) => {
    try {
      const data = await getNotifications(farmerId);
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.warn("Backend notifications offline", err);
    }
  }, []);

  const fetchUserPreferences = useCallback(async (farmerId) => {
    try {
      const data = await getNotificationPreferences(farmerId);
      if (data) {
        setNotificationPreferences(data);
      }
    } catch (err) {
      console.warn("Backend preferences offline", err);
    }
  }, []);

  const updateUserPreferences = useCallback(async (prefs) => {
    setNotificationPreferences(prefs);
    try {
      await saveNotificationPreferences(prefs);
      if (user?.id) {
        fetchUserNotifications(user.id);
      }
    } catch (err) {
      console.error("Failed to save preferences to backend", err);
    }
  }, [user, fetchUserNotifications]);

  useEffect(() => {
    if (user?.id) {
      fetchUserPreferences(user.id);
      fetchUserNotifications(user.id);
    }
  }, [user, fetchUserPreferences, fetchUserNotifications]);

  const login = useCallback(async (email, password) => {
    try {
      const res = await loginApi(email, password);
      if (res && res.user) {
        setUser(res.user);
        return true;
      }
    } catch (e) {
      console.warn("Backend login failed, fallback login", e);
    }
    const namePrefix = email ? email.split("@")[0] : "Farmer";
    const displayName = namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1);
    setUser({
      name: displayName,
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

  const register = useCallback(async (data) => {
    try {
      const res = await registerApi(data);
      if (res && res.user) {
        setUser(res.user);
        setFarmers(prev => [...prev, res.user]);
        return true;
      }
    } catch (e) {
      console.warn("Backend registration failed, fallback local registration", e);
    }
    const newFarmer = {
      name: data.name || "New Farmer",
      email: data.email || "farmer@example.com",
      phone: data.phone || "+91 99999-99999",
      id: `FRM-2026-${Math.floor(100 + Math.random() * 900)}`,
      lastLogin: new Date().toLocaleString(),
      cropType: data.cropType || "Paddy",
      landArea: data.landArea || "3 acres",
      location: `${data.district || "Coimbatore"}, ${data.state || "Tamil Nadu"}`
    };
    setUser(newFarmer);
    setFarmers(prev => [...prev, newFarmer]);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    const timer = setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
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
    setDeletedFarmers,
    notifications,
    setNotifications,
    notificationPreferences,
    setNotificationPreferences,
    fetchUserNotifications,
    fetchUserPreferences,
    updateUserPreferences
  }), [
    user, registrationData, login, logout, register, farmers, diseases, pesticides, showToast, deletedFarmers,
    notifications, notificationPreferences, fetchUserNotifications, fetchUserPreferences, updateUserPreferences
  ]);

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
