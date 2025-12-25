
import React, { useState, useEffect } from 'react';
import { ResumeData, ExperienceEntry, EducationEntry } from '../types/index';
import { optimizeResumeSection } from '../services/gemini';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/ui/Button';

const ResumeBuilder: React.FC = () => {
  const [data, setData] = useState<ResumeData>({
    name: '', email: '', phone: '', location: '', website: '',
    summary: '',
    experience: [{ company: '', role: '', period: '', location: '', description: '' }],
    education: [{ school: '', degree: '', period: '', location: '' }],
    skills: []
  });

  const [skillInput, setSkillInput] = useState('');
  const [optimizing, setOptimizing] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  useScrollReveal();

  const handleOptimize = async (type: string, currentContent: string, fieldPath: string) => {
    if (!currentContent.trim()) return;
    setOptimizing(fieldPath);
    try {
      const optimized = await optimizeResumeSection(type, currentContent);
      if (fieldPath === 'summary') {
        setData(prev => ({ ...prev, summary: optimized }));
      } else if (fieldPath.startsWith('exp')) {
        const index = parseInt(fieldPath.split('-')[1]);
        const newExp = [...data.experience];
        newExp[index].description = optimized;
        setData(prev => ({ ...prev, experience: newExp }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setOptimizing(null);
    }
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', period: '', location: '', description: '' }]
    }));
  };

  const removeExperience = (index: number) => {
    const newExp = data.experience.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, experience: newExp }));
  };

  const updateExperience = (index: number, field: keyof ExperienceEntry, value: string) => {
    const newExp = [...data.experience];
    (newExp[index] as any)[field] = value;
    setData(prev => ({ ...prev, experience: newExp }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', period: '', location: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    const newEdu = data.education.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, education: newEdu }));
  };

  const updateEducation = (index: number, field: keyof EducationEntry, value: string) => {
    const newEdu = [...data.education];
    (newEdu[index] as any)[field] = value;
    setData(prev => ({ ...prev, education: newEdu }));
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!data.skills.includes(skillInput.trim())) {
        setData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleDownload = () => {
    window.print();
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-24 text-left">
      <div className="space-y-6 reveal-on-scroll no-print">
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Resume <span className="text-[#4fd1c5]">Architect.</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Generating ATS-Compliant Professional Blueprints</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Editor Side */}
        <div className="space-y-12 reveal-on-scroll no-print">
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-[0.4em] border-b border-white/5 pb-2">Identity Hub</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-[#4fd1c5] transition-all" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
              <input type="text" placeholder="Email" className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-[#4fd1c5] transition-all" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
              <input type="text" placeholder="Phone" className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-[#4fd1c5] transition-all" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
              <input type="text" placeholder="Location" className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-[#4fd1c5] transition-all" value={data.location} onChange={e => setData({...data, location: e.target.value})} />
              <input type="text" placeholder="Website / Portfolio" className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-xs col-span-2 focus:border-[#4fd1c5] transition-all" value={data.website} onChange={e => setData({...data, website: e.target.value})} />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-[0.4em]">Professional Narrative</h3>
              <button 
                onClick={() => handleOptimize('summary', data.summary, 'summary')}
                className="text-[9px] font-black text-[#4fd1c5] uppercase tracking-widest hover:bg-[#4fd1c5]/10 px-3 py-1 rounded-full border border-[#4fd1c5]/20 transition-all"
                disabled={optimizing === 'summary'}
              >
                {optimizing === 'summary' ? 'Rewriting...' : 'Neural Rewrite'}
              </button>
            </div>
            <textarea 
              rows={4} 
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-xs focus:border-[#4fd1c5] transition-all resize-none" 
              placeholder="Briefly describe your high-level impact..." 
              value={data.summary} 
              onChange={e => setData({...data, summary: e.target.value})}
            />
          </section>

          <section className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-[0.4em]">Experience Nodes</h3>
              <button onClick={addExperience} className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">+ Add Experience</button>
            </div>
            
            {data.experience.map((exp, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 relative group/node">
                <button onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-slate-700 hover:text-rose-500 opacity-0 group-hover/node:opacity-100 transition-all">
                  <i className="fas fa-times-circle"></i>
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Company" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs" value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} />
                  <input type="text" placeholder="Role" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs" value={exp.role} onChange={e => updateExperience(i, 'role', e.target.value)} />
                  <input type="text" placeholder="Period" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs" value={exp.period} onChange={e => updateExperience(i, 'period', e.target.value)} />
                  <input type="text" placeholder="Location" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs" value={exp.location} onChange={e => updateExperience(i, 'location', e.target.value)} />
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleOptimize('experience', exp.description, `exp-${i}`)}
                    className="text-[8px] font-black text-[#4fd1c5] uppercase tracking-widest whitespace-nowrap px-3 py-1 rounded-full border border-[#4fd1c5]/20"
                    disabled={optimizing === `exp-${i}`}
                  >
                    {optimizing === `exp-${i}` ? 'Optimizing...' : 'Neural Rewrite'}
                  </button>
                </div>
                <textarea 
                  rows={4} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs resize-none" 
                  placeholder="Bullet points of your achievements (Use Neural Rewrite for better results)..." 
                  value={exp.description} 
                  onChange={e => updateExperience(i, 'description', e.target.value)}
                />
              </div>
            ))}
          </section>

          <section className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-[0.4em]">Academic Foundation</h3>
              <button onClick={addEducation} className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">+ Add Education</button>
            </div>
            
            {data.education.map((edu, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4 relative group/node">
                <button onClick={() => removeEducation(i)} className="absolute top-4 right-4 text-slate-700 hover:text-rose-500 opacity-0 group-hover/node:opacity-100 transition-all">
                  <i className="fas fa-times-circle"></i>
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Institution" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs col-span-2" value={edu.school} onChange={e => updateEducation(i, 'school', e.target.value)} />
                  <input type="text" placeholder="Degree" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs" value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} />
                  <input type="text" placeholder="Year" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs" value={edu.period} onChange={e => updateEducation(i, 'period', e.target.value)} />
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-[#4fd1c5] uppercase tracking-[0.4em]">Skills Inventory</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Press Enter to add skill (e.g. TypeScript, AWS, Figma)" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-[#4fd1c5]"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
              />
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-[#4fd1c5]/10 border border-[#4fd1c5]/20 text-[#4fd1c5] text-[10px] font-bold flex items-center gap-2">
                    {skill}
                    <button onClick={() => removeSkill(skill)}><i className="fas fa-times"></i></button>
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Live Preview / Print Container */}
        <div className="lg:sticky lg:top-40 space-y-8 reveal-on-scroll">
          <div className="rounded-[48px] border border-white/5 bg-white/[0.02] p-12 backdrop-blur-3xl min-h-[800px] flex flex-col shadow-2xl resume-print-container">
            {/* Header */}
            <div className="text-center space-y-4 mb-10 pb-8 border-b border-white/5">
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{data.name || 'ANONYMOUS UNIT'}</h1>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold text-[#4fd1c5] uppercase tracking-widest">
                <span>{data.email}</span>
                <span>{data.phone}</span>
                <span>{data.location}</span>
                {data.website && <span className="no-print">{data.website}</span>}
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-12 flex-grow text-left">
              {/* Summary */}
              {data.summary && (
                <section className="space-y-3">
                  <h2 className="text-[11px] font-black text-[#4fd1c5] uppercase tracking-[0.3em] border-b border-white/5 pb-1">Executive Summary</h2>
                  <p className="text-slate-400 text-xs leading-relaxed">{data.summary}</p>
                </section>
              )}

              {/* Experience */}
              <section className="space-y-6">
                <h2 className="text-[11px] font-black text-[#4fd1c5] uppercase tracking-[0.3em] border-b border-white/5 pb-1">Professional History</h2>
                <div className="space-y-8">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-black text-white uppercase">{exp.role || 'ROLE UNDEFINED'}</h3>
                        <span className="text-[10px] font-mono text-slate-600">{exp.period}</span>
                      </div>
                      <div className="flex justify-between items-baseline text-[10px] font-black text-[#4fd1c5] uppercase tracking-widest">
                        <span>{exp.company || 'ORGANIZATION'}</span>
                        <span className="text-slate-500 font-medium lowercase italic">{exp.location}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] leading-relaxed whitespace-pre-line pl-4 border-l border-white/5">
                        {exp.description || 'Awaiting synchronization nodes...'}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className="space-y-6">
                <h2 className="text-[11px] font-black text-[#4fd1c5] uppercase tracking-[0.3em] border-b border-white/5 pb-1">Academic Foundation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <h3 className="text-xs font-black text-white uppercase">{edu.school || 'INSTITUTION'}</h3>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">{edu.degree}</div>
                      <div className="text-[9px] font-mono text-slate-600">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              {data.skills.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-[11px] font-black text-[#4fd1c5] uppercase tracking-[0.3em] border-b border-white/5 pb-1">Technical Inventory</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {data.skills.map((skill, i) => (
                      <span key={i} className="text-xs font-medium text-slate-400">• {skill}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Print Footer */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-4 no-print">
               <Button onClick={handleDownload} className="flex-grow h-14">
                 <i className="fas fa-file-pdf mr-2"></i> Download ATS PDF
               </Button>
               <Button onClick={handleCopySchema} variant="secondary" className="h-14 px-6">
                 {copyStatus ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
               </Button>
            </div>
          </div>
          
          <div className="p-6 rounded-3xl bg-[#4fd1c5]/5 border border-[#4fd1c5]/10 flex gap-4 items-center no-print">
             <i className="fas fa-info-circle text-[#4fd1c5]"></i>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
               PDF export is optimized for text-based parsers. Use standard system margins during printing for best compatibility.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
