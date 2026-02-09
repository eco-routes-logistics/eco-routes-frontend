
import React, { useState } from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const DispatchCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState('traffic');

  return (
    <div className="h-screen w-screen bg-[#0b101a] flex flex-col overflow-hidden text-white font-display">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0b101a]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="size-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all">
             <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
              Global Dispatch Center
              <span className="px-2 py-0.5 bg-green-500 text-[10px] rounded animate-pulse">LIVE</span>
            </h1>
            <p className="text-[10px] text-white/40 uppercase font-bold">Lagos Metropolitan Grid • 42 active couriers</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex bg-white/5 p-1 rounded-xl">
              {['traffic', 'density', 'weather'].map(l => (
                <button 
                  key={l}
                  onClick={() => setActiveLayer(l)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeLayer === l ? 'bg-primary text-white shadow-lg' : 'text-white/40'}`}
                >
                  {l}
                </button>
              ))}
           </div>
           <div className="h-8 w-px bg-white/10"></div>
           <button className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20">Assign Orders</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Live Order Feed */}
        <aside className="w-80 border-r border-white/10 bg-[#0b101a]/90 backdrop-blur-xl flex flex-col z-10">
          <div className="p-4 border-b border-white/10">
            <input className="w-full h-10 bg-white/5 border-none rounded-xl text-xs px-4 focus:ring-primary" placeholder="Filter orders..." />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/50 transition-all cursor-pointer group">
                 <div className="flex justify-between items-start mb-2">
                   <span className="text-[10px] font-black text-primary">#ORD-492{i}</span>
                   <span className="text-[9px] text-white/40">2m ago</span>
                 </div>
                 <h4 className="text-xs font-bold mb-1">Victoria Island → Lekki</h4>
                 <p className="text-[10px] text-white/40">5kg Package • High Priority</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Center: Main Interactive Map (SVG Simulation) */}
        <main className="flex-1 relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
           <svg className="w-full h-full opacity-60">
              <defs>
                 <radialGradient id="hotspot" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#135bec" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#135bec" stopOpacity="0" />
                 </radialGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="200" x2="100%" y2="200" stroke="white" strokeOpacity="0.05" />
              <line x1="400" y1="0" x2="400" y2="100%" stroke="white" strokeOpacity="0.05" />
              
              {/* Route Path */}
              <path d="M100 100 L 300 150 L 500 400 L 700 350" stroke="#135bec" strokeWidth="2" fill="none" className="animate-pulse" strokeDasharray="10 5" />
              
              {/* Hotzones */}
              <circle cx="200" cy="200" r="100" fill="url(#hotspot)" />
              <circle cx="600" cy="400" r="120" fill="url(#hotspot)" />

              {/* Courier Markers */}
              <g className="animate-bounce">
                <circle cx="300" cy="150" r="6" fill="#135bec" stroke="white" strokeWidth="2" />
                <text x="312" y="154" fill="white" fontSize="10" fontWeight="bold">VH-102</text>
              </g>
           </svg>

           {/* Floating Map Controls */}
           <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <button className="size-10 bg-[#1a2230] border border-white/10 rounded-xl flex items-center justify-center shadow-2xl">
                <span className="material-symbols-outlined">add</span>
              </button>
              <button className="size-10 bg-[#1a2230] border border-white/10 rounded-xl flex items-center justify-center shadow-2xl">
                <span className="material-symbols-outlined">remove</span>
              </button>
              <button className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-2xl shadow-primary/20 mt-2">
                <span className="material-symbols-outlined">my_location</span>
              </button>
           </div>
        </main>

        {/* Right Sidebar: Fleet Stats */}
        <aside className="w-80 bg-[#0b101a]/95 border-l border-white/10 p-6 flex flex-col gap-8">
           <section>
              <h3 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-4">Live Performance</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-xs font-bold">Lekki Sector</span>
                    <span className="text-green-500 text-xs font-black">98% Efficient</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[98%]"></div>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-xs font-bold">Ikeja Hub</span>
                    <span className="text-amber-500 text-xs font-black">Congested</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[65%]"></div>
                 </div>
              </div>
           </section>

           <section className="flex-1">
              <h3 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-4">Available Crew</h3>
              <div className="space-y-4">
                 {['Sarah J.', 'Mike R.', 'Elena K.'].map(name => (
                   <div key={name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-700" style={{ backgroundImage: `url('https://picsum.photos/seed/${name}/100/100')`, backgroundSize: 'cover' }}></div>
                        <span className="text-xs font-bold">{name}</span>
                      </div>
                      <span className="size-2 rounded-full bg-green-500"></span>
                   </div>
                 ))}
              </div>
           </section>

           <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <p className="text-[10px] font-black text-primary uppercase mb-2">Smart Alert</p>
              <p className="text-[11px] leading-relaxed text-white/70 font-medium">Predicted rain in Surulere in 15min. Recommend rerouting two-wheelers.</p>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default DispatchCenter;
