
import React from 'react';
import Button from '../components/ui/Button';
// Fix: Use types/index to get the complete ViewState type definition
import { ViewState } from '../types/index';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface HomeProps {
  onStart: () => void;
  setView: (v: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onStart, setView }) => {
  useScrollReveal();

  return (
    <div className="reveal-view relative">
      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center min-h-screen pt-32 pb-24 px-6 text-center relative overflow-hidden">
        
        {/* Badge - NEURAL-NETWORK POWERED SELECTION */}
        <div className="reveal-on-scroll mb-16 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#1e1b4b]/40 border border-indigo-500/30 text-indigo-300 text-[10px] font-black tracking-[0.3em] uppercase shadow-[0_0_40px_rgba(99,102,241,0.2)]">
          <i className="fas fa-microchip animate-pulse"></i>
          Neural-Network Powered Selection
        </div>

        <div className="max-w-6xl w-full relative z-10 flex flex-col items-center justify-center">
          
          <div className="flex flex-col items-center relative">
            <h1 className="reveal-on-scroll text-7xl md:text-[9rem] font-black text-white leading-tight tracking-tighter transition-all duration-1000 mb-0">
              Where careers become
            </h1>
            
            {/* The Visual Graphic Node from user image */}
            <div className="reveal-on-scroll relative py-4 w-full max-w-lg flex justify-center transition-all duration-1000" style={{ transitionDelay: '150ms' }}>
              {/* Gradient Box */}
              <div className="relative w-[500px] h-[220px] bg-gradient-to-r from-[#818cf8] via-[#4fd1c5] to-[#818cf8] rounded-sm opacity-90 shadow-[0_0_120px_rgba(79,209,197,0.3)]"></div>
              
              {/* Wireframe Box Overlapping */}
              <div className="absolute top-[60%] left-[30%] translate-x-[-50%] translate-y-[-50%] w-[480px] h-[210px] border-[2.5px] border-[#818cf8]/80 rounded-sm z-20"></div>

              {/* Tagline inside/near graphic area */}
              <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full max-w-xl">
                 <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed opacity-90">
                    Build a superior professional identity through simple neural synchronization. 
                    Reverse-engineer high-stakes hiring algorithms in seconds.
                 </p>
              </div>
            </div>

            <h1 className="reveal-on-scroll text-[9rem] md:text-[14rem] font-black text-white leading-none tracking-tighter transition-all duration-1000 mt-[120px]" style={{ transitionDelay: '300ms' }}>
              Reality.
            </h1>
          </div>
          
          <div className="reveal-on-scroll pt-24 flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-3xl mx-auto" style={{ transitionDelay: '450ms' }}>
            <Button onClick={onStart} className="w-full sm:w-[320px]">
              Initiate Analysis
            </Button>
            <Button onClick={() => setView('about')} variant="secondary" className="w-full sm:w-[320px]">
              View Feature Set
            </Button>
          </div>
        </div>

        {/* Floating background characters layer to match reference */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 overflow-hidden select-none">
           <div className="flex flex-wrap gap-12 p-10 font-mono text-[12px] text-white">
              {Array.from({ length: 400 }).map((_, i) => (
                <span key={i} className="animate-pulse" style={{ animationDelay: `${Math.random() * 10}s` }}>
                  {['Φ', 'Δ', 'Ω', 'Σ', 'λ', 'μ', 'π', '0', '1', 'E', 'N', 'M', 'C', '+', 'Q'].sort(() => Math.random() - 0.5)[0]}
                </span>
              ))}
           </div>
        </div>
      </section>

      {/* Feature Modules - Brief version as home is already content rich */}
      <section className="py-40 px-6 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-4 reveal-on-scroll">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Operational Modules.</h2>
            <div className="w-24 h-1 bg-teal-400 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Quantum-Grade Resume Intelligence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-brain', title: 'Semantic Linking', desc: 'Identifies latent skill relationships that traditional ATS scanners miss using vector embedding analysis.' },
              { icon: 'fa-shield-halved', title: 'ATS Decryption', desc: 'Reverse-engineered parsing logic that reveals exactly how high-end corporate filters view your document.' },
              { icon: 'fa-envelope-open-text', title: 'Outreach Synthesis', desc: 'Generates high-conversion cold emails and LinkedIn hooks tailored to specific role requirements.' }
            ].map((module, i) => (
              <div key={i} className="reveal-on-scroll glass-card p-12 rounded-[40px] border border-white/5 hover:border-teal-500/30 transition-all group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <i className={`fas ${module.icon} text-2xl text-teal-400`}></i>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">{module.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-40 px-6 border-t border-white/5 bg-[#050508]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { value: '98%', label: 'ATS Bypass Rate' },
            { value: '0.04s', label: 'Inference Speed' },
            { value: '15k+', label: 'Profiles Synced' },
            { value: '24/7', label: 'System Uptime' }
          ].map((stat, i) => (
            <div key={i} className="reveal-on-scroll">
              <div className="text-5xl md:text-7xl font-black text-white mb-2 tabular-nums">{stat.value}</div>
              <div className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 px-6 bg-gradient-to-b from-transparent to-[#5851f2]/10">
        <div className="max-w-4xl mx-auto text-center space-y-12 reveal-on-scroll">
          <h2 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter">Ready to link?</h2>
          <p className="text-slate-400 text-xl font-medium">Join the elite network of synchronized professionals.</p>
          <div className="pt-8">
            <Button onClick={onStart} className="mx-auto h-24 w-full max-w-md text-sm">
              Begin Synchronization
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
