
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, variant = 'primary', className, ...props }) => {
  const baseStyles = "px-10 py-5 rounded-[20px] font-black transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden active:scale-95 text-[11px] uppercase tracking-[0.2em]";
  
  const variants = {
    primary: "bg-[#4fd1c5] text-black shadow-[0_15px_45px_rgba(79,209,197,0.3)] hover:shadow-[0_20px_55px_rgba(79,209,197,0.5)] hover:bg-[#3db8ae]",
    secondary: "bg-transparent text-white border border-white/10 hover:bg-white/5 backdrop-blur-md",
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
          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
          <span className="tracking-widest uppercase text-[10px]">Processing...</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;
