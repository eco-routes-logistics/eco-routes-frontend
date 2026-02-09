
import React from 'react';

const Regions: React.FC = () => {
  const regions = [
    { name: 'Lagos Metropolis', code: 'LOS', hubs: 12, performance: 'High', health: 94 },
    { name: 'Abuja Central', code: 'ABJ', hubs: 4, performance: 'Steady', health: 88 },
    { name: 'Port Harcourt', code: 'PHC', hubs: 2, performance: 'Growth', health: 72 },
    { name: 'Ibadan North', code: 'IBD', hubs: 1, performance: 'Pilot', health: 45 },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Regional Governance</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Monitor multi-city operations, localized tax rules, and regional SLAs.</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Launch New Region</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {regions.map((reg, i) => (
           <div key={i} className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm p-8 flex flex-col gap-8 group hover:border-primary transition-all">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                       <span className="material-symbols-outlined text-3xl">map</span>
                    </div>
                    <div>
                       <h3 className="text-xl font-black">{reg.name}</h3>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Regional Code: {reg.code}</p>
                    </div>
                 </div>
                 <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${reg.health > 80 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                    {reg.performance}
                 </span>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-50 dark:border-gray-800">
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Active Hubs</p>
                    <p className="text-2xl font-black">{reg.hubs}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Operational Health</p>
                    <p className="text-2xl font-black">{reg.health}%</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button className="flex-1 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Regional SLA</button>
                 <button className="flex-1 py-3 bg-slate-50 dark:bg-gray-800 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Local Tax Rules</button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Regions;
