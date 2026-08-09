import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { pesticides as mockPesticides } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Card';
import Button from '../../components/Button';

import { 
  ArrowLeft, 
  FlaskConical, 
  X, 
  ShieldAlert, 
  ClipboardList, 
  Activity 
} from 'lucide-react';

// Maps pesticide name to high-quality internet image URL (hlink)
const getPesticideImage = (name) => {
  if (!name) return 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80';
  const n = name.toLowerCase();
  if (n.includes('mancozeb')) {
    return 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80'; // close up leaf spraying (200 OK)
  }
  if (n.includes('chlorpyrifos')) {
    return 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80'; // plant chemistry (200 OK)
  }
  if (n.includes('carbendazim')) {
    return 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80'; // green leaves (200 OK)
  }
  if (n.includes('tricyclazole')) {
    return 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80'; // field sprayer (200 OK)
  }
  if (n.includes('copper') || n.includes('oxychloride')) {
    return 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'; // agriculture hands / test tube (200 OK)
  }
  if (n.includes('thiophanate') || n.includes('methyl')) {
    return 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80'; // green foliage (200 OK)
  }
  return 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80'; // fallback
};

const SmartSpray = () => {
  const { pesticides: livePesticides } = useApp();
  const pesticidesList = (livePesticides && livePesticides.length > 0) ? livePesticides : mockPesticides;
  const [selectedPesticide, setSelectedPesticide] = useState(null);

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
          Smart Spray &mdash; Pesticide Control
        </h1>
        <p className="text-xs text-textmuted font-semibold">
          Optimized spray quantities, schedules, and application safety guides.
        </p>
      </div>

      {/* 2. PESTICIDES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pesticidesList.map((pest) => {
          const name = pest.name || pest.pesticide;
          const quantity = pest.quantity || pest.dosage;
          const bestTime = pest.bestTime || pest.sprayTime;

          return (
            <Card 
              key={pest.id} 
              className="hover:translate-y-[-2px] transition-transform duration-200 flex flex-col justify-between h-full border border-slate-100 overflow-hidden"
            >
              <div>
                {/* Cover Image */}
                <div className="h-44 w-full overflow-hidden relative select-none">
                  <img 
                    src={getPesticideImage(name)} 
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-black text-primary tracking-wider uppercase shadow-sm">
                    {pest.status || "Recommended"}
                  </div>
                </div>

                {/* Card Content Wrapper */}
                <div className="p-6">
                  {/* Card Header (Flask Icon + Name) */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none">
                    <div className="p-2.5 bg-lightgreen text-primary rounded-lg shrink-0">
                      <FlaskConical size={16} className="stroke-[2.5]" />
                    </div>
                    <h3 className="font-extrabold text-base text-textdark leading-snug">
                      {name}
                    </h3>
                  </div>

                  {/* Card Field Rows */}
                  <div className="py-5 space-y-3.5 text-xs text-textdark">
                    {/* Quantity */}
                    <div className="flex justify-between items-center">
                      <span className="text-textmuted font-semibold">Quantity</span>
                      <span className="font-bold">{quantity}</span>
                    </div>

                    {/* Cost */}
                    <div className="flex justify-between items-center">
                      <span className="text-textmuted font-semibold">Cost</span>
                      <span className="font-bold">{pest.cost}</span>
                    </div>

                    {/* Best Time */}
                    <div className="flex justify-between items-center">
                      <span className="text-textmuted font-semibold">Best Time</span>
                      <span className="font-bold text-right">{bestTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <div className="px-6 pb-6 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full font-bold bg-lightgreen text-primary border border-green-200/50 hover:bg-green-150 py-3"
                  onClick={() => setSelectedPesticide(pest)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. VIEW DETAILS MODAL */}
      {selectedPesticide && (() => {
        const name = selectedPesticide.name || selectedPesticide.pesticide;
        const quantity = selectedPesticide.quantity || selectedPesticide.dosage;
        const bestTime = selectedPesticide.bestTime || selectedPesticide.sprayTime;

        return (
          <div 
            onClick={() => setSelectedPesticide(null)} 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Box */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-lg w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Modal Cover Image */}
              <div className="h-48 w-full overflow-hidden relative select-none">
                <img 
                  src={getPesticideImage(name)} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
                {/* Top Close Button */}
                <button
                  onClick={() => setSelectedPesticide(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-900/50 hover:bg-slate-900/70 text-white rounded-full transition-colors focus:outline-none"
                  title="Close Dialog"
                >
                  <X size={16} className="stroke-[2.5]" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Header Block */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none pr-8">
                  <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                    <FlaskConical size={22} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-textdark tracking-tight leading-snug">
                      {name}
                    </h2>
                    <p className="text-[10px] text-textmuted uppercase tracking-widest font-bold mt-0.5">
                      Chemical Specifications
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="space-y-4 text-xs text-textdark max-h-[40vh] overflow-y-auto pr-1">
                  
                  {/* Summary Parameters Row */}
                  <div className="grid grid-cols-3 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4 text-center select-none">
                    <div>
                      <span className="text-textmuted block text-[10px] uppercase font-bold tracking-wider mb-1">Quantity</span>
                      <span className="font-extrabold text-textdark text-xs">{quantity}</span>
                    </div>
                    <div>
                      <span className="text-textmuted block text-[10px] uppercase font-bold tracking-wider mb-1">Cost</span>
                      <span className="font-extrabold text-primary text-xs">{selectedPesticide.cost}</span>
                    </div>
                    <div>
                      <span className="text-textmuted block text-[10px] uppercase font-bold tracking-wider mb-1">Best Time</span>
                      <span className="font-extrabold text-textdark text-[11px] leading-tight block">{bestTime}</span>
                    </div>
                  </div>

                  {/* Target Pests Field */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-textdark uppercase tracking-wider text-[10px] flex items-center gap-1.5 text-textmuted">
                      <Activity size={13} className="text-primary shrink-0" />
                      Target Pests
                    </h4>
                    <p className="pl-5 leading-relaxed font-semibold text-textdark">
                      {selectedPesticide.targetPests}
                    </p>
                  </div>

                  {/* Method Field */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-textdark uppercase tracking-wider text-[10px] flex items-center gap-1.5 text-textmuted">
                      <ClipboardList size={13} className="text-primary shrink-0" />
                      Application Method
                    </h4>
                    <p className="pl-5 leading-relaxed font-semibold text-textdark">
                      {selectedPesticide.method}
                    </p>
                  </div>

                  {/* Precautions Field */}
                  <div className="space-y-1 bg-red-50/40 border border-red-100 rounded-xl p-3.5">
                    <h4 className="font-bold text-danger uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1 select-none">
                      <ShieldAlert size={14} className="shrink-0" />
                      Safety Precautions
                    </h4>
                    <p className="leading-relaxed font-semibold text-textdark pl-5 text-[11px]">
                      {selectedPesticide.precautions}
                    </p>
                  </div>

                </div>

                {/* Footer Close Button */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="font-bold px-6 py-2.5"
                    onClick={() => setSelectedPesticide(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default SmartSpray;

