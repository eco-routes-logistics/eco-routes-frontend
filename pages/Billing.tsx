
import React from 'react';
import { Settlement } from '../types';

const Billing: React.FC = () => {
  const settlements: Settlement[] = [
    { id: '#TRX-882910', orderId: '#ORD-29381', client: 'Fresh Foods Ltd', dropper: 'Mike Johnson', totalFee: 2000, adminFee: 500, riderPayout: 1500, date: 'Oct 06, 2023', status: 'Pending' },
    { id: '#TRX-882911', orderId: '#ORD-29382', client: 'Tech Gadgets Inc.', dropper: 'Sarah Connor', totalFee: 4500, adminFee: 1125, riderPayout: 3375, date: 'Oct 05, 2023', status: 'Processed' },
    { id: '#TRX-882912', orderId: '#ORD-29383', client: 'City Pharmacy', dropper: 'David Adebayo', totalFee: 1200, adminFee: 300, riderPayout: 900, date: 'Oct 05, 2023', status: 'Processed' },
    { id: '#TRX-882913', orderId: '#ORD-29384', client: 'Mega Mall Outlet', dropper: 'Linda Okeke', totalFee: 5000, adminFee: 1250, riderPayout: 3750, date: 'Oct 04, 2023', status: 'Disputed' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Marketplace Settlement</h1>
          <p className="text-[#616f89] dark:text-gray-400 text-sm mt-1">Manage commissions and rider payouts for the current period.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-6 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:bg-primary-dark transition-all active:scale-95">
          <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
          Process Payouts
        </button>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white dark:bg-[#1a202c] rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div className="size-10 rounded-xl bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">stacked_line_chart</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
           </div>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Marketplace Volume</p>
           <h3 className="text-2xl font-black tracking-tight">₦ 4,500,000</h3>
        </div>

        <div className="p-6 bg-white dark:bg-[#1a202c] rounded-2xl border-l-4 border-primary border-t border-b border-r border-slate-200 dark:border-gray-800 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">domain</span>
              </div>
              <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded uppercase">25% Take Rate</span>
           </div>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Platform Commission</p>
           <h3 className="text-2xl font-black tracking-tight text-primary">₦ 1,125,000</h3>
        </div>

        <div className="p-6 bg-white dark:bg-[#1a202c] rounded-2xl border-l-4 border-teal-500 border-t border-b border-r border-slate-200 dark:border-gray-800 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div className="size-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                <span className="material-symbols-outlined">two_wheeler</span>
              </div>
              <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-1 rounded uppercase tracking-tighter">75% Distribution</span>
           </div>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Rider Payouts</p>
           <h3 className="text-2xl font-black tracking-tight text-teal-600">₦ 3,375,000</h3>
        </div>

        <div className="p-6 bg-[#101622] rounded-2xl shadow-xl flex flex-col justify-center gap-3">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Revenue Split</span>
              <span className="material-symbols-outlined text-slate-600 text-sm">info</span>
           </div>
           <div className="flex h-4 w-full rounded-full overflow-hidden shadow-inner bg-gray-800">
              <div className="bg-primary h-full" style={{ width: '25%' }}></div>
              <div className="bg-teal-500 h-full" style={{ width: '75%' }}></div>
           </div>
           <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
              <span className="text-primary flex items-center gap-1"><div className="size-1.5 rounded-full bg-primary"></div> Admin</span>
              <span className="text-teal-500 flex items-center gap-1"><div className="size-1.5 rounded-full bg-teal-500"></div> Rider</span>
           </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 justify-between items-center">
          <h3 className="text-lg font-bold">Transaction History</h3>
          <div className="flex gap-2">
             <input className="pl-4 pr-4 py-2 h-10 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-primary focus:border-primary" placeholder="Search TRX ID..." type="text" />
             <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-bold text-xs uppercase tracking-widest hover:bg-gray-50">
               <span className="material-symbols-outlined text-[18px]">download</span> Export
             </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#f9fafb] dark:bg-gray-800/50">
              <tr className="border-b border-[#dbdfe6] dark:border-gray-700">
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400">Status</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400">Reference</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400">Client</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400 text-right">Total</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-primary text-right bg-primary/5">Admin (25%)</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-teal-600 text-right bg-teal-50/30">Rider (75%)</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {settlements.map((trx, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       <span className={`size-1.5 rounded-full ${trx.status === 'Pending' ? 'bg-yellow-500' : trx.status === 'Processed' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                       <span className="text-xs font-bold">{trx.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-xs font-black text-primary uppercase">{trx.id}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{trx.orderId}</div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold">{trx.client}</p>
                    <p className="text-[10px] text-slate-400">Dropper: {trx.dropper}</p>
                  </td>
                  <td className="py-4 px-6 text-right font-black text-sm">₦ {trx.totalFee.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right font-black text-sm text-primary bg-primary/5">₦ {trx.adminFee.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right font-black text-sm text-teal-600 bg-teal-50/30">₦ {trx.riderPayout.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right text-[11px] text-slate-500 font-bold">{trx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
