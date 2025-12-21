
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Roadmap: React.FC = () => {
  useScrollReveal();
  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-32">
      <div className="text-center space-y-6 reveal-on-scroll">
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Evolution <span className="text-[#4fd1c5]">Map.</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">The Trajectory of Professional Identity Automation</p>
      </div>

      <div className="relative space-y-12">
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#4fd1c5]/20 to-transparent hidden md:block"></div>
        
        {[
          { phase: "Phase 01", title: "Neural Analysis", status: "Operational", desc: "Core engine release featuring ATS decryption, skill gap mapping, and outreach synthesis.", icon: "fa-bolt" },
          { phase: "Phase 02", title: "Visual Templates", status: "Q3 2025", desc: "Automatic generation of 4 hyper-modern resume templates: The Minimalist, The Creative, The Executive, and The Technical Architect.", icon: "fa-palette" },
          { phase: "Phase 03", title: "Interview Simulation", status: "Q4 2025", desc: "Real-time AI voice roleplay based on your analyzed resume and target JD vectors.", icon: "fa-microphone" },
          { phase: "Phase 04", title: "Identity Vault", status: "Q1 2026", desc: "Blockchain-secured professional identity and credentials that update in real-time with your skills.", icon: "fa-shield-halved" }
        ].map((step, i) => (
          <div key={i} className={`reveal-on-scroll flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 w-full">
              <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-[#4fd1c5]/30 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-widest">{step.phase}</div>
                  <div className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/5">{step.status}</div>
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 flex items-center gap-4">
                  <i className={`fas ${step.icon} text-[#4fd1c5]`}></i>
                  {step.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full bg-[#4fd1c5] shadow-[0_0_20px_rgba(79,209,197,0.5)] z-10 hidden md:block"></div>
            <div className="flex-1 hidden md:block"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
