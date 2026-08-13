import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Card';
import Button from '../../components/Button';
import {
  ArrowLeft,
  User,
  Bell,
  Globe,
  ChevronRight,
  X
} from 'lucide-react';

const Settings = () => {
  const { user, notificationPreferences, updateUserPreferences } = useApp();
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(null);

  const toggleAlert = (key) => {
    updateUserPreferences({
      ...notificationPreferences,
      farmerId: user?.id || "FRM-2026-979",
      [key]: !notificationPreferences[key]
    });
  };

  const handleBackClick = () => {
    if (activeModal) {
      setActiveModal(null);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-6 font-sans">

      {/* PAGE HEADER */}
      <div className="space-y-1.5">

        <button
          onClick={handleBackClick}
          className="text-xs font-bold text-primary hover:text-green-700 flex items-center gap-1.5 transition-colors select-none focus:outline-none"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          {activeModal ? 'Back' : 'Back to Dashboard'}
        </button>

        <h1 className="text-2xl font-black text-textdark tracking-tight">
          Settings
        </h1>

        <p className="text-xs text-textmuted font-semibold mt-0.5">
          Farmer ID:{' '}
          <span className="font-mono">
            {user?.id || 'FRM-2026-979'}
          </span>
        </p>

      </div>

      {/* SETTINGS OPTIONS */}
      <div className="flex flex-col gap-4 select-none">

        {/* PROFILE */}
        <Card
          onClick={() => navigate('/profile')}
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
        >

          <div className="flex items-center gap-4">

            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <User
                size={20}
                className="stroke-[2.5]"
              />
            </div>

            <div className="space-y-0.5 text-left">

              <h4 className="font-extrabold text-sm text-textdark">
                Profile
              </h4>

              <p className="text-xs text-textmuted font-medium">
                View and edit your profile
              </p>

            </div>

          </div>

          <ChevronRight
            size={16}
            className="text-textmuted group-hover:text-primary transition-colors"
          />

        </Card>


        {/* NOTIFICATIONS */}
        <Card
          onClick={() => setActiveModal('notifications')}
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
        >

          <div className="flex items-center gap-4">

            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <Bell
                size={20}
                className="stroke-[2.5]"
              />
            </div>

            <div className="space-y-0.5 text-left">

              <h4 className="font-extrabold text-sm text-textdark">
                Notifications
              </h4>

              <p className="text-xs text-textmuted font-medium">
                Manage alert preferences
              </p>

            </div>

          </div>

          <ChevronRight
            size={16}
            className="text-textmuted group-hover:text-primary transition-colors"
          />

        </Card>


        {/* LANGUAGE */}
        <Card
          className="flex items-center justify-between p-5 border border-slate-100 shadow-soft"
        >

          <div className="flex items-center gap-4">

            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
              <Globe
                size={20}
                className="stroke-[2.5]"
              />
            </div>

            <div className="space-y-0.5 text-left">

              <h4 className="font-extrabold text-sm text-textdark">
                Language
              </h4>

              <p className="text-xs text-textmuted font-medium">
                Language:{' '}
                <span className="text-primary font-bold">
                  English
                </span>
              </p>

            </div>

          </div>

        </Card>

      </div>


      {/* NOTIFICATIONS MODAL */}
      {activeModal === 'notifications' && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-sm w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
            >
              <X
                size={16}
                className="stroke-[2.5]"
              />
            </button>


            {/* MODAL HEADER */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none mb-4">

              <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                <Bell
                  size={20}
                  className="stroke-[2.5]"
                />
              </div>

              <h3 className="text-base font-black text-textdark tracking-tight">
                Notification Alerts
              </h3>

            </div>


            {/* FERTILIZER REMINDERS */}
            <div className="space-y-5 py-2">

              <div className="flex items-center justify-between text-xs text-textdark">

                <div className="space-y-0.5 text-left">

                  <span className="font-bold block">
                    Fertilizer Reminders
                  </span>

                  <span className="text-[10px] text-textmuted font-semibold block">
                    Schedules and soil application stages
                  </span>

                </div>

                <button
                  onClick={() => toggleAlert('fertilizer')}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
                    notificationPreferences.fertilizer
                      ? 'bg-primary'
                      : 'bg-slate-200'
                  }`}
                >

                  <span
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${
                      notificationPreferences.fertilizer
                        ? 'right-1'
                        : 'left-1'
                    }`}
                  />

                </button>

              </div>


              {/* DISEASE ALERTS */}
              <div className="flex items-center justify-between text-xs text-textdark">

                <div className="space-y-0.5 text-left">

                  <span className="font-bold block">
                    Disease Alerts
                  </span>

                  <span className="text-[10px] text-textmuted font-semibold block">
                    Real-time alerts for diagnostic issues
                  </span>

                </div>

                <button
                  onClick={() => toggleAlert('disease')}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
                    notificationPreferences.disease
                      ? 'bg-primary'
                      : 'bg-slate-200'
                  }`}
                >

                  <span
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${
                      notificationPreferences.disease
                        ? 'right-1'
                        : 'left-1'
                    }`}
                  />

                </button>

              </div>


              {/* WEEKLY REPORTS */}
              <div className="flex items-center justify-between text-xs text-textdark">

                <div className="space-y-0.5 text-left">

                  <span className="font-bold block">
                    Weekly Reports
                  </span>

                  <span className="text-[10px] text-textmuted font-semibold block">
                    Weekly summaries of environmental metrics
                  </span>

                </div>

                <button
                  onClick={() => toggleAlert('weekly')}
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
                    notificationPreferences.weekly
                      ? 'bg-primary'
                      : 'bg-slate-200'
                  }`}
                >

                  <span
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${
                      notificationPreferences.weekly
                        ? 'right-1'
                        : 'left-1'
                    }`}
                  />

                </button>

              </div>

            </div>




          </div>

        </div>
      )}

    </div>
  );
};

export default Settings;