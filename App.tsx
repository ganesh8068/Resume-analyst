
import React, { useState, useEffect } from 'react';
import { ViewState } from './types/index';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StatusTicker from './components/layout/StatusTicker';
import Background3D from './components/common/Background3D';

import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import About from './pages/About';
import Roadmap from './pages/Roadmap';
import Templates from './pages/Templates';
import InterviewPrep from './pages/InterviewPrep';
import Negotiator from './pages/Negotiator';
import Strategist from './pages/Strategist';
import ResumeBuilder from './pages/ResumeBuilder';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');

  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '');
      const validViews: ViewState[] = ['analyzer', 'interview', 'about', 'roadmap', 'templates', 'negotiator', 'builder'];
      
      if (validViews.includes(rawHash as ViewState)) {
        setView(rawHash as ViewState);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (rawHash === '' || rawHash === 'home') {
        setView('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const changeView = (v: ViewState) => {
    setView(v);
    window.location.hash = v === 'home' ? '' : v;
  };

  return (
    <div className="min-h-screen bg-[#020203] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden flex flex-col">
      <Background3D />
      
      <Navbar currentView={view} setView={changeView} />

      <main className="relative z-10 flex-grow">
        {view === 'home' && <Home setView={changeView} onStart={() => changeView('analyzer')} />}
        {view === 'analyzer' && <Analyzer />}
        {view === 'interview' && <InterviewPrep />}
        {view === 'negotiator' && <Negotiator />}
        {view === 'builder' && <ResumeBuilder />}
        {view === 'about' && <About />}
        {view === 'roadmap' && <Roadmap />}
        {view === 'templates' && <Templates />}
      </main>

      <Footer />
      <StatusTicker />
      
      <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default App;
