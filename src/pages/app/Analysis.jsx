import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { analysisData } from '../../data/mockData';
import { Card } from '../../components/Card';

import { 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  ArrowLeft, 
  ChevronRight, 
  TrendingUp, 
  Activity, 
  BarChart3,
  Calendar,
  X
} from 'lucide-react';

const Analysis = () => {
  const { user } = useApp();
  const [expandedChart, setExpandedChart] = React.useState(null);

  // Generate current dynamically formatted Month Year
  const currentMonthYear = new Date().toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric'
  });

  const renderChartModal = () => {
    if (!expandedChart) return null;

    let chartTitle = "";
    let chartComponent = null;

    switch (expandedChart) {
      case 'cropHealth':
        chartTitle = "Crop Health — Wheat";
        chartComponent = (
          <LineChart data={analysisData.cropHealthTrend} margin={{ top: 20, right: 30, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
              labelClassName="font-bold text-textdark text-[11px]" 
              itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#16a34a' }}
            />
            <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3.5} dot={{ r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        );
        break;
      case 'fertilizer':
        chartTitle = "Fertilizer Usage (kg)";
        chartComponent = (
          <AreaChart data={analysisData.fertilizerTrend} margin={{ top: 20, right: 30, left: -10, bottom: 10 }}>
            <defs>
              <linearGradient id="colorFertilizerModal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 140]} stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
              labelClassName="font-bold text-textdark text-[11px]" 
              itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#ea580c' }}
            />
            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3.5} fillOpacity={1} fill="url(#colorFertilizerModal)" />
          </AreaChart>
        );
        break;
      case 'soilMoisture':
        chartTitle = "Soil Moisture";
        chartComponent = (
          <AreaChart data={analysisData.soilMoistureTrend} margin={{ top: 20, right: 30, left: -10, bottom: 10 }}>
            <defs>
              <linearGradient id="colorMoistureModal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 80]} stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
              labelClassName="font-bold text-textdark text-[11px]" 
              itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#2563eb' }}
            />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3.5} fillOpacity={1} fill="url(#colorMoistureModal)" />
          </AreaChart>
        );
        break;
      case 'disease':
        chartTitle = "Disease History — Cases";
        chartComponent = (
          <LineChart data={analysisData.diseaseHistory} margin={{ top: 20, right: 30, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 3]} stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
              labelClassName="font-bold text-textdark text-[11px]" 
              itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444' }}
            />
            <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3.5} dot={{ r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        );
        break;
      case 'yieldEstimation':
        chartTitle = "Yield Estimation";
        chartComponent = (
          <LineChart data={analysisData.yieldEstimation} margin={{ top: 20, right: 30, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
              labelClassName="font-bold text-textdark text-[11px]" 
            />
            <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
            <Line type="monotone" name="Actual" dataKey="actual" stroke="#16a34a" strokeWidth={3.5} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            <Line type="monotone" name="Estimated" dataKey="estimated" stroke="#9ca3af" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4 }} />
          </LineChart>
        );
        break;
      default:
        return null;
    }

    return (
      <div 
        onClick={() => setExpandedChart(null)}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-4xl w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Close X */}
          <button 
            onClick={() => setExpandedChart(null)}
            className="absolute top-4 right-4 p-1.5 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
          >
            <X size={16} className="stroke-[2.5]" />
          </button>

          {/* Title Header */}
          <div className="pb-4 border-b border-slate-100 select-none mb-6 text-left">
            <h3 className="text-base font-black text-textdark tracking-tight">{chartTitle}</h3>
          </div>

          {/* Chart Display */}
          <div className="w-full" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartComponent}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. PAGE HEADER */}
      <div className="space-y-1.5">
        <Link 
          to="/dashboard" 
          className="text-xs font-bold text-primary hover:text-green-700 flex items-center gap-1.5 transition-colors select-none"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-black text-textdark tracking-tight">
          Analysis & Reports
        </h1>
        <p className="text-xs text-textmuted font-semibold">
          Farm Area: {user?.landArea || '-- acres'}
        </p>
      </div>

      {/* 2. FARM PERFORMANCE SUMMARY BANNER */}
      <div className="bg-darkgreen rounded-card p-6 text-white shadow-soft relative overflow-hidden select-none border border-green-950">
        <div className="absolute inset-0 bg-[radial-gradient(#ecfdf5_1px,transparent_1px)] opacity-5 [background-size:16px_16px]"></div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full filter blur-xl"></div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Calendar size={16} className="text-[#86efac]" />
            <h2 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider">
              Farm Performance Summary &mdash; <span className="text-[#86efac]">{currentMonthYear}</span>
            </h2>
          </div>

          {/* 4 Stat Tiles Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Crop Health</span>
              <span className="text-xl font-extrabold text-[#86efac] block mt-1">85%</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Yield Estimate</span>
              <span className="text-xl font-extrabold text-[#86efac] block mt-1">12.5 Q</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Fertilizer Used</span>
              <span className="text-xl font-extrabold text-[#86efac] block mt-1">53 kg</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Disease Cases</span>
              <span className="text-xl font-extrabold text-[#86efac] block mt-1">3 this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CHARTS GRID (2-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Crop Health — Wheat (Line Chart) */}
        <Card className="p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-slate-150 mb-4 select-none">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <h3 className="font-extrabold text-sm text-textdark">Crop Health &mdash; Wheat</h3>
            </div>
            <ChevronRight 
              size={15} 
              className="text-textmuted cursor-pointer hover:text-primary transition-colors" 
              onClick={() => setExpandedChart('cropHealth')}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analysisData.cropHealthTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
                labelClassName="font-bold text-textdark text-[10px]" 
                itemStyle={{ fontSize: '11px', fontWeight: 'bold', color: '#16a34a' }}
              />
              <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Card 2: Fertilizer Usage (Area Chart) */}
        <Card className="p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-slate-150 mb-4 select-none">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-warning" />
              <h3 className="font-extrabold text-sm text-textdark">Fertilizer Usage (kg)</h3>
            </div>
            <ChevronRight 
              size={15} 
              className="text-textmuted cursor-pointer hover:text-warning transition-colors" 
              onClick={() => setExpandedChart('fertilizer')}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={analysisData.fertilizerTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorFertilizer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis domain={[0, 140]} stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
                labelClassName="font-bold text-textdark text-[10px]" 
                itemStyle={{ fontSize: '11px', fontWeight: 'bold', color: '#ea580c' }}
              />
              <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorFertilizer)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Card 3: Soil Moisture (Area Chart) */}
        <Card className="p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-slate-150 mb-4 select-none">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              <h3 className="font-extrabold text-sm text-textdark">Soil Moisture</h3>
            </div>
            <ChevronRight 
              size={15} 
              className="text-textmuted cursor-pointer hover:text-blue-500 transition-colors" 
              onClick={() => setExpandedChart('soilMoisture')}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={analysisData.soilMoistureTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis domain={[0, 80]} stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
                labelClassName="font-bold text-textdark text-[10px]" 
                itemStyle={{ fontSize: '11px', fontWeight: 'bold', color: '#2563eb' }}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMoisture)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Card 4: Disease History — Cases (Line Chart) */}
        <Card className="p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-slate-150 mb-4 select-none">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-danger" />
              <h3 className="font-extrabold text-sm text-textdark">Disease History &mdash; Cases</h3>
            </div>
            <ChevronRight 
              size={15} 
              className="text-textmuted cursor-pointer hover:text-danger transition-colors" 
              onClick={() => setExpandedChart('disease')}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analysisData.diseaseHistory} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis domain={[0, 3]} stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
                labelClassName="font-bold text-textdark text-[10px]" 
                itemStyle={{ fontSize: '11px', fontWeight: 'bold', color: '#ef4444' }}
              />
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Card 5: Yield Estimation (Double Line Chart) */}
        <Card className="p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-slate-150 mb-4 select-none">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <h3 className="font-extrabold text-sm text-textdark">Yield Estimation</h3>
            </div>
            <ChevronRight 
              size={15} 
              className="text-textmuted cursor-pointer hover:text-primary transition-colors" 
              onClick={() => setExpandedChart('yieldEstimation')}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analysisData.yieldEstimation} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
                labelClassName="font-bold text-textdark text-[10px]" 
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
              <Line type="monotone" name="Actual" dataKey="actual" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" name="Estimated" dataKey="estimated" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Card 6: Soil Nutrients (NPK Progress Bars) */}
        <Card className="p-5 border border-slate-100 shadow-soft flex flex-col justify-between">
          <div className="pb-4 border-b border-slate-150 mb-4 select-none">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-primary" />
              <h3 className="font-extrabold text-sm text-textdark">Soil Nutrients (NPK)</h3>
            </div>
          </div>
          
          <div className="space-y-5 py-2">
            {/* Nitrogen */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold select-none">
                <span className="text-textdark">Nitrogen (N)</span>
                <span className="text-blue-600">{analysisData.soilNutrients.nitrogen}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                  style={{ width: `${analysisData.soilNutrients.nitrogen}%` }}
                ></div>
              </div>
            </div>

            {/* Phosphorus */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold select-none">
                <span className="text-textdark">Phosphorus (P)</span>
                <span className="text-warning">{analysisData.soilNutrients.phosphorus}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-warning rounded-full transition-all duration-500" 
                  style={{ width: `${analysisData.soilNutrients.phosphorus}%` }}
                ></div>
              </div>
            </div>

            {/* Potassium */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold select-none">
                <span className="text-textdark">Potassium (K)</span>
                <span className="text-primary">{analysisData.soilNutrients.potassium}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${analysisData.soilNutrients.potassium}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-textmuted font-semibold border-t border-slate-100 pt-3 mt-3 select-none">
            Status: Nutrient composition is within optimal levels.
          </div>
        </Card>

      </div>

      {renderChartModal()}

    </div>
  );
};

export default Analysis;
