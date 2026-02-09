
import React from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const RouteLab: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#050b1a] flex flex-col overflow-hidden text-white font-display">
      <header className="h-16 border-b border-white/5 bg-[#050b1a]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="size-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center">
             <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
              Route Optimization Lab
              <span className="px-2 py-0.5 bg-cyan-500 text-[10px] rounded">BETA</span>
            </h1>
            <p className="text-[10px] text-white/30 uppercase font-bold tracking-tight">AI Engine v4.2 • Grid Simulator</p>
          </div>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-500 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20">Generate Optimal Plan</button>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <aside className="w-80 border-r border-white/5 bg-[#050b1a]/95 flex flex-col z-10 p-6 gap-8">
           <section>
              <h3 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-4">Simulation Params</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                       <span>Traffic Density</span>
                       <span className="text-cyan-400">High</span>
                    </div>
                    <input type="range" className="w-full accent-cyan-500" />
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                       <span>Fuel Threshold</span>
                       <span className="text-cyan-400">20%</span>
                    </div>
                    <input type="range" className="w-full accent-cyan-500" />
                 </div>
              </div>
           </section>

           <section className="flex-1">
              <h3 className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-4">Saved Scenarios</h3>
              <div className="space-y-3">
                 {['Mon Peak - Lekki', 'Rainy Day - Ikeja', 'Late Night Bulk'].map(s => (
                   <div key={s} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-cyan-500/50 cursor-pointer transition-all">
                      <p className="text-xs font-bold">{s}</p>
                      <p className="text-[9px] text-white/30 uppercase font-black mt-1">94% Efficiency</p>
                   </div>
                 ))}
              </div>
           </section>
        </aside>

        <main className="flex-1 relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]">
           <div className="absolute inset-0 bg-gradient-to-tr from-[#050b1a] to-transparent pointer-events-none"></div>
           
           <svg className="w-full h-full opacity-40">
              <defs>
                 <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                    <feMerge>
                       <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                    </feMerge>
                 </filter>
              </defs>
              <g filter="url(#glow)">
                 <path d="M100 100 L 400 300 L 700 200" stroke="#06b6d4" strokeWidth="2" fill="none" strokeDasharray="10 5" className="animate-pulse" />
                 <circle cx="100" cy="100" r="4" fill="#06b6d4" />
                 <circle cx="400" cy="300" r="4" fill="#06b6d4" />
                 <circle cx="700" cy="200" r="4" fill="#06b6d4" />
              </g>
           </svg>

           {/* Floating Info Panels */}
           <div className="absolute top-10 right-10 flex flex-col gap-4">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl w-64 shadow-2xl">
                 <h4 className="text-[10px] font-black uppercase text-white/40 mb-3">Predicted Savings</h4>
                 <div className="flex items-end justify-between">
                    <span className="text-3xl font-black text-cyan-400 tracking-tighter">₦42.5k</span>
                    <span className="text-xs font-bold text-green-500 mb-1">/ day</span>
                 </div>
                 <p className="text-[9px] text-white/30 mt-2">Based on batching VI and Lekki Phase 1 orders.</p>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default RouteLab;
