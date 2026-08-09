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
        {pesticidesList.map((pest) => (
          <Card 
            key={pest.id} 
            className="hover:translate-y-[-2px] transition-transform duration-200 flex flex-col justify-between h-full border border-slate-100 p-6"
          >
            <div>
              {/* Card Header (Flask Icon + Name) */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none">
                <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                  <FlaskConical size={20} className="stroke-[2.5]" />
                </div>
                <h3 className="font-extrabold text-base text-textdark leading-snug">
                  {pest.name}
                </h3>
              </div>

              {/* Card Field Rows */}
              <div className="py-5 space-y-3.5 text-xs text-textdark">
                {/* Quantity */}
                <div className="flex justify-between items-center">
                  <span className="text-textmuted font-semibold">Quantity</span>
                  <span className="font-bold">{pest.quantity}</span>
                </div>

                {/* Cost */}
                <div className="flex justify-between items-center">
                  <span className="text-textmuted font-semibold">Cost</span>
                  <span className="font-bold">{pest.cost}</span>
                </div>

                {/* Best Time */}
                <div className="flex justify-between items-center">
                  <span className="text-textmuted font-semibold">Best Time</span>
                  <span className="font-bold text-right">{pest.bestTime}</span>
                </div>
              </div>
            </div>

            {/* View Details Button */}
            <div className="pt-2">
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
        ))}
      </div>

      {/* 3. VIEW DETAILS MODAL */}
      {selectedPesticide && (
        <div 
          onClick={() => setSelectedPesticide(null)} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          {/* Modal Box */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-lg w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedPesticide(null)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
              title="Close Dialog"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            {/* Header Block */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 select-none pr-8">
              <div className="p-3 bg-lightgreen text-primary rounded-xl shrink-0">
                <FlaskConical size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-lg font-black text-textdark tracking-tight leading-snug">
                  {selectedPesticide.name}
                </h2>
                <p className="text-[10px] text-textmuted uppercase tracking-widest font-bold mt-0.5">
                  Chemical Specifications
                </p>
              </div>
            </div>

            {/* Content Details */}
            <div className="py-5 space-y-4 text-xs text-textdark max-h-[60vh] overflow-y-auto pr-1">
              
              {/* Summary Parameters Row */}
              <div className="grid grid-cols-3 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4 text-center select-none">
                <div>
                  <span className="text-textmuted block text-[10px] uppercase font-bold tracking-wider mb-1">Quantity</span>
                  <span className="font-extrabold text-textdark text-xs">{selectedPesticide.quantity}</span>
                </div>
                <div>
                  <span className="text-textmuted block text-[10px] uppercase font-bold tracking-wider mb-1">Cost</span>
                  <span className="font-extrabold text-primary text-xs">{selectedPesticide.cost}</span>
                </div>
                <div>
                  <span className="text-textmuted block text-[10px] uppercase font-bold tracking-wider mb-1">Best Time</span>
                  <span className="font-extrabold text-textdark text-[11px] leading-tight block">{selectedPesticide.bestTime}</span>
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
      )}



    </div>
  );
};

export default SmartSpray;
