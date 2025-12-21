
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/ui/Button';

const Templates: React.FC = () => {
  useScrollReveal();
  
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-32">
      {/* Page Header */}
      <div className="text-center space-y-6 reveal-on-scroll">
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Neural <span className="text-[#4fd1c5]">Assets.</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">High-Conversion Blueprints for Professional Synchronization</p>
      </div>

      {/* 1. Resume Section */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 reveal-on-scroll">
          <div className="w-1.5 h-8 bg-[#4fd1c5] rounded-full"></div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">01. Resume Schemas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "The Minimalist", icon: "fa-border-none", desc: "Extreme focus on impact metrics and whitespace. Optimized for high-growth tech firms.", badge: "Popular" },
            { name: "The Architect", icon: "fa-code", desc: "Technical layout emphasizing project architecture, stack proficiency, and code quality.", badge: "Technical" }
          ].map((t, i) => (
            <div key={i} className="reveal-on-scroll p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-[#4fd1c5]/30 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-[#4fd1c5]/10 rounded-xl flex items-center justify-center">
                  <i className={`fas ${t.icon} text-[#4fd1c5]`}></i>
                </div>
                <span className="text-[8px] font-black text-[#4fd1c5] border border-[#4fd1c5]/20 px-3 py-1 rounded-full uppercase tracking-widest">{t.badge}</span>
              </div>
              <h4 className="text-xl font-black text-white uppercase mb-3">{t.name}</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">{t.desc}</p>
              <Button variant="secondary" className="w-full h-12 text-[9px]">Preview DNA</Button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Cover Letter Section */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 reveal-on-scroll">
          <div className="w-1.5 h-8 bg-[#4fd1c5] rounded-full"></div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">02. Cover Letter Blueprints</h3>
        </div>
        <div className="reveal-on-scroll p-10 rounded-[48px] bg-white/[0.02] border border-white/5 group hover:border-[#4fd1c5]/30 transition-all">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3 space-y-6">
              <div className="w-16 h-16 bg-[#4fd1c5]/10 rounded-2xl flex items-center justify-center">
                <i className="fas fa-file-signature text-2xl text-[#4fd1c5]"></i>
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">The "Impact-First" Protocol</h4>
              <p className="text-slate-400 text-sm leading-relaxed">A modular cover letter structure designed to hook recruiters in the first 3 seconds by addressing specific pain points.</p>
              <ul className="space-y-3">
                {['Direct Hook Intro', 'Skill-Value Alignment', 'The "Why Us" Vector', 'Call to Action'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <i className="fas fa-check text-[#4fd1c5]"></i> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/3">
              <div className="bg-black/40 rounded-3xl p-8 border border-white/5 font-mono text-xs text-slate-400 leading-relaxed relative">
                <div className="absolute top-4 right-6 text-[8px] text-[#4fd1c5] font-black tracking-widest uppercase">Content Payload</div>
                <p className="mb-4">Dear [Hiring Manager Name],</p>
                <p className="mb-4">I’m writing to you because [Company Name] is currently [Scaling/Innovating/Solving Problem], and my background in [Core Skill] aligns perfectly with your goal to [Specific Company Goal].</p>
                <p className="mb-4">In my previous cycle at [Last Company], I successfully [Metric-Driven Achievement]. This experience directly translates to how I would approach [Specific JD Requirement] at [Company Name].</p>
                <p className="mb-4">I’m especially drawn to your approach to [Company Value/Tech Stack] and would welcome the chance to discuss how my neural assets can contribute to your upcoming projects.</p>
                <p>Best regards,<br/>[Your Name]</p>
              </div>
              <Button 
                onClick={() => handleCopy("Dear [Hiring Manager Name],\n\nI’m writing to you because [Company Name] is currently [Scaling/Innovating/Solving Problem], and my background in [Core Skill] aligns perfectly with your goal to [Specific Company Goal].\n\nIn my previous cycle at [Last Company], I successfully [Metric-Driven Achievement]. This experience directly translates to how I would approach [Specific JD Requirement] at [Company Name].\n\nI’m especially drawn to your approach to [Company Value/Tech Stack] and would welcome the chance to discuss how my neural assets can contribute to your upcoming projects.\n\nBest regards,\n[Your Name]", "cover-letter")}
                variant={copyStatus === 'cover-letter' ? 'secondary' : 'primary'}
                className="w-full mt-6 h-14 text-[10px]"
              >
                {copyStatus === 'cover-letter' ? 'Blueprint Synchronized' : 'Copy Cover Letter Blueprint'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 & 4. Outreach Protocols */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 reveal-on-scroll">
          <div className="w-1.5 h-8 bg-[#4fd1c5] rounded-full"></div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">03 & 04. Outreach Protocols</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cold Email Card */}
          <div className="reveal-on-scroll p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-[#4fd1c5]/30 transition-all text-left flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#4fd1c5]/10 rounded-xl flex items-center justify-center">
                <i className="fas fa-paper-plane text-[#4fd1c5]"></i>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight">Cold Email Sync</h4>
            </div>
            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-6 font-mono text-[10px] text-slate-500 flex-grow">
              <p className="mb-2"><span className="text-[#4fd1c5]">SUBJ:</span> [Target Role] Inquiry - [Your Name]</p>
              <p>Hi [Name], I've been following [Company]'s growth in [Sector]. With my background in [Skill], I'm interested in the [Role]. Attached is my CV for review. Open for a brief sync?</p>
            </div>
            <Button 
              onClick={() => handleCopy("SUBJ: [Target Role] Inquiry - [Your Name]\n\nHi [Name], I've been following [Company]'s growth in [Sector]. With my background in [Skill], I'm interested in the [Role]. Attached is my CV for review. Open for a brief sync?", "cold-email")}
              variant={copyStatus === 'cold-email' ? 'secondary' : 'primary'}
              className="w-full h-12 text-[9px]"
            >
              {copyStatus === 'cold-email' ? 'Synced' : 'Copy Email Blueprint'}
            </Button>
          </div>

          {/* LinkedIn Card */}
          <div className="reveal-on-scroll p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-[#4fd1c5]/30 transition-all text-left flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#4fd1c5]/10 rounded-xl flex items-center justify-center">
                <i className="fab fa-linkedin-in text-[#4fd1c5]"></i>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight">LinkedIn Connect</h4>
            </div>
            <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-6 font-mono text-[10px] text-slate-500 flex-grow">
              <p>Hi [Name], I noticed your work at [Company] regarding [Topic]. As a fellow [Your Role], I’d love to connect and follow your professional journey. Best, [Your Name].</p>
            </div>
            <Button 
              onClick={() => handleCopy("Hi [Name], I noticed your work at [Company] regarding [Topic]. As a fellow [Your Role], I’d love to connect and follow your professional journey. Best, [Your Name].", "linkedin")}
              variant={copyStatus === 'linkedin' ? 'secondary' : 'primary'}
              className="w-full h-12 text-[9px]"
            >
              {copyStatus === 'linkedin' ? 'Synced' : 'Copy LinkedIn Script'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
