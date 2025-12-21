
import React, { useState } from 'react';
import { ExperienceLevel, AnalysisInputs, AnalysisResult } from '../types/index';
import { analyzeResume } from '../services/gemini';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';
import FileUploader from '../components/common/FileUploader';

const Analyzer: React.FC = () => {
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
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useScrollReveal(result || loading);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const saveToHistory = (newResult: AnalysisResult) => {
    const existing = localStorage.getItem('hiresync_history');
    const history = existing ? JSON.parse(existing) : [];
    const updated = [newResult, ...history].slice(0, 20); // Keep last 20
    localStorage.setItem('hiresync_history', JSON.stringify(updated));
  };

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
      saveToHistory(data);
      setTimeout(() => {
        const target = document.getElementById('results-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      setError(err.message || "Encryption failure during neural link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-60 reveal-view">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12 reveal-on-scroll">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Configure <br/><span className="text-[#4fd1c5]">Analysis.</span></h2>
            <div className="w-20 h-1 bg-[#4fd1c5] rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Role</label>
              <input type="text" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4fd1c5]/50 transition-all" placeholder="e.g. Senior Frontend Engineer" value={inputs.jobTitle} onChange={(e) => setInputs({...inputs, jobTitle: e.target.value})} />
            </div>

            <div className="space-y-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Specification</label>
              <textarea required rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4fd1c5]/50 transition-all resize-none" placeholder="Paste the target job description here..." value={inputs.jobDescription} onChange={(e) => setInputs({...inputs, jobDescription: e.target.value})} />
            </div>

            <div className="space-y-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience Tier</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.values(ExperienceLevel).map((level) => (
                  <button key={level} type="button" onClick={() => setInputs({...inputs, experienceLevel: level})} className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${inputs.experienceLevel === level ? 'bg-[#4fd1c5] border-[#4fd1c5] text-black shadow-[0_0_20px_rgba(79,209,197,0.4)]' : 'bg-white/[0.03] border-white/5 text-slate-500 hover:border-white/20'}`}>{level}</button>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Resume DNA</label>
                <button type="button" onClick={() => setShowManualText(!showManualText)} className="text-[9px] font-black text-[#4fd1c5] uppercase tracking-widest hover:text-teal-300 transition-colors">{showManualText ? 'Use Uploader' : 'Paste Text Instead'}</button>
              </div>
              {showManualText ? (
                <textarea rows={8} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4fd1c5]/50 transition-all resize-none" placeholder="Paste your resume text here..." value={inputs.resumeText} onChange={(e) => setInputs({...inputs, resumeText: e.target.value})} />
              ) : (
                <FileUploader onTextExtracted={(text) => setInputs({...inputs, resumeText: text})} onError={setError} />
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold animate-shake">
                <i className="fas fa-triangle-exclamation mr-2"></i>{error}
              </div>
            )}

            <Button isLoading={loading} type="submit" className="w-full h-16 rounded-[20px]">Initiate Neural Linking</Button>
          </form>
        </div>

        <div className="lg:sticky lg:top-40 space-y-8 reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
          {!result && !loading && (
            <div className="rounded-[48px] border border-white/5 bg-white/[0.02] p-12 text-center space-y-6 backdrop-blur-3xl min-h-[400px] flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center animate-pulse"><i className="fas fa-radar text-3xl text-slate-800"></i></div>
              <div className="space-y-2">
                <h3 className="text-white font-black uppercase tracking-widest text-sm">Waiting for Telemetry</h3>
                <p className="text-slate-500 text-xs max-w-[240px] mx-auto leading-relaxed">Upload your professional profile to begin the synchronization sequence.</p>
              </div>
            </div>
          )}
          {loading && (
            <div className="rounded-[48px] border border-[#4fd1c5]/20 bg-[#4fd1c5]/[0.02] p-12 text-center space-y-8 backdrop-blur-3xl min-h-[400px] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-[#4fd1c5]/10 border-t-[#4fd1c5] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-10 h-10 border-4 border-teal-400/20 border-b-teal-400 rounded-full animate-spin-reverse"></div></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-white font-black uppercase tracking-widest text-sm animate-pulse">Analyzing Vectors</h3>
                <p className="text-[#4fd1c5] text-[10px] font-black uppercase tracking-[0.3em]">Neural Link Established</p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden w-48 mx-auto"><div className="h-full bg-[#4fd1c5] animate-progress"></div></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div id="results-section" className="mt-32 space-y-24 pt-20 border-t border-white/5 scroll-mt-32">
          {/* Header & Score */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 reveal-on-scroll">
            <div className="space-y-4 text-left">
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Analysis <br/><span className="text-[#4fd1c5]">Payload.</span></h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Sequence ID: {result.id?.toUpperCase()}</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-8 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ATS Match Score</div>
              <div className="text-7xl font-black text-[#4fd1c5] tabular-nums drop-shadow-[0_0_20px_rgba(79,209,197,0.5)]">{result.atsScore.score}%</div>
            </div>
          </div>

          {/* Primary Intelligence Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ResultCard title="Skill Synchronization" icon="fa-dna" headerColor="text-[#4fd1c5]">
              <div className="space-y-6">
                <div className="space-y-3 text-left">
                  <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Matched Assets</div>
                  <div className="flex flex-wrap gap-2">{result.skillsMatch.matched.map((s, i) => (<span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">{s}</span>))}</div>
                </div>
                <div className="space-y-3 text-left">
                  <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Critical Gaps</div>
                  <div className="flex flex-wrap gap-2">{result.skillsMatch.missingCritical.map((s, i) => (<span key={i} className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold">{s}</span>))}</div>
                </div>
              </div>
            </ResultCard>
            <ResultCard title="Neural Verdict" icon="fa-gavel" headerColor="text-[#4fd1c5]">
               <div className="space-y-6 text-left">
                  <div className={`inline-block px-4 py-2 rounded-xl border text-sm font-black uppercase tracking-widest ${result.verdict.status === 'Hire' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : result.verdict.status === 'Borderline' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>{result.verdict.status}</div>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{result.verdict.reasoning}</p>
               </div>
            </ResultCard>
            <ResultCard title="Recruiter Intel" icon="fa-user-secret" headerColor="text-amber-400">
               <p className="text-slate-400 text-sm leading-relaxed font-medium italic text-left">"{result.recruiterTip}"</p>
            </ResultCard>
          </div>

          {/* Project Suggestions Section - NEW */}
          {result.projectSuggestions && (
            <div className="space-y-12 reveal-on-scroll">
               <div className="flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-[#4fd1c5] rounded-full"></div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Gap-Bridging Projects</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {result.projectSuggestions.map((proj, i) => (
                    <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-[#4fd1c5]/30 transition-all space-y-6">
                       <div className="flex items-center justify-between">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#4fd1c5]"><i className="fas fa-folder-plus"></i></div>
                         <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-full">{proj.difficulty}</span>
                       </div>
                       <h4 className="text-lg font-black text-white uppercase">{proj.title}</h4>
                       <p className="text-slate-400 text-xs leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Outreach Synthesis Section */}
          <div className="space-y-12 reveal-on-scroll">
             <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-[#4fd1c5] rounded-full"></div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Outreach Synthesis</h3>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cold Email Synthesis */}
                <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 group hover:border-[#4fd1c5]/30 transition-all flex flex-col">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#4fd1c5]/10 rounded-xl flex items-center justify-center">
                          <i className="fas fa-paper-plane text-[#4fd1c5]"></i>
                        </div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Cold Protocol (Email)</h4>
                      </div>
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Synthesized for Context</div>
                   </div>

                   <div className="bg-black/40 rounded-3xl p-6 border border-white/5 mb-8 font-mono text-xs text-slate-400 space-y-4 leading-relaxed flex-grow text-left">
                      <p><span className="text-[#4fd1c5] font-bold">Subject:</span> {result.emailTemplate.subject}</p>
                      <div className="whitespace-pre-wrap">{result.emailTemplate.body}</div>
                   </div>

                   <Button 
                      onClick={() => handleCopy(`Subject: ${result.emailTemplate.subject}\n\n${result.emailTemplate.body}`, "result-email")}
                      variant={copyStatus === 'result-email' ? 'secondary' : 'primary'}
                      className="w-full h-14"
                   >
                      {copyStatus === 'result-email' ? 'Blueprint Copied' : 'Copy Email Blueprint'}
                   </Button>
                </div>

                {/* LinkedIn Synthesis */}
                <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 group hover:border-[#4fd1c5]/30 transition-all flex flex-col">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#4fd1c5]/10 rounded-xl flex items-center justify-center">
                          <i className="fab fa-linkedin-in text-[#4fd1c5]"></i>
                        </div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">LinkedIn Sync</h4>
                      </div>
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Connection Script</div>
                   </div>

                   <div className="space-y-6 flex-grow">
                      <div className="bg-black/40 rounded-3xl p-6 border border-white/5 font-mono text-xs text-slate-400 leading-relaxed text-left">
                        <div className="text-[9px] font-black text-[#4fd1c5] uppercase tracking-widest mb-3 opacity-60">Invitation Script</div>
                        <div className="whitespace-pre-wrap italic">"{result.linkedInTemplate.connectionRequest}"</div>
                      </div>

                      <div className="bg-black/40 rounded-3xl p-6 border border-white/5 font-mono text-xs text-slate-400 leading-relaxed text-left">
                        <div className="text-[9px] font-black text-[#4fd1c5] uppercase tracking-widest mb-3 opacity-60">Follow-up Message</div>
                        <div className="whitespace-pre-wrap italic">"{result.linkedInTemplate.followUp}"</div>
                      </div>
                   </div>

                   <Button 
                      onClick={() => handleCopy(`Invitation: ${result.linkedInTemplate.connectionRequest}\n\nFollow-up: ${result.linkedInTemplate.followUp}`, "result-linkedin")}
                      variant={copyStatus === 'result-linkedin' ? 'secondary' : 'primary'}
                      className="w-full h-14 mt-8"
                   >
                      {copyStatus === 'result-linkedin' ? 'Script Copied' : 'Copy LinkedIn Script'}
                   </Button>
                </div>
             </div>
          </div>

          {/* Navigation to next modules */}
          <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <Button onClick={() => window.location.hash = 'interview'} className="h-16">Go to Interview prep</Button>
             <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="secondary" className="h-16">New Analysis</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
