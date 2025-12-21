
import React from 'react';

interface ResultCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
  headerColor?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, children, className = "", headerColor = "text-[#4fd1c5]" }) => {
  return (
    <div className={`rounded-[32px] overflow-hidden transition-all duration-500 group bg-[#08080c]/50 border border-white/5 ${className}`}>
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl bg-[#4fd1c5]/5 border border-[#4fd1c5]/10 flex items-center justify-center transition-all group-hover:bg-[#4fd1c5]/10`}>
             <i className={`${icon} ${headerColor} text-lg drop-shadow-[0_0_10px_rgba(79,209,197,0.3)]`}></i>
          </div>
          <h3 className="font-black text-slate-100 uppercase tracking-[0.2em] text-[11px]">{title}</h3>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
      </div>
      <div className="px-8 pb-8 pt-2">
        {children}
      </div>
    </div>
  );
};

export default ResultCard;
