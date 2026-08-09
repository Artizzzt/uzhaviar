import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { cropDiseases as mockCropDiseases } from '../../data/mockData';
import { Card } from '../../components/Card';
import Button from '../../components/Button';

import { 
  ChevronDown, 
  ChevronRight, 
  AlertCircle, 
  Calendar, 
  Sprout, 
  FlaskConical,
  BookOpen
} from 'lucide-react';

const CropHealth = () => {
  const { user, diseases: liveDiseases } = useApp();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const diseasesList = (liveDiseases && liveDiseases.length > 0) ? liveDiseases : mockCropDiseases;
  const diseaseCount = diseasesList.length;

  const severityColors = {
    Low: 'bg-lightgreen text-primary border-green-200/60',
    Medium: 'bg-amber-50 text-warning border-amber-200/60',
    High: 'bg-red-50 text-danger border-red-200/60'
  };

  const handleToggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-textdark tracking-tight">Crop Health Diagnostics</h1>
        <p className="text-xs text-textmuted font-semibold">
          Real-time disease reports and suggested chemical treatments.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Current Analysis Card (~1/3 width) */}
        <div className="lg:col-span-1">
          <Card className="p-0 overflow-hidden border border-slate-100 shadow-soft">
            {/* Visual Crop Image */}
            <div 
              className="h-48 bg-cover bg-center relative select-none"
              style={{ backgroundImage: 'url(/crop_health_analysis.png)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white uppercase tracking-widest bg-primary px-2.5 py-1 rounded-full shadow-sm">
                Current Analysis
              </span>
            </div>

            {/* Analysis Text details */}
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-textdark leading-tight">
                  {user?.cropType || 'Wheat'} &mdash; {user?.name || 'Farmer'}'s Plot
                </h3>
                <p className="text-[10px] text-textmuted font-semibold uppercase tracking-wider">
                  Location: {user?.location || 'Coimbatore, Tamil Nadu'}
                </p>
              </div>

              {/* Status Row with orange/red alert */}
              <div className="flex items-center gap-2.5 bg-amber-50/40 border border-amber-100/50 p-3.5 rounded-xl text-xs select-none">
                <div className="w-2 h-2 rounded-full bg-warning animate-pulse shrink-0"></div>
                <span className="font-bold text-textdark">
                  {diseaseCount} {diseaseCount === 1 ? 'issue' : 'issues'} detected
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Stacked list of disease cards (~2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          {diseasesList.map((disease) => {
            const isExpanded = expandedId === disease.id;
            return (
              <Card 
                key={disease.id || disease._id}
                className="border border-slate-100 hover:border-slate-200 shadow-soft p-5 transition-all duration-200"
              >
                {/* Header row */}
                <div 
                  onClick={() => handleToggleExpand(disease.id || disease._id)}
                  className="flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-textdark hover:text-primary transition-colors">
                      {disease.disease || disease.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-full uppercase tracking-wider ${severityColors[disease.severity]}`}>
                        {disease.severity} Severity
                      </span>
                      <span className="text-[10px] text-textmuted font-semibold flex items-center gap-1">
                        <Calendar size={11} />
                        Detected: {disease.detected}
                      </span>
                    </div>
                  </div>

                  {/* Expanded chevron status icon */}
                  <div className={`p-1.5 hover:bg-slate-50 rounded-lg text-textdark hover:text-primary transition-all duration-200 ${isExpanded ? 'rotate-180 text-primary' : ''}`}>
                    <ChevronDown size={18} className="stroke-[2.5]" />
                  </div>
                </div>

                {/* Card details body */}
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-textdark">
                  {/* Symptoms */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-textmuted uppercase tracking-wider font-bold">Symptoms</span>
                    <p className="font-semibold leading-relaxed">{disease.symptoms}</p>
                  </div>

                  {/* Suggested Pesticide */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-textmuted uppercase tracking-wider font-bold">Suggested Pesticide</span>
                    <p className="font-bold text-primary flex items-center gap-1.5">
                      <FlaskConical size={14} className="stroke-[2.5]" />
                      {disease.suggestedPesticide}
                    </p>
                  </div>
                </div>

                {/* Expandable panel content */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
                      <h4 className="text-[10px] text-textmuted uppercase tracking-wider font-bold flex items-center gap-1">
                        <BookOpen size={12} className="text-primary" />
                        Recommended Action
                      </h4>
                      <p className="text-xs font-semibold leading-relaxed text-textdark">
                        {disease.action}
                      </p>
                    </div>

                    <div className="flex justify-end select-none">
                      <Button
                        variant="primary"
                        size="sm"
                        className="font-bold flex items-center gap-1.5 px-5 py-2.5 shadow-sm"
                        onClick={() => navigate('/smart-spray')}
                        icon={ChevronRight}
                        iconPosition="right"
                      >
                        Go to Smart Spray
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

      </div>



    </div>
  );
};

export default CropHealth;
