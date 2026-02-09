
import React from 'react';

const Fuel: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Fuel & Energy</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Monitoring consumption trends, card balances, and carbon offsets.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 px-6 py-2.5 rounded-xl font-bold text-sm">Fuel Cards</button>
           <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Refill Account</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="font-black text-lg">Weekly Consumption (Liters)</h3>
                 <div className="flex gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400"><div className="size-2 bg-primary rounded-full"></div> GASOLINE</div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400"><div className="size-2 bg-green-500 rounded-full"></div> ELECTRIC</div>
                 </div>
              </div>
              <div className="flex items-end gap-3 h-48 px-4">
                 {[65, 40, 80, 55, 90, 75, 60].map((v, i) => (
                   <div key={i} className="flex-1 flex flex-col gap-1">
                      <div className="flex-1 bg-slate-100 dark:bg-gray-800 rounded-t-lg relative overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-primary" style={{ height: `${v}%` }}></div>
                        <div className="absolute bottom-0 w-full bg-green-500 opacity-30" style={{ height: `${v * 0.4}%` }}></div>
                      </div>
                      <span className="text-[9px] font-black text-center text-slate-400">DAY {i+1}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col gap-6">
                 <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Efficiency King</h4>
                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded">NEW RECORD</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-slate-100 overflow-hidden" style={{ backgroundImage: "url('https://picsum.photos/seed/driver/100/100')", backgroundSize: 'cover' }}></div>
                    <div>
                       <p className="text-lg font-black">Sarah Jenkins</p>
                       <p className="text-xs text-slate-500">4.2L / 100km • VH-119</p>
                    </div>
                 </div>
              </div>
              <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col gap-6">
                 <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Carbon Neutrality</h4>
                    <span className="text-[10px] font-black text-primary">LVL 4 Hub</span>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm font-black">
                       <span>Offset Target</span>
                       <span className="text-green-600">82%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500" style={{ width: '82%' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#101622] text-white p-8 rounded-3xl shadow-2xl space-y-8 h-full">
              <h3 className="text-xl font-black leading-tight">Current Fuel Prices (NGN)</h3>
              <div className="space-y-6">
                 {[
                   { type: 'Petrol (PMS)', price: '680.50', trend: 'down' },
                   { type: 'Diesel (AGO)', price: '1,120.00', trend: 'up' },
                   { type: 'Electricity (kW)', price: '45.20', trend: 'stable' }
                 ].map((f, i) => (
                   <div key={i} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-none">
                      <div>
                        <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">{f.type}</p>
                        <p className="text-xl font-black">₦{f.price}</p>
                      </div>
                      <span className={`material-symbols-outlined ${f.trend === 'up' ? 'text-red-500 rotate-45' : f.trend === 'down' ? 'text-green-500 -rotate-45' : 'text-slate-400'}`}>arrow_forward</span>
                   </div>
                 ))}
              </div>
              <div className="pt-6">
                 <button className="w-full py-4 bg-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30">Generate Cost Audit</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Fuel;
