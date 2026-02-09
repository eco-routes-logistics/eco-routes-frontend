
import React from 'react';

const Payroll: React.FC = () => {
  const payouts = [
    { driver: 'Sarah Jenkins', base: '₦45,000', bonus: '₦12,500', tax: '₦2,800', net: '₦54,700', status: 'Pending' },
    { driver: 'Michael Chen', base: '₦62,000', bonus: '₦8,000', tax: '₦3,100', net: '₦66,900', status: 'Paid' },
    { driver: 'David Ross', base: '₦38,000', bonus: '₦2,000', tax: '₦1,900', net: '₦38,100', status: 'Paid' },
    { driver: 'Emily Watson', base: '₦82,000', bonus: '₦25,000', tax: '₦5,200', net: '₦101,800', status: 'Pending' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Payroll & HR</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage distributed driver payouts, tax deductions, and performance bonuses.</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Process Cycle</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Payroll', val: '₦12.8M', icon: 'payments' },
           { label: 'Bonus Pool', val: '₦1.2M', icon: 'stars' },
           { label: 'Tax Reserves', val: '₦890k', icon: 'account_balance' },
           { label: 'Cycle Status', val: '45% Done', icon: 'update' },
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

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
           <h3 className="font-black text-lg">Weekly Distribution Ledger</h3>
        </div>
        <table className="w-full text-left">
           <thead>
              <tr className="border-b border-slate-50 dark:border-gray-800">
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Fleet Courier</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Base Earnings</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Bonuses</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Net Payout</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">Action</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
              {payouts.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                       <div className="size-8 rounded-full bg-slate-100" style={{ backgroundImage: `url('https://picsum.photos/seed/${p.driver}/100/100')`, backgroundSize: 'cover' }}></div>
                       <p className="text-sm font-bold">{p.driver}</p>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-medium">{p.base}</td>
                  <td className="p-6 text-sm font-black text-green-600">+{p.bonus}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-black text-primary">{p.net}</span>
                       <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${p.status === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {p.status}
                       </span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View Breakdown</button>
                  </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
