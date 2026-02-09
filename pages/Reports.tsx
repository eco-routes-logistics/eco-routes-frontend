
import React from 'react';

const Reports: React.FC = () => {
  const reportCards = [
    { title: 'Tax & Compliance', desc: 'VAT and local logistics levy breakdown.', icon: 'account_balance' },
    { title: 'Fleet Efficiency', desc: 'Average fuel vs distance vs delivery success.', icon: 'speed' },
    { title: 'Client Billings', desc: 'Summary of all corporate account invoices.', icon: 'fact_check' },
    { title: 'Driver Payouts', desc: 'Detailed history of weekly wallet settlements.', icon: 'wallet' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Data & Reporting</h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Generate high-fidelity data exports for stakeholders.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reportCards.map((r, i) => (
          <div key={i} className="bg-white dark:bg-[#1a202c] rounded-3xl p-8 border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group flex flex-col gap-6">
            <div className="flex justify-between items-center">
               <div className="size-14 rounded-2xl bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{r.icon}</span>
               </div>
               <button className="p-3 bg-slate-50 dark:bg-gray-800 rounded-xl hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined">download</span>
               </button>
            </div>
            <div>
               <h3 className="text-xl font-black mb-2">{r.title}</h3>
               <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
            </div>
            <div className="pt-6 border-t border-slate-50 dark:border-gray-800 flex justify-between items-center">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Last updated 2h ago</span>
               <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Customize Range</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-10 border border-primary/20 text-center max-w-2xl mx-auto space-y-6">
         <span className="material-symbols-outlined text-6xl text-primary/40">auto_awesome</span>
         <h2 className="text-2xl font-black">AI-Powered Forecasting</h2>
         <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
           Our machine learning models predict a <span className="text-primary font-black">15% surge</span> in order volume next week due to seasonal patterns. Recommend scaling up rider onboarding now.
         </p>
         <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30">Generate Forecast Report</button>
      </div>
    </div>
  );
};

export default Reports;
