import React from 'react';
import Button from './Button';

// 1. BASE CARD WRAPPER
export const Card = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-card shadow-soft border border-slate-100 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 2. STAT CARD WITH PROGRESS BAR AND TREND INDICATORS
export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  className = '',
  ...props
}) => {
  // Parse numeric value for the progress bar (e.g. "85%" -> 85)
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const isPercent = typeof value === 'string' && value.includes('%');
  
  // Style configurations based on the card label
  const isDisease = label.toLowerCase().includes('disease');
  const isSprayed = label.toLowerCase().includes('spray');
  
  let themeColor = 'bg-primary';
  let badgeColor = 'text-primary bg-lightgreen';
  
  if (isDisease) {
    themeColor = 'bg-danger';
    badgeColor = 'text-danger bg-red-50';
  } else if (isSprayed) {
    themeColor = 'bg-warning';
    badgeColor = 'text-warning bg-amber-50';
  }

  // Parse trend sign to decide green/red text (e.g., "+5%" is green/primary, "-2%" is red/danger)
  const isPositiveTrend = trend && trend.trim().startsWith('+');
  const isNegativeTrend = trend && trend.trim().startsWith('-');
  
  let trendClass = 'text-textmuted bg-slate-100';
  if (trend) {
    if (isDisease) {
      // For disease, a negative trend (reduction) is positive (green), and positive trend (increase) is negative (red)
      if (isNegativeTrend) trendClass = 'text-primary bg-lightgreen';
      if (isPositiveTrend) trendClass = 'text-danger bg-red-50';
    } else if (isSprayed) {
      trendClass = 'text-warning bg-amber-50';
    } else {
      if (isPositiveTrend) trendClass = 'text-primary bg-lightgreen';
      if (isNegativeTrend) trendClass = 'text-danger bg-red-50';
    }
  }

  return (
    <Card className={`hover:translate-y-[-2px] transition-transform duration-200 ${className}`} {...props}>
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <span className="text-xs font-bold text-textmuted uppercase tracking-wider">{label}</span>
          <h4 className="text-3xl font-extrabold text-textdark">{value}</h4>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${
            isDisease ? 'bg-red-50 text-danger' : isSprayed ? 'bg-amber-50 text-warning' : 'bg-lightgreen text-primary'
          }`}>
            <Icon size={20} className="stroke-[2.5]" />
          </div>
        )}
      </div>

      {/* Progress Bar (if value represents a percentage or valid quantity) */}
      {!isNaN(numericValue) && (
        <div className="mt-4">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${themeColor}`}
              style={{ width: `${Math.min(Math.max(numericValue, 0), 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Trend Info */}
      {trend && (
        <div className="flex items-center mt-3">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${trendClass}`}>
            {trend}
          </span>
        </div>
      )}
    </Card>
  );
};

// 3. INFO CARD FOR DETAIL ROWS (Pesticides, Diseases, etc.)
export const InfoCard = ({
  title,
  badge, // String or Object: { text: "Low Risk", type: "success" | "warning" | "danger" }
  fields = [], // [{ label: "Cost", value: "Rs 350" }]
  actionLabel,
  onAction,
  className = '',
  ...props
}) => {
  // Render status badge helper
  const renderBadge = () => {
    if (!badge) return null;
    
    let text = typeof badge === 'string' ? badge : badge.text;
    let type = typeof badge === 'string' ? 'success' : badge.type;
    
    const badgeColors = {
      success: 'text-primary bg-lightgreen border-green-200',
      warning: 'text-warning bg-amber-50 border-amber-200',
      danger: 'text-danger bg-red-50 border-red-200'
    };

    return (
      <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-full ${badgeColors[type] || badgeColors.success}`}>
        {text}
      </span>
    );
  };

  return (
    <Card className={`flex flex-col h-full justify-between ${className}`} {...props}>
      <div>
        {/* Header Block */}
        <div className="flex items-start justify-between gap-2 pb-3.5 border-b border-slate-100">
          <h4 className="text-base font-bold text-textdark line-clamp-1">{title}</h4>
          {renderBadge()}
        </div>

        {/* Content Fields grid */}
        <div className="py-4 space-y-2">
          {fields.map((field, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs text-textdark py-1">
              <span className="text-textmuted font-semibold">{field.label}</span>
              <span className="font-bold text-right">{field.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button at bottom */}
      {actionLabel && (
        <div className="pt-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full font-bold" 
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Card;
