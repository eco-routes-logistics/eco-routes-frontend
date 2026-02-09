
import React from 'react';

const Benchmarking: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Network Benchmarking</h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Cross-regional performance analysis and operational leaderboard.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-10 flex flex-col items-center text-center gap-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-[150px]">emoji_events</span>
               </div>
               <div className="space-y-2 relative z-10">
                  <h3 className="text-2xl font-black uppercase">The Podium</h3>
                  <p className="text-sm text-slate-500">Top performing units this week based on Fulfillment Speed vs Fuel Efficiency.</p>
               </div>

               <div className="flex items-end gap-6 w-full max-w-lg mt-4 h-64">
                  <div className="flex-1 flex flex-col gap-4">
                     <div className="h-[60%] bg-slate-100 dark:bg-gray-800 rounded-t-2xl relative flex flex-col justify-center items-center p-4">
                        <span className="text-2xl font-black text-slate-300">#2</span>
                        <p className="text-[9px] font-black uppercase text-slate-400">ABUJA HUB</p>
                     </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                     <div className="h-[90%] bg-primary rounded-t-2xl relative flex flex-col justify-center items-center p-4 shadow-2xl shadow-primary/30 border-t-4 border-white/20">
                        <span className="text-4xl font-black text-white">#1</span>
                        <p className="text-[9px] font-black uppercase text-white/60">LAGOS HUB 01</p>
                        <div className="absolute -top-10">
                           <span className="material-symbols-outlined text-4xl text-yellow-500 animate-bounce">emoji_events</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                     <div className="h-[40%] bg-slate-100 dark:bg-gray-800 rounded-t-2xl relative flex flex-col justify-center items-center p-4">
                        <span className="text-2xl font-black text-slate-300">#3</span>
                        <p className="text-[9px] font-black uppercase text-slate-400">PH CITY</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 space-y-6">
               <h3 className="font-black text-lg">Hub-to-Hub Radar Performance</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="relative size-64 mx-auto flex items-center justify-center opacity-40">
                     <div className="absolute inset-0 border border-slate-200 dark:border-gray-700 rounded-full"></div>
                     <div className="absolute inset-8 border border-slate-200 dark:border-gray-700 rounded-full"></div>
                     <div className="absolute inset-16 border border-slate-200 dark:border-gray-700 rounded-full"></div>
                     <svg className="absolute inset-0 size-full">
                        <path d="M128 20 L 220 128 L 128 230 L 36 128 Z" fill="rgba(19, 91, 236, 0.2)" stroke="#135bec" strokeWidth="2" />
                     </svg>
                  </div>
                  <div className="space-y-4">
                     {[
                        { label: 'Dispatch Speed', val: 92 },
                        { label: 'Safety Index', val: 88 },
                        { label: 'Asset Health', val: 75 },
                        { label: 'Client Growth', val: 95 }
                     ].map(m => (
                        <div key={m.label} className="space-y-1">
                           <div className="flex justify-between text-[10px] font-black uppercase">
                              <span>{m.label}</span>
                              <span className="text-primary">{m.val}%</span>
                           </div>
                           <div className="w-full h-1 bg-slate-100 dark:bg-gray-800 rounded-full">
                              <div className="h-full bg-primary" style={{ width: `${m.val}%` }}></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0b141a] rounded-3xl p-8 text-white h-full flex flex-col justify-between shadow-2xl">
               <div className="space-y-4">
                  <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
                  <h4 className="text-xl font-black leading-tight">Efficiency Insights</h4>
                  <p className="text-sm text-white/50 leading-relaxed">
                     Lagos Hub 01 is currently outperforming the network average in <span className="text-white font-bold">First-Mile fulfillment</span> by 18%. 
                     Recommend shadowing their hub managers for cross-regional training.
                  </p>
               </div>
               <div className="space-y-6 pt-10">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                     <div>
                        <p className="text-[10px] font-black text-white/40 uppercase">Top Regional Director</p>
                        <p className="text-sm font-bold">Olu. Chinedu</p>
                     </div>
                     <span className="material-symbols-outlined text-green-400">trending_up</span>
                  </div>
                  <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30">Share Performance Card</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Benchmarking;
