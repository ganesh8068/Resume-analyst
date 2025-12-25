
import React, { useState, useEffect } from 'react';
import { AnalysisResult, NegotiationScript } from '../types/index';
import { generateNegotiationScripts } from '../services/gemini';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/ui/Button';

const Negotiator: React.FC = () => {
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const [scripts, setScripts] = useState<NegotiationScript[]>([]);
  const [loading, setLoading] = useState(false);

  useScrollReveal(scripts.length > 0);

  useEffect(() => {
    const stored = localStorage.getItem('hiresync_history');
    if (stored) {
      const history = JSON.parse(stored);
      if (history.length > 0) {
        setLastAnalysis(history.sort((a: any, b: any) => b.timestamp - a.timestamp)[0]);
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!lastAnalysis) return;
    setLoading(true);
    try {
      const s = await generateNegotiationScripts(lastAnalysis);
      setScripts(s);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-24 text-left">
      <div className="space-y-6 reveal-on-scroll">
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Negotiation <span className="text-[#4fd1c5]">Lab.</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Closing the Value Gap through Tactical Linguistics</p>
      </div>

      {!lastAnalysis ? (
        <div className="py-32 border-2 border-dashed border-white/5 rounded-[64px] flex flex-col items-center justify-center text-center space-y-8 bg-white/[0.01]">
           <div className="w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center border border-white/5">
              <i className="fas fa-hand-holding-dollar text-3xl text-slate-700"></i>
           </div>
           <p className="text-slate-500 text-xs max-w-sm leading-relaxed font-medium">Perform a Neural Analysis first to provide the required skill context for negotiation.</p>
           <Button onClick={() => window.location.hash = 'analyzer'} variant="primary" className="h-14">Initiate Analysis</Button>
        </div>
      ) : scripts.length === 0 ? (
        <div className="max-w-2xl mx-auto p-12 rounded-[48px] bg-white/[0.02] border border-white/5 text-center space-y-8">
           <h3 className="text-white font-black uppercase tracking-widest text-sm">Context Locked: {lastAnalysis.jobTitle}</h3>
           <p className="text-slate-400 text-sm leading-relaxed">We will generate scripts optimized to anchor your salary based on the unique strengths identified in your resume DNA.</p>
           <Button isLoading={loading} onClick={handleGenerate} className="w-full h-16">Generate Scripts</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12">
          {scripts.map((item, i) => (
            <div key={i} className="reveal-on-scroll p-12 rounded-[48px] bg-white/[0.02] border border-white/5 space-y-8">
              <div className="flex items-center justify-between">
                <span className="px-4 py-2 rounded-full bg-[#4fd1c5]/10 border border-[#4fd1c5]/20 text-[10px] font-black text-[#4fd1c5] uppercase tracking-widest">{item.phase}</span>
                <i className="fas fa-quote-right text-slate-800 text-2xl"></i>
              </div>
              <div className="bg-black/40 rounded-3xl p-8 border border-white/5 font-mono text-sm text-slate-300 leading-relaxed italic">
                "{item.script}"
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-lightbulb text-[10px] text-amber-400"></i>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed font-medium"><span className="text-white font-bold uppercase tracking-widest text-[10px] block mb-1">Tactical Objective:</span> {item.tacticalNote}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Negotiator;
