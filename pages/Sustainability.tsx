
import React from 'react';

const Sustainability: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Sustainability</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Driving towards Net Zero. Monitor carbon offsets and green fleet metrics.</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-500/20">Download ESG Report</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-6">
           <div className="size-24 rounded-full border-[6px] border-green-100 dark:border-green-900/30 flex items-center justify-center relative">
              <span className="material-symbols-outlined text-4xl text-green-500">eco</span>
              <svg className="absolute inset-0 size-full -rotate-90">
                <circle cx="48" cy="48" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-green-500" strokeDasharray="264" strokeDashoffset="66" />
              </svg>
           </div>
           <div>
              <h3 className="text-2xl font-black">1,420 kg</h3>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">CO2 Offset (MTD)</p>
           </div>
           <p className="text-xs text-slate-500 leading-relaxed italic">Equivalent to planting 64 mature trees in the Lagos metropolis.</p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { label: 'EV Adoption Rate', val: '12%', color: 'bg-blue-500', icon: 'electric_rickshaw' },
             { label: 'Eco-Driving Score', val: '88/100', color: 'bg-green-500', icon: 'speed' },
             { label: 'Route Efficiency', val: '+18%', color: 'bg-primary', icon: 'auto_awesome' },
             { label: 'Idle Time Reduction', val: '-24%', color: 'bg-red-500', icon: 'timer_off' },
           ].map((s, i) => (
             <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex items-center gap-6">
                <div className="size-12 rounded-2xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary">
                   <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{s.label}</p>
                   <h4 className="text-xl font-black">{s.val}</h4>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-[#0b141a] rounded-3xl p-10 text-white flex flex-col lg:flex-row gap-10 items-center overflow-hidden relative">
         <div className="absolute top-0 right-0 p-10 opacity-5">
            <span className="material-symbols-outlined text-[200px]">forest</span>
         </div>
         <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-black">Green Hub Certification</h2>
            <p className="text-sm text-white/60 leading-relaxed max-w-xl">
               Your main Lagos Hub has reached <span className="text-green-400 font-bold">Tier 2 Eco-Certification</span>. Installing solar panels and transitioning to 100% biodegradable packaging will unlock Tier 3.
            </p>
            <div className="flex gap-4 pt-2">
               <button className="bg-green-600 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest">Upgrade Hub</button>
               <button className="bg-white/10 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest">View Guidelines</button>
            </div>
         </div>
         <div className="w-64 space-y-6 shrink-0 relative z-10">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
               <p className="text-[10px] font-black uppercase text-white/40 mb-2">Top Green Courier</p>
               <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-700" style={{ backgroundImage: "url('https://picsum.photos/seed/green/100/100')", backgroundSize: 'cover' }}></div>
                  <div>
                    <p className="text-sm font-bold">O. Chinedu</p>
                    <p className="text-[9px] text-green-400 font-black">99.8% ECO-SCORE</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Sustainability;
