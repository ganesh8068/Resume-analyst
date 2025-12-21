
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#050508] pt-24 pb-20 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#4fd1c5] rounded-xl flex items-center justify-center">
              <i className="fas fa-bolt text-black text-lg"></i>
            </div>
            <span className="text-white font-black tracking-tighter text-xl uppercase">HireSync.Intel</span>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed font-medium">
            Building the next generation of professional identity synchronization. 
            Leveraging neural networks to bridge the gap between human potential and 
            algorithmic selection systems.
          </p>
          <div className="flex gap-4">
            {['twitter', 'linkedin', 'github', 'discord'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#4fd1c5] hover:text-black transition-all text-slate-500">
                <i className={`fab fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Protocol</h4>
          <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-[#4fd1c5] transition-colors">Neural Matching</a></li>
            <li><a href="#" className="hover:text-[#4fd1c5] transition-colors">ATS Decryption</a></li>
            <li><a href="#" className="hover:text-[#4fd1c5] transition-colors">Privacy Schema</a></li>
            <li><a href="#" className="hover:text-[#4fd1c5] transition-colors">API Docs</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-[#4fd1c5] transition-colors">Our Manifesto</a></li>
            <li><a href="#" className="hover:text-[#4fd1c5] transition-colors">Career Bridge</a></li>
            <li><a href="#" className="hover:text-[#4fd1c5] transition-colors">Security Audit</a></li>
            <li><a href="#" className="hover:text-[#4fd1c5] transition-colors">Enterprise</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest">© 2025 HireSync Intelligence Systems. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="text-slate-600 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-slate-600 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
