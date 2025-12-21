
import React, { useState, useEffect } from 'react';
// Fix: Use types/index to ensure access to the complete AnalysisResult interface
import { AnalysisResult } from '../types/index';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  useScrollReveal();

  useEffect(() => {
    const stored = localStorage.getItem('hiresync_history');
    if (stored) {
      setHistory(JSON.parse(stored).sort((a: any, b: any) => b.timestamp - a.timestamp));
    }
  }, []);

  const deleteRecord = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('hiresync_history', JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 reveal-on-scroll">
        <div className="space-y-4">
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Neural <span className="text-[#4fd1c5]">Logs.</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Persistent professional telemetry</p>
        </div>
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
           <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Synchronizations</div>
           <div className="text-4xl font-black text-white">{history.length}</div>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="reveal-on-scroll py-40 border-2 border-dashed border-white/5 rounded-[48px] flex flex-col items-center justify-center text-center space-y-6">
           <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
              <i className="fas fa-folder-open text-3xl text-slate-700"></i>
           </div>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No active telemetry found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {history.map((record, i) => (
            <div key={record.id} className="reveal-on-scroll group p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-[#4fd1c5]/30 transition-all flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {new Date(record.timestamp || 0).toLocaleDateString()}
                </div>
                <button onClick={() => deleteRecord(record.id || '')} className="text-slate-600 hover:text-rose-500 transition-colors">
                  <i className="fas fa-trash-alt text-xs"></i>
                </button>
              </div>
              
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{record.jobTitle}</h3>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 flex-grow bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-[#4fd1c5]" style={{ width: `${record.atsScore.score}%` }}></div>
                </div>
                <span className="text-[10px] font-black text-[#4fd1c5] tabular-nums">{record.atsScore.score}%</span>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                 <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Neural Verdict</div>
                 <p className="text-slate-400 text-xs leading-relaxed italic line-clamp-3">"{record.verdict.reasoning}"</p>
              </div>

              <Button variant="secondary" className="w-full h-12 text-[9px] group-hover:bg-[#4fd1c5] group-hover:text-black transition-all">
                Load Data Node
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
