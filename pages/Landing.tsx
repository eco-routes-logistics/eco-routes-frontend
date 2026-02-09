
import React from 'react';
// @ts-ignore
import { useNavigate, Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b101a] text-white font-display overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0b101a]/80 backdrop-blur-md border-b border-white/5 h-20 px-6 lg:px-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase leading-none">EcoRoute</h1>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Network</a>
          <a href="#drivers" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">For Drivers</a>
          <a href="#enterprise" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Enterprise</a>
          <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-white text-[#0b101a] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Command Center</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:px-20 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(19,91,236,0.15)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest animate-fade-in">
             <span className="size-2 rounded-full bg-primary animate-pulse"></span>
             v4.2 Hub Network Live across Nigeria
          </div>
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            Logistics at the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">Speed of AI</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium leading-relaxed">
            The intelligent backbone for modern African commerce. Predictive routing, sustainable fleet management, and real-time enterprise visibility.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button onClick={() => navigate('/onboarding')} className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/40 hover:scale-105 transition-all">Join the Fleet</button>
            <div className="w-full sm:w-auto relative group">
              <input 
                type="text" 
                placeholder="Enter Tracking ID (e.g. ORD-3492)" 
                className="w-full sm:w-80 h-[60px] bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all outline-none"
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/track/${(e.target as HTMLInputElement).value}`)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 size-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-white">search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-32 w-full max-w-6xl relative z-10">
          {[
            { label: 'Network SLA', val: '99.8%' },
            { label: 'Active Hubs', val: '124' },
            { label: 'Monthly Volume', val: '1.2M+' },
            { label: 'Carbon Offset', val: '42.5t' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center hover:bg-white/10 transition-colors">
              <p className="text-3xl lg:text-4xl font-black tracking-tighter mb-1">{s.val}</p>
              <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Elements Simulation */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-3xl opacity-50 pointer-events-none"></div>
    </div>
  );
};

export default Landing;
