
import React from 'react';

const Campaigns: React.FC = () => {
  const campaigns = [
    { name: 'Black Friday Rush', code: 'ECOFRIDAY', discount: '15%', usage: '1,420', status: 'Live', type: 'Promo' },
    { name: 'Corporate Early Bird', code: 'CORP10', discount: '10%', usage: '89', status: 'Scheduled', type: 'B2B' },
    { name: 'New Rider Bonus', code: 'RIDEWELL', discount: '₦2,000', usage: '210', status: 'Paused', type: 'Retention' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Growth & Campaigns</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage marketing promotions, client incentives, and growth ROI tracking.</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
           Create Campaign
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Active Codes', val: '4', icon: 'confirmation_number' },
           { label: 'New Signups', val: '1,204', icon: 'person_add' },
           { label: 'Marketing ROI', val: '4.2x', icon: 'trending_up' },
           { label: 'Avg CAC', val: '₦840', icon: 'payments' },
         ].map((s, i) => (
           <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
              <div className="size-10 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary mb-4">
                 <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
              <h3 className="text-2xl font-black">{s.val}</h3>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {campaigns.map((c, i) => (
            <div key={i} className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 shadow-sm flex flex-col gap-8 group hover:border-primary transition-all">
               <div className="flex justify-between items-start">
                  <div>
                     <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${c.status === 'Live' ? 'bg-green-50 text-green-700' : 'bg-slate-100 dark:bg-gray-800'}`}>
                        {c.status}
                     </span>
                     <h3 className="text-xl font-black mt-2">{c.name}</h3>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black uppercase text-slate-400">Discount</p>
                     <p className="text-lg font-black text-primary">{c.discount}</p>
                  </div>
               </div>
               
               <div className="p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-gray-700 flex justify-between items-center">
                  <code className="text-sm font-black tracking-[0.3em]">{c.code}</code>
                  <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">content_copy</button>
               </div>

               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Usage</p>
                     <p className="text-lg font-black">{c.usage}</p>
                  </div>
                  <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Campaign Metrics</button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default Campaigns;
