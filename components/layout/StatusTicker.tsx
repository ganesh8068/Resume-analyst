
import React from 'react';

const StatusTicker: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#0a0a0f] border-t border-[#4fd1c5]/20 z-[150] overflow-hidden">
      <div className="flex items-center h-full whitespace-nowrap animate-marquee">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 mx-6">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              System Status: Operational
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4fd1c5] shadow-[0_0_8px_rgba(79,209,197,0.8)]"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Neural Sync: 99.8% Accuracy
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
            <span className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-widest">
              Processing Vector: 0.{Math.floor(Math.random() * 9000 + 1000)}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4fd1c5]"></span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none select-none">
          <div className="text-[8px] font-mono tracking-[2em] text-[#4fd1c5] uppercase">
            E N M C + Q &nbsp;&nbsp; H + L π &nbsp;&nbsp; Z + N + 0
          </div>
      </div>
    </div>
  );
};

export default StatusTicker;
