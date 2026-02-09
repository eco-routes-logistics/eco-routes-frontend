
import React from 'react';

const BusinessHub: React.FC = () => {
  const accounts = [
    { name: 'Acme Global', tier: 'Platinum', sla: 99.8, trend: '+4%', volume: '4.2k', risk: 'Low' },
    { name: 'TechSource Ltd', tier: 'Gold', sla: 94.2, trend: '-2%', volume: '1.2k', risk: 'Medium' },
    { name: 'PharmaDirect', tier: 'Platinum', sla: 100, trend: 'Stable', volume: '8.1k', risk: 'Low' },
    { name: 'City Retailers', tier: 'Silver', sla: 82.5, trend: '-12%', volume: '450', risk: 'High' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto h-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Business Strategic Hub</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Deep analysis of corporate accounts, volume commitments, and partner churn prediction.</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
           Partner Negotiation
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Active Contracts', val: '124', change: '+12' },
           { label: 'Avg SLA (Network)', val: '98.2%', change: '+0.4%' },
           { label: 'Churn Risk Alerts', val: '4', change: 'Red Alert' },
           { label: 'B2B Revenue Ratio', val: '64%', change: 'Steady' },
         ].map((s, i) => (
           <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col justify-between h-32">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{s.label}</p>
              <div className="flex justify-between items-end">
                 <h3 className="text-2xl font-black">{s.val}</h3>
                 <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${s.change.includes('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{s.change}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
         <div className="p-6 border-b border-slate-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
            <h3 className="font-black text-lg">Top Corporate Account Health</h3>
         </div>
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-slate-50 dark:border-gray-800">
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400">Partner Account</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400">Tier</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400">SLA Fulfillment</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400">Volume (MTD)</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">Churn Risk</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
               {accounts.map((a, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                     <td className="p-6">
                        <div className="flex items-center gap-3">
                           <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">{a.name.charAt(0)}</div>
                           <p className="text-sm font-bold">{a.name}</p>
                        </div>
                     </td>
                     <td className="p-6">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${a.tier === 'Platinum' ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-gray-800'}`}>{a.tier}</span>
                     </td>
                     <td className="p-6">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-black">{a.sla}%</span>
                           <span className={`text-[9px] font-bold ${a.trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{a.trend}</span>
                        </div>
                     </td>
                     <td className="p-6 font-bold text-sm">{a.volume} orders</td>
                     <td className="p-6 text-right">
                        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${a.risk === 'High' ? 'bg-red-500 text-white animate-pulse' : a.risk === 'Medium' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>
                           {a.risk}
                        </span>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
      
      <div className="bg-[#0b141a] rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">handshake</span>
         </div>
         <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight">Expansion Strategy</h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-xl">
               City Retailers volume has dropped <span className="text-red-400 font-bold">12%</span>. AI analysis suggests local pricing competition in the Surulere district. Recommend applying a <span className="text-primary font-bold">"Loyalty Rebate"</span> to retain the account.
            </p>
            <div className="flex gap-4 pt-2">
               <button className="bg-primary px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30">Apply Retention Policy</button>
               <button className="bg-white/10 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20">Analyze Market</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BusinessHub;
