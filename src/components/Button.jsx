import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, danger, ghost
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left', // left, right
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full select-none';
  
  const variants = {
    // Solid green
    primary: 'bg-primary hover:bg-green-700 text-white border border-transparent shadow-sm',
    // Outline green
    secondary: 'border border-primary text-primary hover:bg-lightgreen bg-transparent',
    // Red text for Decline/Logout
    danger: 'text-danger hover:bg-red-50 hover:text-red-700 bg-transparent',
    // Text-only gray
    ghost: 'text-textmuted hover:text-textdark hover:bg-slate-100 bg-transparent'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

  const iconElement = Icon ? <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="shrink-0" /> : null;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${disabled ? disabledStyles : ''} 
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && iconElement}
    </button>
  );
};

export default Button;
