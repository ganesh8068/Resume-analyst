
import React, { useState, useEffect } from 'react';
import { AnalysisResult, JobStrategy } from '../types/index';
import { generateJobStrategy } from '../services/gemini';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/ui/Button';

const Strategist: React.FC = () => {
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const [strategy, setStrategy] = useState<JobStrategy | null>(null);
  const [loading, setLoading] = useState(false);

  useScrollReveal(strategy !== null);

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
      const s = await generateJobStrategy(lastAnalysis);
      setStrategy(s);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-24 text-left">
      <div className="space-y-6 reveal-on-scroll">
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Search <span className="text-[#4fd1c5]">Strategy.</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Operationalizing your career pivot through high-frequency search vectors</p>
      </div>

      {!lastAnalysis ? (
        <div className="py-32 border-2 border-dashed border-white/5 rounded-[64px] flex flex-col items-center justify-center text-center space-y-8 bg-white/[0.01]">
           <div className="w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center border border-white/5">
              <i className="fas fa-map-marked-alt text-3xl text-slate-700"></i>
           </div>
           <p className="text-slate-500 text-xs max-w-sm leading-relaxed font-medium">Perform a Neural Analysis first to determine the search parameters.</p>
           <Button onClick={() => window.location.hash = 'analyzer'} variant="primary" className="h-14">Initiate Analysis</Button>
        </div>
      ) : !strategy ? (
        <div className="max-w-2xl mx-auto p-12 rounded-[48px] bg-white/[0.02] border border-white/5 text-center space-y-8">
           <h3 className="text-white font-black uppercase tracking-widest text-sm">Target Vector: {lastAnalysis.jobTitle}</h3>
           <p className="text-slate-400 text-sm leading-relaxed">Synthesizing a 7-day high-performance search protocol based on your current skill matching profile.</p>
           <Button isLoading={loading} onClick={handleGenerate} className="w-full h-16">Initialize Battle Plan</Button>
        </div>
      ) : (
        <div className="space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-on-scroll">
            <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 space-y-6">
              <h4 className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-[0.4em]">Target Sectors</h4>
              <div className="flex flex-wrap gap-3">
                {strategy.targetSectors.map((s, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300">{s}</span>
                ))}
              </div>
            </div>
            <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 space-y-6">
              <h4 className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-[0.4em]">Networking Sync</h4>
              <p className="text-slate-400 text-sm leading-relaxed italic">"{strategy.networkingStrategy}"</p>
            </div>
          </div>

          <div className="space-y-12 reveal-on-scroll">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">7-Day Deployment Protocol</h3>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {strategy.dailyActionPlan.map((day, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col space-y-4 hover:border-[#4fd1c5]/30 transition-all group">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2 group-hover:text-[#4fd1c5] transition-colors">{day.day}</div>
                  <ul className="space-y-3 flex-grow">
                    {day.tasks.map((task, tid) => (
                      <li key={tid} className="text-[10px] font-medium text-slate-400 leading-tight">• {task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Strategist;
