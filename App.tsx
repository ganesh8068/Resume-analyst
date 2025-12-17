
import React, { useState } from 'react';
import { ExperienceLevel, AnalysisInputs, AnalysisResult } from './types';
import { analyzeResume } from './services/geminiService';
import Button from './components/Button';
import ResultCard from './components/ResultCard';
import FileUploader from './components/FileUploader';

// --- Home View Component ---
const HomeView: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center animate-fadeIn">
      <div className="max-w-4xl space-y-8 relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 blur-[100px] pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
          <i className="fas fa-sparkles"></i>
          Next-Gen Career Intelligence
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tight">
          Master the Art of <br/>
          <span className="text-indigo-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">Professional Signal.</span>
        </h1>
        <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
          The world's most advanced AI resume intelligence engine. Optimize for ATS, bridge skill gaps, and automate high-conversion outreach.
        </p>
        
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button onClick={onStart} className="w-full sm:w-auto h-20 px-12 text-xl rounded-3xl shadow-[0_20px_60px_rgba(79,70,229,0.3)] hover:-translate-y-1 transition-transform">
            START ANALYSIS
          </Button>
          <button className="w-full sm:w-auto px-10 py-5 rounded-3xl border border-white/10 text-white font-black tracking-widest text-xs hover:bg-white/5 transition-all uppercase">
            View Case Studies
          </button>
        </div>

        <div className="pt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 text-left border-t border-white/5">
          {[
            { icon: 'fa-microchip', title: 'Neural Matching', desc: 'Quantum-grade semantic alignment with job specifications.' },
            { icon: 'fa-shield-halved', title: 'ATS Decryption', desc: 'Reverse-engineered scoring against top hiring algorithms.' },
            { icon: 'fa-paper-plane', title: 'Smart Outreach', desc: 'Context-aware messaging for maximum recruiter response.' }
          ].map((item, i) => (
            <div key={i} className="space-y-4 group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <i className={`fas ${item.icon} text-indigo-400 group-hover:text-white`}></i>
              </div>
              <h4 className="text-white font-black text-sm tracking-tight">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Analyzer View Component ---
const AnalyzerView: React.FC = () => {
  const [inputs, setInputs] = useState<AnalysisInputs>({
    resumeText: '',
    jobTitle: '',
    jobDescription: '',
    experienceLevel: ExperienceLevel.FRESHER
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showManualText, setShowManualText] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.resumeText.trim()) {
      setError("Analysis requires resume input. Upload a file or paste text.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeResume(inputs);
      setResult(data);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      setError(err.message || 'The system encountered an unexpected processing error.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fadeIn">
      {/* Configuration Sidebar */}
      <div className="lg:col-span-3 space-y-8">
        <div className="sticky top-28">
          <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-[40px] shadow-2xl space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">CONFIGURATION</h2>
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Designation Target</label>
                <input
                  type="text"
                  placeholder="e.g. Full Stack Developer"
                  className="w-full px-6 py-5 bg-[#0d0d12] border border-white/5 rounded-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-800 text-white font-bold text-sm"
                  value={inputs.jobTitle}
                  onChange={(e) => setInputs({ ...inputs, jobTitle: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Seniority Tier</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(ExperienceLevel).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setInputs({ ...inputs, experienceLevel: lvl as ExperienceLevel })}
                      className={`px-4 py-4 rounded-2xl text-[10px] font-black transition-all border tracking-widest uppercase ${
                        inputs.experienceLevel === lvl 
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-xl shadow-indigo-600/20' 
                        : 'bg-[#0d0d12] text-slate-600 border-white/5 hover:border-white/10'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Identity Document</label>
                <FileUploader 
                  onTextExtracted={(text) => setInputs({ ...inputs, resumeText: text })}
                  onError={(err) => setError(err)}
                />
                <button 
                  type="button"
                  onClick={() => setShowManualText(!showManualText)}
                  className="text-[9px] font-black text-slate-600 uppercase tracking-widest hover:text-indigo-400 transition-colors mt-2"
                >
                  {showManualText ? '[-] Close Buffer' : '[+] Edit Text Manually'}
                </button>
                {showManualText && (
                  <textarea
                    rows={6}
                    placeholder="Paste credentials..."
                    className="w-full mt-4 p-4 bg-black border border-white/10 rounded-2xl focus:border-indigo-500 outline-none transition-all resize-none text-[10px] text-slate-400 font-mono"
                    value={inputs.resumeText}
                    onChange={(e) => setInputs({ ...inputs, resumeText: e.target.value })}
                  />
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Job Metadata (JD)</label>
                <textarea
                  rows={4}
                  placeholder="Paste job specifications..."
                  className="w-full px-6 py-5 bg-[#0d0d12] border border-white/5 rounded-3xl focus:border-indigo-500 outline-none transition-all resize-none text-sm text-slate-300 font-medium"
                  value={inputs.jobDescription}
                  onChange={(e) => setInputs({ ...inputs, jobDescription: e.target.value })}
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-rose-500/10 text-rose-400 text-[10px] rounded-xl border border-rose-500/20 flex items-center gap-3 font-bold uppercase tracking-wider">
                  <i className="fas fa-exclamation-triangle"></i>
                  {error}
                </div>
              )}

              <Button type="submit" isLoading={loading} className="w-full h-16 rounded-2xl text-xs uppercase tracking-[0.3em]">
                Execute Analysis
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Analysis Display */}
      <div id="results-section" className="lg:col-span-9 space-y-10">
        {!result && !loading && (
          <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 bg-white/[0.01] rounded-[64px] border border-white/[0.03] border-dashed">
            <div className="w-24 h-24 bg-white/[0.03] rounded-3xl flex items-center justify-center mb-8 border border-white/5 rotate-12 transition-transform hover:rotate-0">
              <i className="fas fa-satellite text-indigo-500 text-4xl"></i>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight mb-4">Awaiting Signal Synchronization</h3>
            <p className="text-slate-500 max-w-sm text-base font-medium leading-relaxed">
              Upload your resume and the target JD in the control panel to begin the multi-modal neural link process.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-40 h-full space-y-8 animate-pulse">
            <div className="relative">
              <div className="w-32 h-32 border-[6px] border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-2xl font-black text-white tracking-tight">Decrypting Credentials...</h4>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Optimizing Semantic Vectors</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-10 animate-fadeIn">
            {/* Top Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Neural Compatibility Card */}
              <ResultCard title="NEURAL COMPATIBILITY" icon="fas fa-brain" className="flex flex-col">
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-[16/10] bg-[#030305] flex items-center justify-center mb-12 shadow-2xl rounded-2xl">
                    <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none rounded-2xl"></div>
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/[0.02]" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="42" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          fill="transparent" 
                          strokeDasharray="264" 
                          strokeDashoffset={264 - (264 * result.atsScore.score) / 100} 
                          className="text-indigo-500 transition-all duration-1000" 
                          strokeLinecap="round" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-white tracking-tighter">{result.atsScore.score}</span>
                        <span className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mt-1">PERCENT</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-center mb-8">DETECTED GAPS</h5>
                    <div className="space-y-4">
                      {result.atsScore.issues.map((issue, idx) => (
                        <div key={idx} className="flex gap-5 p-6 bg-[#0a0a0f] rounded-[28px] border border-white/[0.03] text-sm text-slate-300 font-medium group hover:bg-white/[0.05] transition-all">
                          <div className="w-2 h-2 rounded-full bg-indigo-500/40 mt-1.5 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.4)]"></div>
                          <p className="leading-relaxed">{issue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ResultCard>

              {/* Operational Verdict Card */}
              <ResultCard title="OPERATIONAL VERDICT" icon="fas fa-gavel" headerColor={result.verdict.status === 'Hire' ? 'text-emerald-400' : 'text-amber-400'} className="flex flex-col">
                <div className="flex flex-col items-center">
                  <div className="w-full flex justify-center mb-12">
                    <div className={`px-16 py-4 rounded-full text-xs font-black tracking-[0.6em] border-[2px] shadow-2xl transition-all ${
                      result.verdict.status === 'Hire' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      result.verdict.status === 'Borderline' ? 'bg-[#15120a] text-amber-500 border-[#3d331a]' : 
                      'bg-[#1a0a0d] text-rose-500 border-[#3d1a1d]'
                    }`}>
                      {result.verdict.status === 'Not Ready' ? 'NOT READY' : result.verdict.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="relative p-12 bg-[#060609] rounded-[48px] border border-white/[0.03] flex-grow w-full flex flex-col justify-center shadow-inner group transition-all">
                    <div className="absolute top-10 left-10 opacity-30">
                      <i className="fas fa-quote-left text-indigo-500 text-6xl"></i>
                    </div>
                    <p className="text-2xl text-slate-100 leading-[1.7] font-black italic tracking-tight text-center relative z-10 px-4">
                      "{result.verdict.reasoning}"
                    </p>
                  </div>
                </div>
              </ResultCard>
            </div>

            {/* Matrix & Strategy Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ResultCard title="STRATEGIC ASSETS" icon="fas fa-plus-circle" headerColor="text-emerald-400">
                <div className="space-y-4">
                  {result.pros.map((pro, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-emerald-500/[0.02] rounded-3xl border border-emerald-500/10 group hover:bg-emerald-500/[0.04] transition-all">
                      <i className="fas fa-check-double text-emerald-500/60 mt-0.5"></i>
                      <p className="text-sm text-slate-300 font-bold">{pro}</p>
                    </div>
                  ))}
                </div>
              </ResultCard>
              <ResultCard title="RISK FACTORS" icon="fas fa-minus-circle" headerColor="text-rose-400">
                <div className="space-y-4">
                  {result.cons.map((con, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-rose-500/[0.02] rounded-3xl border border-rose-500/10 group hover:bg-rose-500/[0.04] transition-all">
                      <i className="fas fa-triangle-exclamation text-rose-500/60 mt-0.5"></i>
                      <p className="text-sm text-slate-300 font-bold">{con}</p>
                    </div>
                  ))}
                </div>
              </ResultCard>
            </div>

            {/* Outreach Intelligence Section */}
            <div className="space-y-8 pt-4">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Outreach Intelligence</h2>
                <div className="h-px flex-grow bg-white/5"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Cold Email Block */}
                <div className="bg-[#0a0a0f] border border-white/5 rounded-[40px] p-10 space-y-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <i className="fas fa-envelope-open-text text-8xl text-indigo-500 -rotate-12"></i>
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <i className="fas fa-paper-plane text-indigo-400"></i>
                      </div>
                      <h4 className="font-black text-white text-xs tracking-widest uppercase">Direct Hook (Email)</h4>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(result.emailTemplate.body)}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase border border-white/10"
                    >
                      Clone Content
                    </button>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="px-6 py-4 bg-[#0d0d12] rounded-2xl border border-white/5">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Subject Pattern</span>
                      <p className="text-indigo-400 font-black text-sm">{result.emailTemplate.subject}</p>
                    </div>
                    <div className="p-8 bg-black/60 rounded-[32px] border border-white/5 text-sm text-slate-400 font-medium leading-[1.8] italic whitespace-pre-wrap">
                      {result.emailTemplate.body}
                    </div>
                  </div>
                </div>

                {/* LinkedIn Block */}
                <div className="bg-[#0a0a0f] border border-white/5 rounded-[40px] p-10 space-y-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <i className="fab fa-linkedin text-8xl text-indigo-500 rotate-12"></i>
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <i className="fab fa-linkedin-in text-indigo-400"></i>
                      </div>
                      <h4 className="font-black text-white text-xs tracking-widest uppercase">Network Sync (LinkedIn)</h4>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(result.linkedInTemplate.connectionRequest)}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase border border-white/10"
                    >
                      Clone Content
                    </button>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="p-8 bg-indigo-500/[0.04] rounded-[32px] border-l-[8px] border-l-indigo-500 border border-white/5">
                      <h5 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-4">Connection Invitation</h5>
                      <p className="text-sm text-slate-200 leading-relaxed font-black italic">"{result.linkedInTemplate.connectionRequest}"</p>
                    </div>
                    <div className="p-8 bg-black/40 rounded-[32px] border-l-[8px] border-l-slate-800 border border-white/5">
                      <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Follow-Up Sequence</h5>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium italic">"{result.linkedInTemplate.followUp}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recruiter Intel Block */}
            <div className="relative group p-[1px] rounded-[64px] bg-gradient-to-br from-indigo-500/30 via-transparent to-transparent mt-16 overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] group-hover:bg-indigo-600/10 transition-colors"></div>
               <div className="bg-[#040406] p-16 rounded-[63px] relative overflow-hidden text-center space-y-12">
                  <div className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-[0.7em] uppercase">
                    <i className="fas fa-fingerprint"></i>
                    RECRUITER STRATEGY
                  </div>
                  <h3 className="text-5xl font-black text-white tracking-tighter leading-tight max-w-4xl mx-auto">
                    Influence the <span className="text-indigo-500">Human Selection</span> Algorithm.
                  </h3>
                  <div className="max-w-4xl mx-auto text-slate-300 text-3xl font-black leading-relaxed italic border-l-[18px] border-indigo-500/30 pl-16 text-left py-12 glass-card rounded-r-[48px] shadow-2xl bg-black/30">
                    "{result.recruiterTip}"
                  </div>
                  <p className="text-slate-600 font-bold uppercase tracking-[0.5em] text-[11px]">Bypass algorithmic filters by applying this tactical nuance.</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Entry ---
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'analyzer'>('home');

  return (
    <div className="min-h-screen text-slate-300">
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-violet-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-[100] border-b border-white/[0.03] bg-black/70 backdrop-blur-3xl">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <div 
            className="flex items-center gap-6 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-[20px] flex items-center justify-center transform group-hover:rotate-0 rotate-12 transition-all shadow-[0_0_30px_rgba(79,70,229,0.5)]">
              <i className="fas fa-microchip text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter">
              HIRESYNC<span className="text-indigo-500">.INTEL</span>
            </h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-12">
            {['Signal Analysis', 'Career Strategy', 'Skill Schema', 'Templates'].map((item) => (
              <button 
                key={item} 
                onClick={() => setCurrentView('analyzer')}
                className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button 
              onClick={() => setCurrentView('analyzer')}
              className="hidden sm:block px-8 py-4 rounded-2xl border border-white/10 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/5 transition-all shadow-xl"
            >
              Analyze Resume
            </button>
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-[18px] flex items-center justify-center group hover:border-indigo-500 transition-all cursor-pointer">
              <i className="fas fa-terminal text-sm text-slate-500 group-hover:text-indigo-400"></i>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {currentView === 'home' ? (
          <HomeView onStart={() => setCurrentView('analyzer')} />
        ) : (
          <AnalyzerView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-28 bg-black">
        <div className="max-w-[1600px] mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="space-y-10 col-span-2">
            <h1 className="text-3xl font-black text-white tracking-tighter">
              HIRESYNC<span className="text-indigo-500">.INTEL</span>
            </h1>
            <p className="text-slate-500 max-w-md font-medium leading-relaxed text-base">
              Quantum-grade document intelligence for high-stakes hiring markets. Our engine synchronizes your professional signal with the industry's most demanding specifications.
            </p>
            <div className="flex gap-5">
              {['twitter', 'linkedin', 'github'].map(social => (
                <div key={social} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-indigo-400 cursor-pointer transition-all hover:-translate-y-1">
                  <i className={`fab fa-${social} text-lg`}></i>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-10">
            <h4 className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Intelligence</h4>
            <div className="flex flex-col gap-5 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Neural Mapping</a>
              <a href="#" className="hover:text-white transition-colors">ATS Protocol</a>
              <a href="#" className="hover:text-white transition-colors">Market Reports</a>
              <a href="#" className="hover:text-white transition-colors">Skill Schema</a>
            </div>
          </div>
          <div className="space-y-10">
            <h4 className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Security</h4>
            <div className="flex flex-col gap-5 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Shield</a>
              <a href="#" className="hover:text-white transition-colors">System Terms</a>
              <a href="#" className="hover:text-white transition-colors">Data Ethics</a>
              <a href="#" className="hover:text-white transition-colors">Bug Bounty</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-12 mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-slate-700 text-[11px] font-black tracking-[0.6em] uppercase">© 2025 HIRESYNC INTEL SYSTEMS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      {/* Floating Action */}
      {currentView === 'analyzer' && (
        <div className="fixed bottom-12 right-12 z-[200]">
           <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-16 h-16 bg-indigo-600 text-white rounded-[24px] shadow-[0_0_50px_rgba(79,70,229,0.4)] flex items-center justify-center hover:bg-indigo-500 transition-all duration-300 group active:scale-90"
          >
            <i className="fas fa-chevron-up text-lg transition-transform group-hover:-translate-y-1"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
