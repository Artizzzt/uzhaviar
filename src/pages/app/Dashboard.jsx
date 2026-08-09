import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useApp } from '../../context/AppContext';
import { dashboardData } from '../../data/mockData';
import { Card, StatCard } from '../../components/Card';
import Button from '../../components/Button';
import { 
  Sprout, 
  AlertTriangle, 
  Wind, 
  Thermometer, 
  Droplet, 
  CloudRain, 
  RefreshCw, 
  FlaskConical,
  ChevronRight,
  X
} from 'lucide-react';

const Dashboard = () => {
  const { user, farmers, diseases, pesticides } = useApp();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFertilizerModalOpen, setIsFertilizerModalOpen] = useState(false);

  const healthyCount = (farmers && farmers.length > 0) ? farmers.filter(f => f.status === 'Active').length : 4;
  const totalFarmers = (farmers && farmers.length > 0) ? farmers.length : 5;
  const healthyPercentage = Math.round((healthyCount / totalFarmers) * 100);
  const diseaseCount = (diseases && diseases.length > 0) ? diseases.length : 2;
  const sprayedCount = (pesticides && pesticides.length > 0) ? pesticides.filter(p => p.status === 'Applied').length : 1;

  const [envReadings, setEnvReadings] = useState({
    temperature: {
      value: dashboardData.environmentalConditions.temperature.value,
      avg: dashboardData.environmentalConditions.temperature.avg
    },
    humidity: {
      value: dashboardData.environmentalConditions.humidity.value,
      avg: dashboardData.environmentalConditions.humidity.avg
    },
    soilMoisture: {
      value: dashboardData.environmentalConditions.soilMoisture.value,
      avg: dashboardData.environmentalConditions.soilMoisture.avg
    }
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API fetch delay
    setTimeout(() => {
      setEnvReadings(prev => ({
        temperature: {
          value: Math.round((prev.temperature.value + (Math.random() - 0.5)) * 10) / 10,
          avg: 25.2
        },
        humidity: {
          value: Math.round((prev.humidity.value + (Math.random() - 0.5)) * 10) / 10,
          avg: 69
        },
        soilMoisture: {
          value: Math.round((prev.soilMoisture.value + (Math.random() - 0.5)) * 10) / 10,
          avg: 72
        }
      }));
      setIsRefreshing(false);
    }, 800);
  };

  // Generate dynamic date 4 days from today
  const getScheduledFertilizerDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. WELCOME BANNER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-textdark tracking-tight">
          Welcome, {user?.name || 'Farmer'}!
        </h1>
        <p className="text-xs text-textmuted font-medium">
          Here is your farm's status report and recommendation checklist.
        </p>
      </div>

      {/* 2. HERO CARD - "Your Farm is Thriving" */}
      <div className="relative overflow-hidden rounded-card bg-darkgreen text-white p-8 sm:p-10 shadow-soft">
        <div className="absolute inset-0 bg-gradient-to-r from-darkgreen via-darkgreen/90 to-primary/40 z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ecfdf5_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        {/* Decorative highlights */}
        <div className="absolute -right-16 -top-16 w-52 h-52 bg-primary/20 rounded-full filter blur-xl"></div>
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#86efac]/10 rounded-full filter blur-md"></div>
        
        <div className="relative z-10 space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#86efac] bg-white/5 border border-white/10 px-3 py-1 rounded-full select-none">
            Active Crop Monitoring
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight pt-2">
            Your Farm is Thriving
          </h2>
          <p className="text-slate-300 text-sm max-w-md leading-relaxed font-medium">
            Monitoring your crops &mdash; all systems healthy.
          </p>
        </div>
      </div>

      {/* 3. STAT CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Healthy Crops */}
        <StatCard
          icon={Sprout}
          label="Healthy Crops"
          value={`${healthyPercentage}%`}
          trend={`${healthyCount} out of ${totalFarmers} active farms`}
        />

        {/* Disease Detected */}
        <StatCard
          icon={AlertTriangle}
          label="Disease Detected"
          value={`${diseaseCount}`}
          trend={`${diseaseCount} reported crop disease cases`}
        />

        {/* Sprayed Areas */}
        <StatCard
          icon={Wind}
          label="Sprayed Areas"
          value={`${sprayedCount}`}
          trend={`${sprayedCount} confirmed pesticide applications`}
        />

      </div>

      {/* 4. FERTILIZER REMINDER BANNER */}
      <div className="bg-darkgreen border border-green-950 rounded-card p-6 text-white shadow-soft relative overflow-hidden flex flex-col sm:flex-row justify-between sm:items-center gap-4 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ecfdf5_1px,transparent_1px)] opacity-5 [background-size:16px_16px]"></div>
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 bg-white/5 border border-white/10 text-primary rounded-xl shrink-0 mt-0.5">
            <FlaskConical size={20} className="stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-white">Fertilizer Application Reminder</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-2xl">
              Apply 88 kg NPK 20-10-10 to your crop &mdash; next scheduled application: <span className="text-[#86efac] font-bold">{getScheduledFertilizerDate()}</span>
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsFertilizerModalOpen(true)}
          variant="secondary"
          size="sm"
          className="font-bold shrink-0 self-start sm:self-center pr-4 pl-4 bg-white hover:bg-slate-100 text-textdark py-2.5 relative z-10"
          icon={ChevronRight}
          iconPosition="right"
        >
          View
        </Button>
      </div>

      {/* 5. ENVIRONMENTAL CONDITIONS SECTION */}
      <div className="space-y-4">
        
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-black text-textdark tracking-tight">
            Environmental Conditions
          </h3>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-textdark focus:outline-none transition-all shadow-sm ${
              isRefreshing ? 'opacity-60' : 'active:scale-95'
            }`}
            title="Refresh Conditions"
          >
            <RefreshCw 
              size={14} 
              className={`stroke-[2.5] ${isRefreshing ? 'animate-spin text-primary' : 'text-textdark'}`} 
            />
          </button>
        </div>

        {/* Environmental Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Temperature */}
          <Card className="flex items-center justify-between p-5 border border-slate-100 relative overflow-hidden group hover:translate-y-[-2px] transition-transform duration-200">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-textmuted uppercase tracking-wider block">Temperature</span>
              <h4 className="text-2xl font-black text-textdark">{envReadings.temperature.value}°C</h4>
              <span className="text-[10px] text-textmuted font-semibold block">Avg {envReadings.temperature.avg}°C</span>
            </div>
            <div className="p-3 bg-red-50 text-danger rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <Thermometer size={20} className="stroke-[2.5]" />
            </div>
          </Card>

          {/* Humidity */}
          <Card className="flex items-center justify-between p-5 border border-slate-100 relative overflow-hidden group hover:translate-y-[-2px] transition-transform duration-200">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-textmuted uppercase tracking-wider block">Humidity</span>
              <h4 className="text-2xl font-black text-textdark">{envReadings.humidity.value}%</h4>
              <span className="text-[10px] text-textmuted font-semibold block">Avg {envReadings.humidity.avg}%</span>
            </div>
            <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <Droplet size={20} className="stroke-[2.5]" />
            </div>
          </Card>

          {/* Soil Moisture */}
          <Card className="flex items-center justify-between p-5 border border-slate-100 relative overflow-hidden group hover:translate-y-[-2px] transition-transform duration-200">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-textmuted uppercase tracking-wider block">Soil Moisture</span>
              <h4 className="text-2xl font-black text-textdark">{envReadings.soilMoisture.value}%</h4>
              <span className="text-[10px] text-textmuted font-semibold block">Avg {envReadings.soilMoisture.avg}%</span>
            </div>
            <div className="p-3 bg-amber-50 text-warning rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <CloudRain size={20} className="stroke-[2.5]" />
            </div>
          </Card>

        </div>

      </div>

      {/* Fertilizer Modal Overlay */}
      {isFertilizerModalOpen && (
        <div 
          onClick={() => setIsFertilizerModalOpen(false)} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-sm w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Close X */}
            <button 
              onClick={() => setIsFertilizerModalOpen(false)} 
              className="absolute top-4 right-4 p-1 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none mb-4">
              <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                <FlaskConical size={20} className="stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-textdark tracking-tight">Fertilizer Application</h3>
            </div>

            {/* Details List */}
            <div className="space-y-4 py-2 text-xs text-textdark text-left">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 select-none">
                <span className="text-textmuted font-semibold">Fertilizer Type</span>
                <span className="font-extrabold text-primary">NPK 20-10-10</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 select-none">
                <span className="text-textmuted font-semibold">Quantity</span>
                <span className="font-extrabold">88 kg</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 select-none">
                <span className="text-textmuted font-semibold">Scheduled Date</span>
                <span className="font-extrabold text-textdark">{getScheduledFertilizerDate()}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 select-none">
                <span className="text-textmuted font-semibold">Application Method</span>
                <span className="font-extrabold">Broadcast spreading</span>
              </div>
              <div className="space-y-1 pt-1.5">
                <span className="text-textmuted font-semibold block select-none">Important Note</span>
                <p className="text-[11px] text-textmuted leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                  Apply during early morning or evening for best absorption. Keep soil adequately irrigated before spreading operations.
                </p>
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setIsFertilizerModalOpen(false)}
                className="font-bold px-6 py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
