import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Card';
import Button from '../../components/Button';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Sprout, 
  Globe, 
  Shield, 
  HelpCircle, 
  ChevronRight,
  X,
  Check
} from 'lucide-react';

const Settings = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  // Settings State Hooks
  const [activeModal, setActiveModal] = useState(null); // 'notifications' | 'language' | 'privacy' | 'farm' | null
  
  // 1. Notification Switches
  const [alerts, setAlerts] = useState({
    fertilizer: true,
    disease: true,
    weekly: false
  });

  // 2. Language Selection
  const [language, setLanguage] = useState('English');

  const toggleAlert = (key) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setActiveModal(null);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    if (activeModal) {
      setActiveModal(null);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="space-y-1.5">
        <button 
          onClick={handleBackClick}
          className="text-xs font-bold text-primary hover:text-green-700 flex items-center gap-1.5 transition-colors select-none focus:outline-none"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          {activeModal ? 'Back' : 'Back to Dashboard'}
        </button>
        <h1 className="text-2xl font-black text-textdark tracking-tight">Settings</h1>
        <p className="text-xs text-textmuted font-semibold mt-0.5">
          Farmer ID: <span className="font-mono">{user?.id || 'FRM-2026-979'}</span>
        </p>
      </div>

      {/* Settings Grid (2 columns on medium screens, 1 column on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
        
        {/* 1. Profile */}
        <Card 
          onClick={() => navigate('/profile')}
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <User size={20} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <h4 className="font-extrabold text-sm text-textdark">Profile</h4>
              <p className="text-xs text-textmuted font-medium">View and edit your profile</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-textmuted group-hover:text-primary transition-colors" />
        </Card>

        {/* 2. Notifications */}
        <Card 
          onClick={() => setActiveModal('notifications')}
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <Bell size={20} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <h4 className="font-extrabold text-sm text-textdark">Notifications</h4>
              <p className="text-xs text-textmuted font-medium">Manage alert preferences</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-textmuted group-hover:text-primary transition-colors" />
        </Card>

        {/* 3. Farm Settings */}
        <Card 
          onClick={() => setActiveModal('farm')}
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <Sprout size={20} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <h4 className="font-extrabold text-sm text-textdark">Farm Settings</h4>
              <p className="text-xs text-textmuted font-medium">Crop, location, units</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-textmuted group-hover:text-primary transition-colors" />
        </Card>

        {/* 4. Language */}
        <Card 
          onClick={() => setActiveModal('language')}
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <Globe size={20} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <h4 className="font-extrabold text-sm text-textdark">Language</h4>
              <p className="text-xs text-textmuted font-medium">Selected: <span className="text-primary font-bold">{language}</span></p>
            </div>
          </div>
          <ChevronRight size={16} className="text-textmuted group-hover:text-primary transition-colors" />
        </Card>

        {/* 5. Privacy */}
        <Card 
          onClick={() => setActiveModal('privacy')}
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <Shield size={20} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <h4 className="font-extrabold text-sm text-textdark">Privacy</h4>
              <p className="text-xs text-textmuted font-medium">Data sharing and privacy</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-textmuted group-hover:text-primary transition-colors" />
        </Card>

        {/* 6. Help & Support */}
        <Card 
          onClick={() => navigate('/contact-us')}
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <HelpCircle size={20} className="stroke-[2.5]" />
            </div>
            <div className="space-y-0.5 text-left">
              <h4 className="font-extrabold text-sm text-textdark">Help & Support</h4>
              <p className="text-xs text-textmuted font-medium">FAQ, Contact, About</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-textmuted group-hover:text-primary transition-colors" />
        </Card>

      </div>

      {/* --- MODAL DIALOG OVERLAYS --- */}

      {/* 1. Notifications Modal */}
      {activeModal === 'notifications' && (
        <div 
          onClick={() => setActiveModal(null)} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-sm w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 p-1 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none mb-4">
              <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                <Bell size={20} className="stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-textdark tracking-tight">Notification Alerts</h3>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-5 py-2">
              {/* Fertilizer Reminders */}
              <div className="flex items-center justify-between text-xs text-textdark">
                <div className="space-y-0.5 text-left">
                  <span className="font-bold block">Fertilizer Reminders</span>
                  <span className="text-[10px] text-textmuted font-semibold block">Schedules and soil application stages</span>
                </div>
                <button
                  onClick={() => toggleAlert('fertilizer')}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
                    alerts.fertilizer ? 'bg-primary' : 'bg-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${
                    alerts.fertilizer ? 'right-1' : 'left-1'
                  }`}></span>
                </button>
              </div>

              {/* Disease Alerts */}
              <div className="flex items-center justify-between text-xs text-textdark">
                <div className="space-y-0.5 text-left">
                  <span className="font-bold block">Disease Alerts</span>
                  <span className="text-[10px] text-textmuted font-semibold block">Real-time alerts for diagnostic issues</span>
                </div>
                <button
                  onClick={() => toggleAlert('disease')}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
                    alerts.disease ? 'bg-primary' : 'bg-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${
                    alerts.disease ? 'right-1' : 'left-1'
                  }`}></span>
                </button>
              </div>

              {/* Weekly Reports */}
              <div className="flex items-center justify-between text-xs text-textdark">
                <div className="space-y-0.5 text-left">
                  <span className="font-bold block">Weekly Reports</span>
                  <span className="text-[10px] text-textmuted font-semibold block">Weekly summaries of environmental metrics</span>
                </div>
                <button
                  onClick={() => toggleAlert('weekly')}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
                    alerts.weekly ? 'bg-primary' : 'bg-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${
                    alerts.weekly ? 'right-1' : 'left-1'
                  }`}></span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setActiveModal(null)}
                className="font-bold px-6 py-2"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Language Modal */}
      {activeModal === 'language' && (
        <div 
          onClick={() => setActiveModal(null)} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-sm w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 p-1 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none mb-4">
              <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                <Globe size={20} className="stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-textdark tracking-tight">Select Language</h3>
            </div>

            {/* List options */}
            <div className="space-y-2 py-2 text-xs text-textdark">
              {['English'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`w-full flex items-center justify-between p-3.5 border rounded-xl hover:bg-slate-50 font-bold transition-all ${
                    language === lang 
                      ? 'border-primary bg-lightgreen text-primary' 
                      : 'border-slate-150'
                  }`}
                >
                  <span>{lang}</span>
                  {language === lang && <Check size={15} className="stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Farm Settings Modal */}
      {activeModal === 'farm' && (
        <div 
          onClick={() => setActiveModal(null)} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-sm w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 p-1 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none mb-4">
              <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                <Sprout size={20} className="stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-textdark tracking-tight">Farm Settings</h3>
            </div>

            <p className="text-xs text-textdark font-semibold leading-relaxed py-2">
              Acreage, location coordinates, and primary cultivated crop settings are synchronized with your User Profile.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between gap-3">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setActiveModal(null)}
                className="font-bold px-4 py-2"
              >
                Close
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => {
                  setActiveModal(null);
                  navigate('/profile');
                }}
                className="font-bold px-4 py-2"
              >
                Go to Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Privacy Modal */}
      {activeModal === 'privacy' && (
        <div 
          onClick={() => setActiveModal(null)} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-sm w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 p-1 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none mb-4">
              <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                <Shield size={20} className="stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-textdark tracking-tight">Privacy Policy</h3>
            </div>

            <p className="text-xs text-textdark font-semibold leading-relaxed py-2">
              Your farm details, diagnostic scans, and soil metrics are processed locally inside the application and never shared without permission. All storage is secure.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setActiveModal(null)}
                className="font-bold px-6 py-2"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
