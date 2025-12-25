
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/ui/Button';

interface TemplateCardProps {
  title: string;
  description: string;
  icon: string;
  content: string;
  type: 'Resume' | 'Cover Letter' | 'Cold Email' | 'LinkedIn';
  onCopy: (text: string, id: string) => void;
  copyStatus: boolean;
  id: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  title, description, icon, content, type, onCopy, copyStatus, id 
}) => (
  <div className="reveal-on-scroll p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-[#4fd1c5]/30 transition-all flex flex-col h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-[#4fd1c5]/10 rounded-xl flex items-center justify-center">
        <i className={`fas ${icon} text-[#4fd1c5] text-xl`}></i>
      </div>
      <span className="text-[8px] font-black text-[#4fd1c5] border border-[#4fd1c5]/20 px-3 py-1 rounded-full uppercase tracking-widest">
        {type}
      </span>
    </div>
    
    <div className="flex-grow">
      <h4 className="text-xl font-black text-white uppercase mb-3 tracking-tight group-hover:text-[#4fd1c5] transition-colors">
        {title}
      </h4>
      <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
        {description}
      </p>
      
      <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mb-6 font-mono text-[10px] text-slate-500 line-clamp-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-2xl"></div>
        {content}
      </div>
    </div>

    <Button 
      variant={copyStatus ? 'secondary' : 'primary'}
      onClick={() => onCopy(content, id)}
      className="w-full h-12 text-[9px]"
    >
      {copyStatus ? 'Blueprint Synced' : 'Copy Blueprint'}
    </Button>
  </div>
);

const Templates: React.FC = () => {
  useScrollReveal();
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const templatesData: Omit<TemplateCardProps, 'onCopy' | 'copyStatus' | 'id'>[] = [
    {
      type: 'Resume',
      title: 'The Minimalist Schema',
      description: 'Ultra-lean impact-focused structure. Designed to pass elite tech firm parsers with 99% accuracy.',
      icon: 'fa-border-none',
      content: '[SUMMARY]\n- Quantitative high-impact metrics\n- Skill cloud mapping\n- Experience synchronization nodes\n- Academic credentials'
    },
    {
      type: 'Resume',
      title: 'The Architect Layout',
      description: 'Technical blueprint emphasizing engineering depth, stack architecture, and code contributions.',
      icon: 'fa-code',
      content: '[TECH STACK]\n- Systems Architecture\n- Scalable API Development\n- CI/CD Orchestration\n- Core Engineering Contributions'
    },
    {
      type: 'Cover Letter',
      title: 'Impact-First Protocol',
      description: 'Modular cover letter structure designed to trigger a psychological hook in the first 3 seconds.',
      icon: 'fa-file-signature',
      content: 'Dear [Hiring Manager Name],\n\n[Company Name] is currently scaling [Specific Goal], and my background in [Core Skill] aligns with your goal to [Specific Objective]. In my previous cycle at [Last Company], I achieved [Metric].'
    },
    {
      type: 'Cold Email',
      title: 'The Direct Link Hook',
      description: 'High-conversion cold email for direct recruiter contact. Optimized for readability on mobile devices.',
      icon: 'fa-paper-plane',
      content: 'SUBJ: [Target Role] Inquiry - [Your Name]\n\nHi [Name],\n\nI noticed [Company] is innovating in [Sector]. With my background in [Skill], I believe I can help with [Goal]. Attached is my CV. Open for a brief sync?'
    },
    {
      type: 'LinkedIn',
      title: 'Network Sync Script',
      description: 'Professional connection request designed to build trust without triggering sales filters.',
      icon: 'fa-link',
      content: 'Hi [Name], I noticed your work at [Company] regarding [Topic]. As a fellow [Your Role], I’d love to connect and follow your professional journey.\n\nBest, [Your Name]'
    },
    {
      type: 'LinkedIn',
      title: 'The Follow-Up Node',
      description: 'Low-friction follow-up sequence to re-engage recruiters after a successful connection.',
      icon: 'fa-comment-dots',
      content: 'Hi [Name], thanks for the connection. I saw [Company] just launched [Product/News]—really impressive work. If you have 5 mins next week, I’d love to learn more about the engineering culture there.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 reveal-view space-y-32">
      <div className="text-center space-y-6 reveal-on-scroll">
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Neural <span className="text-[#4fd1c5]">Assets.</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">High-Fidelity blueprints for professional synchronization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templatesData.map((template, index) => {
          const id = `template-${index}`;
          return (
            <TemplateCard 
              key={id}
              id={id}
              {...template}
              onCopy={handleCopy}
              copyStatus={copyStatus === id}
            />
          );
        })}
      </div>

      <div className="pt-20 reveal-on-scroll">
        <div className="p-12 rounded-[64px] bg-white/[0.02] border border-white/5 text-center space-y-8 max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-[#4fd1c5]/10 rounded-2xl flex items-center justify-center mx-auto">
            <i className="fas fa-terminal text-2xl text-[#4fd1c5]"></i>
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Need custom logic?</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
            Our Neural Analyzer generates role-specific templates unique to your professional DNA during every analysis sequence.
          </p>
          <Button onClick={() => window.location.hash = 'analyzer'} className="h-14">Initiate New Analysis</Button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
