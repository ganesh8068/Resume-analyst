
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About: React.FC = () => {
  useScrollReveal();
  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-32">
      <div className="text-center space-y-6 reveal-on-scroll">
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">The <span className="text-[#4fd1c5]">Manifesto.</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Pioneering the Future of Professional Identity Synchronization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8 reveal-on-scroll">
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Beyond Simple Keywords.</h3>
          <p className="text-slate-400 leading-relaxed text-lg font-medium">
            HireSync was born from a singular realization: traditional recruitment is a broken game of keyword matching. We built a neural bridging system that understands the latent potential within your career trajectory.
          </p>
          <p className="text-slate-500 leading-relaxed">
            By leveraging Gemini 3's multi-dimensional reasoning, we don't just "fix" resumes—we synchronize your professional DNA with the requirements of the world's most innovative companies.
          </p>
          <div className="pt-6 grid grid-cols-2 gap-4">
             <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[#4fd1c5] font-black text-2xl">0.05ms</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Inference Latency</div>
             </div>
             <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-emerald-400 font-black text-2xl">Neural</div>
                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Architecture</div>
             </div>
          </div>
        </div>
        <div className="reveal-on-scroll p-12 rounded-[64px] bg-gradient-to-br from-[#4fd1c5]/10 to-transparent border border-white/5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-[#4fd1c5]/5 blur-3xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-1000"></div>
          <div className="relative z-10 space-y-6">
            <i className="fas fa-microchip text-5xl text-[#4fd1c5]"></i>
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Powered by Gemini 3.</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Utilizing the most advanced LLM reasoning engine to simulate recruiter decision-making with high-fidelity accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
