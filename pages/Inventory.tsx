
import React from 'react';

const Inventory: React.FC = () => {
  const categories = [
    { name: 'Cold Chain', items: 124, status: 'Normal', color: 'bg-blue-50 text-blue-600', icon: 'ac_unit' },
    { name: 'Fragile Goods', items: 56, status: 'Limited', color: 'bg-amber-50 text-amber-600', icon: 'category' },
    { name: 'FMCG / Dry', items: 890, status: 'Surplus', color: 'bg-green-50 text-green-600', icon: 'local_grocery_store' },
    { name: 'Heavy Cargo', items: 12, status: 'Restricted', color: 'bg-red-50 text-red-600', icon: 'conveyor_belt' },
  ];

  const stocks = [
    { hub: 'Mainland Hub', packaging: 'Boxes (L)', qty: '1,200', health: '85%' },
    { hub: 'Mainland Hub', packaging: 'Bubble Wrap', qty: '45 rolls', health: '20%' },
    { hub: 'Island Hub', packaging: 'Boxes (M)', qty: '400', health: '55%' },
    { hub: 'Lekki Hub', packaging: 'Eco-Envelopes', qty: '3,000', health: '98%' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Package Inventory</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage storage categories and hub-level supplies.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105">
          Restock Supplies
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white dark:bg-[#1a202c] rounded-3xl p-6 border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className={`size-12 rounded-2xl flex items-center justify-center ${cat.color}`}>
                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400">{cat.status}</span>
            </div>
            <div>
              <h3 className="text-lg font-black">{cat.name}</h3>
              <p className="text-2xl font-black text-primary mt-1">{cat.items}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Shipments</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <h3 className="font-black text-lg">Hub Consumables Stock</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 dark:border-gray-800">
                <th className="p-6">Hub Location</th>
                <th className="p-6">Supplies Item</th>
                <th className="p-6">Current Quantity</th>
                <th className="p-6">Stock Level</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
              {stocks.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="p-6 font-bold text-sm">{s.hub}</td>
                  <td className="p-6 text-sm">{s.packaging}</td>
                  <td className="p-6 font-black text-sm">{s.qty}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${parseInt(s.health) < 30 ? 'bg-red-500' : 'bg-primary'}`} style={{ width: s.health }}></div>
                      </div>
                      <span className="text-[10px] font-black">{s.health}</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-primary text-[10px] font-black uppercase tracking-widest">Order More</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
