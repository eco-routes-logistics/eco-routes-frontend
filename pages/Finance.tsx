
import React from 'react';

const Finance: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Profit & Loss Ledger</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">High-level visibility into margins, tax liabilities, and operational burn rates.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 px-6 py-2.5 rounded-xl font-bold text-sm">Download Ledger</button>
           <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Tax Summary</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Net Revenue', val: '₦42.8M', change: '+12%', color: 'text-green-500' },
           { label: 'Operational Burn', val: '₦18.2M', change: '-4%', color: 'text-red-500' },
           { label: 'EBITDA Margin', val: '24.2%', change: '+2%', color: 'text-blue-500' },
           { label: 'Tax Reserves', val: '₦4.5M', change: 'Stable', color: 'text-slate-400' },
         ].map((s, i) => (
           <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
              <h3 className="text-2xl font-black mb-3">{s.val}</h3>
              <div className="flex items-center gap-1">
                 <span className={`text-[10px] font-bold ${s.color}`}>{s.change}</span>
                 <span className="text-[9px] text-slate-400 uppercase font-bold">vs last month</span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8">
            <div className="flex justify-between items-center mb-10">
               <h3 className="font-black text-lg">Revenue vs Expenses (MTD)</h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400"><div className="size-2 bg-primary rounded-full"></div> REVENUE</div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400"><div className="size-2 bg-red-500 rounded-full"></div> EXPENSES</div>
               </div>
            </div>
            <div className="h-64 flex items-end gap-2 px-2 relative">
               <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between opacity-5">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-full h-px bg-slate-900"></div>)}
               </div>
               {[40, 65, 55, 80, 70, 95, 85].map((v, i) => (
                  <div key={i} className="flex-1 flex gap-1 items-end h-full">
                     <div className="flex-1 bg-primary/20 rounded-t border-t border-primary/40 relative overflow-hidden" style={{ height: `${v}%` }}>
                        <div className="absolute inset-0 bg-primary/10"></div>
                     </div>
                     <div className="flex-1 bg-red-500/20 rounded-t border-t border-red-500/40" style={{ height: `${v * 0.4}%` }}></div>
                  </div>
               ))}
            </div>
            <div className="flex justify-between mt-6 px-4">
               {['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'].map(w => <span key={w} className="text-[10px] font-black text-slate-400">{w}</span>)}
            </div>
         </div>

         <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#101622] rounded-3xl p-8 text-white shadow-2xl space-y-6">
               <h4 className="font-black text-xl tracking-tight">Financial Health</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-white/50">Runway (Est.)</span>
                     <span className="font-bold">24 Months</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-white/50">Liquidity Ratio</span>
                     <span className="font-bold text-primary">1.82</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: '62%' }}></div>
                  </div>
               </div>
               <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30">Generate Audit Dossier</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Finance;
