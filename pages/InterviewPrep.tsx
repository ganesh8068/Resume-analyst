
import React, { useState, useEffect } from 'react';
// Fix: Import from types/index to get the complete set of types including InterviewQuestion
import { AnalysisResult, InterviewQuestion } from '../types/index';
import { generateInterviewQuestions } from '../services/gemini';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/ui/Button';

const InterviewPrep: React.FC = () => {
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useScrollReveal(questions.length > 0);

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
      const q = await generateInterviewQuestions(lastAnalysis);
      setQuestions(q);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-24">
      <div className="text-center space-y-6 reveal-on-scroll">
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Interview <span className="text-[#4fd1c5]">Sim.</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">High-Fidelity Behavioral Simulation Engine</p>
      </div>

      {!lastAnalysis ? (
        <div className="reveal-on-scroll py-32 border-2 border-dashed border-white/5 rounded-[64px] flex flex-col items-center justify-center text-center space-y-8 bg-white/[0.01]">
           <div className="w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center border border-white/5">
              <i className="fas fa-shield-virus text-3xl text-slate-700"></i>
           </div>
           <div className="space-y-4">
              <h3 className="text-white font-black uppercase tracking-widest text-sm">Prerequisite Missing</h3>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed font-medium">Please perform a Neural Analysis first to populate the simulation parameters.</p>
           </div>
           <Button onClick={() => window.location.hash = 'analyzer'} variant="primary" className="h-14">Initiate Analysis</Button>
        </div>
      ) : questions.length === 0 ? (
        <div className="reveal-on-scroll max-w-2xl mx-auto p-12 rounded-[48px] bg-white/[0.02] border border-white/5 text-center space-y-8">
           <div className="flex items-center justify-center gap-6">
              <div className="p-4 rounded-2xl bg-[#4fd1c5]/10 border border-[#4fd1c5]/20">
                <i className="fas fa-brain text-2xl text-[#4fd1c5]"></i>
              </div>
              <div className="text-left">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Context</div>
                <div className="text-white font-black uppercase">{lastAnalysis.jobTitle}</div>
              </div>
           </div>
           <p className="text-slate-400 text-sm leading-relaxed">
             Our neural engine will synthesize 5 custom interview questions based on your specific professional deficit nodes and strengths.
           </p>
           <Button isLoading={loading} onClick={handleGenerate} className="w-full h-16">Initialize Protocol</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           <div className="lg:col-span-4 space-y-4">
              {questions.map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveQuestion(i)}
                  className={`w-full p-6 rounded-2xl border transition-all text-left flex items-center justify-between group ${activeQuestion === i ? 'bg-[#4fd1c5] border-[#4fd1c5] text-black shadow-[0_0_30px_rgba(79,209,197,0.3)]' : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20'}`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">Question 0{i+1}</span>
                  <i className={`fas fa-chevron-right text-[10px] transition-transform ${activeQuestion === i ? 'translate-x-1' : 'group-hover:translate-x-1'}`}></i>
                </button>
              ))}
           </div>
           <div className="lg:col-span-8 p-12 rounded-[48px] bg-white/[0.02] border border-white/5 min-h-[500px] flex flex-col">
              <div className="flex items-center justify-between mb-12">
                 <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-[#4fd1c5] uppercase tracking-widest">
                    {questions[activeQuestion].type} protocol
                 </div>
                 <div className="text-slate-600 text-[10px] font-mono">HASH: {Math.random().toString(36).substring(7).toUpperCase()}</div>
              </div>

              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-tight mb-12">
                {questions[activeQuestion].question}
              </h3>

              <div className="space-y-8 mt-auto">
                 <div className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-widest border-b border-[#4fd1c5]/20 pb-4">Ideal Response Vectors</div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[activeQuestion].idealAnswerPoints.map((point, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex gap-4">
                         <div className="w-5 h-5 rounded-lg bg-[#4fd1c5]/10 flex items-center justify-center text-[10px] text-[#4fd1c5] font-black">{idx + 1}</div>
                         <p className="text-slate-400 text-xs leading-relaxed">{point}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
