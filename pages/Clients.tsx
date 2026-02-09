
import React from 'react';

const Clients: React.FC = () => {
  const clients = [
    { name: 'Farmchops', industry: 'E-commerce', orders: 452, volume: '₦1.2M', growth: '+15%', status: 'Active' },
    { name: 'TechSource', industry: 'Electronics', orders: 120, volume: '₦400k', growth: '+2%', status: 'On Hold' },
    { name: 'City Pharmacy', industry: 'Healthcare', orders: 890, volume: '₦2.8M', growth: '+22%', status: 'Active' },
    { name: 'Global Retail', industry: 'FMCG', orders: 12, volume: '₦45k', growth: '-5%', status: 'At Risk' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Client Portfolio</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage business relationships and account health metrics.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Add Business Partner</button>
      </header>

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-gray-800/50 border-b border-slate-100 dark:border-gray-700">
              <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Client</th>
              <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Industry</th>
              <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Orders (MTD)</th>
              <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Net Volume</th>
              <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
            {clients.map((c, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">{c.name.charAt(0)}</div>
                    <span className="font-bold text-sm">{c.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-500">{c.industry}</td>
                <td className="py-4 px-6 font-bold text-sm">{c.orders}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm">{c.volume}</span>
                    <span className={`text-[10px] font-bold ${c.growth.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{c.growth}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${c.status === 'Active' ? 'bg-green-50 text-green-700' : c.status === 'On Hold' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
