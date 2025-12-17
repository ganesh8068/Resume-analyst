
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, variant = 'primary', className, ...props }) => {
  const baseStyles = "px-8 py-4 rounded-2xl font-black transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden active:scale-95";
  
  const variants = {
    primary: "bg-indigo-600 text-white shadow-[0_10px_40px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.5)] hover:bg-indigo-500",
    secondary: "bg-white/[0.03] text-slate-200 border border-white/10 hover:bg-white/10 backdrop-blur-md",
    danger: "bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      {isLoading ? (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <span className="tracking-widest uppercase text-xs">Neural Linking...</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;
