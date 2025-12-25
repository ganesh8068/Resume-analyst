
import React from 'react';
import { ViewState } from '../../types/index';

interface NavbarProps {
  currentView: ViewState;
  setView: (v: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-28 border-b border-white/5 backdrop-blur-3xl z-[100] px-8 md:px-12 flex items-center justify-between">
      <div 
        className="flex items-center gap-4 cursor-pointer group p-3 rounded-sm" 
        onClick={() => setView('home')}
      >
        <div className="w-10 h-10 bg-[#4fd1c5] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(79,209,197,0.5)] group-hover:scale-110 transition-all">
          <i className="fas fa-bolt text-black text-lg"></i>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-black tracking-tighter text-lg leading-tight uppercase">HireSync.Intel</span>
          <span className="text-[8px] font-black text-[#4fd1c5] tracking-[0.4em] uppercase">Neural Engine v2.5</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-6 overflow-x-auto max-w-[60%] no-scrollbar">
         {[
           { label: 'Analysis', value: 'analyzer' },
           { label: 'Architect', value: 'builder' },
           { label: 'Interview', value: 'interview' },
           { label: 'Negotiate', value: 'negotiator' },
           { label: 'Templates', value: 'templates' },
           { label: 'About', value: 'about' }
         ].map((item) => (
           <button 
              key={item.value} 
              onClick={() => { setView(item.value as ViewState); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors relative group whitespace-nowrap ${currentView === item.value ? 'text-[#4fd1c5]' : 'text-slate-400 hover:text-white'}`}
             >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-[#4fd1c5] transition-all ${currentView === item.value ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
           </button>
         ))}
      </div>

      <button 
        onClick={() => setView('analyzer')} 
        className="px-6 py-3 rounded-[12px] bg-white/[0.03] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#4fd1c5] hover:text-black transition-all active:scale-95 whitespace-nowrap"
      >
        Access Portal
      </button>
    </nav>
  );
};

export default Navbar;
