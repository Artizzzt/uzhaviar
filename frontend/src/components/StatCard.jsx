import React from 'react';
import Card from './Card';

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType = 'success', // success, danger, warning, neutral
  className = '',
  ...props
}) => {
  const trendColors = {
    success: 'text-primary bg-lightgreen',
    danger: 'text-danger bg-red-50',
    warning: 'text-warning bg-amber-50',
    neutral: 'text-textmuted bg-slate-100'
  };

  const iconBgColors = {
    success: 'bg-lightgreen text-primary',
    danger: 'bg-red-50 text-danger',
    warning: 'bg-amber-50 text-warning',
    neutral: 'bg-slate-100 text-textmuted'
  };

  return (
    <Card className={`hover:translate-y-[-2px] transition-transform duration-200 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-textmuted">{title}</p>
          <h4 className="text-3xl font-bold text-textdark mt-1">{value}</h4>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-pill font-medium ${trendColors[trendType]}`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-card ${iconBgColors[trendType] || 'bg-lightgreen text-primary'}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
