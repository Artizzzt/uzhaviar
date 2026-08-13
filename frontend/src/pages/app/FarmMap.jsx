import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../../components/Button';
import {
  ArrowLeft,
  Plus,
  Minus,
  MapPin,
  Sprout,
  X,
  Calendar,
  Info
} from 'lucide-react';

const FarmMap = () => {
  const { user } = useApp();

  const [zoom, setZoom] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.75));
  };

  // Mock Map Vector background grid
  const MapVectorGrid = () => (
    <div className="absolute inset-0 bg-[#f4faf7] bg-[radial-gradient(#d1fae5_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden flex items-center justify-center select-none">

      {/* Field boundaries */}
      <div className="absolute w-[600px] h-[400px] border border-dashed border-green-200/50 pointer-events-none rounded-2xl"></div>

      {/* Farm Plots */}
      <div className="absolute top-1/4 left-1/6 w-44 h-24 bg-green-100/40 border border-green-200/60 rounded-xl flex items-center justify-center rotate-3 transform shadow-sm">
        <span className="text-[10px] font-bold text-green-700/50 uppercase tracking-widest">
          Sector A - Rice
        </span>
      </div>

      <div className="absolute top-1/3 right-1/4 w-48 h-32 bg-amber-50/30 border border-amber-200/60 rounded-xl flex items-center justify-center -rotate-6 transform shadow-sm">
        <span className="text-[10px] font-bold text-amber-700/50 uppercase tracking-widest">
          Sector B - Wheat
        </span>
      </div>

      <div className="absolute bottom-1/4 left-1/3 w-56 h-28 bg-emerald-100/30 border border-emerald-200/50 rounded-xl flex items-center justify-center rotate-1 transform shadow-sm">
        <span className="text-[10px] font-bold text-emerald-700/50 uppercase tracking-widest">
          Sector C - Vegetables
        </span>
      </div>

      {/* Simulated Canal */}
      <div className="absolute h-4 left-0 right-0 bg-blue-50/40 border-y border-blue-100/50 top-2/3 -rotate-3 -z-10"></div>
    </div>
  );

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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-black text-textdark tracking-tight">
              Farm Map
            </h1>

            <p className="text-xs text-textmuted font-semibold mt-0.5">
              {user?.location || 'Location not set'} &bull;{' '}
              {user?.landArea || '-- acres'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAP AREA CONTAINER */}
      <div className="relative bg-slate-100 rounded-card border border-slate-200 overflow-hidden shadow-soft h-[500px]">

        {/* Map Background */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center'
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/farm_satellite_map.png)'
            }}
          />
        </div>

        {/* Google Maps Badge */}
        <div className="absolute top-4 left-4 z-10 select-none">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[10px] font-extrabold text-textdark bg-white/90 backdrop-blur-sm border border-slate-200 px-2.5 py-1 rounded-full shadow-sm hover:bg-white hover:text-primary transition-all"
          >
            <MapPin size={11} className="text-primary" />
            Maps &nearr;
          </a>
        </div>

        {/* MAP ZOOM CONTROLS */}
        <div className="absolute top-4 right-4 z-10 select-none">

          <div className="flex flex-col bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm overflow-hidden">

            {/* Zoom In */}
            <button
              onClick={handleZoomIn}
              className="p-2.5 hover:bg-slate-50 text-textdark hover:text-primary border-b border-slate-100 transition-colors focus:outline-none"
              title="Zoom In"
            >
              <Plus size={14} className="stroke-[2.5]" />
            </button>

            {/* Zoom Out */}
            <button
              onClick={handleZoomOut}
              className="p-2.5 hover:bg-slate-50 text-textdark hover:text-primary transition-colors focus:outline-none"
              title="Zoom Out"
            >
              <Minus size={14} className="stroke-[2.5]" />
            </button>

          </div>

        </div>

        {/* CENTERED FARM MARKER & DETAILS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">

          <div className="flex flex-col items-center pointer-events-auto">

            {/* Animating Pulse Pin */}
            <div className="relative flex items-center justify-center">

              <div className="absolute w-8 h-8 bg-danger/30 rounded-full animate-ping"></div>

              <div className="w-10 h-10 bg-white border-2 border-danger text-danger rounded-full flex items-center justify-center shadow-lg relative z-10 hover:scale-105 active:scale-95 transition-transform cursor-pointer">

                <Sprout
                  size={18}
                  className="stroke-[2.5]"
                />

              </div>

            </div>

            {/* Floating Details Pill */}
            <div className="mt-3.5 bg-white border border-slate-200 rounded-full shadow-md py-1.5 px-4 flex items-center gap-2 select-none hover:bg-slate-50 transition-colors">

              <span className="text-[10px] font-bold text-textdark uppercase tracking-wider">
                {user?.name || 'Farmer'}'s Plot
              </span>

              <div className="h-3 w-px bg-slate-200"></div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[10px] font-extrabold text-primary hover:underline focus:outline-none"
              >
                View Details
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* 3. FARM DETAILS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white border border-slate-200 rounded-card shadow-2xl max-w-md w-full p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 select-none">

              <div className="flex items-center gap-2 text-primary">

                <Info
                  size={18}
                  className="stroke-[2.5]"
                />

                <h3 className="text-base font-black text-textdark tracking-tight">
                  Farm Verification Details
                </h3>

              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-50 text-textmuted hover:text-danger rounded-lg transition-colors focus:outline-none"
              >
                <X
                  size={16}
                  className="stroke-[2.5]"
                />
              </button>

            </div>

            {/* Modal Fields */}
            <div className="space-y-3.5 text-xs text-textdark">

              {/* Farmer */}
              <div className="flex justify-between items-center py-0.5">

                <span className="text-textmuted font-semibold">
                  Farmer Name
                </span>

                <span className="font-bold">
                  {user?.name || 'Farmer'}
                </span>

              </div>

              {/* Location */}
              <div className="flex justify-between items-center py-0.5">

                <span className="text-textmuted font-semibold">
                  Farm Location
                </span>

                <span className="font-bold">
                  {user?.location || 'Coimbatore, Tamil Nadu'}
                </span>

              </div>

              {/* Crop Type */}
              <div className="flex justify-between items-center py-0.5">

                <span className="text-textmuted font-semibold">
                  Crop Cultivated
                </span>

                <span className="font-bold text-primary">
                  {user?.cropType || 'Wheat'}
                </span>

              </div>

              {/* Total Area */}
              <div className="flex justify-between items-center py-0.5">

                <span className="text-textmuted font-semibold">
                  Total Area
                </span>

                <span className="font-bold">
                  {user?.landArea || '5 acres'}
                </span>

              </div>

              {/* Soil Type */}
              <div className="flex justify-between items-center py-0.5">

                <span className="text-textmuted font-semibold">
                  Soil Composition
                </span>

                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 font-mono">
                  Loamy
                </span>

              </div>

              {/* Last Surveyed */}
              <div className="flex justify-between items-center py-0.5">

                <span className="text-textmuted font-semibold">
                  Last Survey Date
                </span>

                <div className="flex items-center gap-1 text-[11px] font-bold text-textdark">

                  <Calendar
                    size={13}
                    className="text-primary shrink-0"
                  />

                  <span>
                    June 25, 2026
                  </span>

                </div>

              </div>

            </div>

            {/* Close Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="font-bold px-6"
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

export default FarmMap;