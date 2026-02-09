
import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Business Intelligence</h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Deep dive into fleet performance and market growth metrics.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 h-[350px] relative">
              <h3 className="font-bold mb-8">Delivery Success Rate Trend</h3>
              <div className="absolute inset-0 flex items-end px-12 pb-12 gap-4">
                 {[40, 60, 45, 90, 85, 95, 100].map((h, i) => (
                   <div key={i} className="flex-1 bg-primary rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }}></div>
                 ))}
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-6 rounded-3xl">
                 <p className="text-green-600 text-[10px] font-black uppercase tracking-widest mb-2">Fleet Growth</p>
                 <h4 className="text-3xl font-black text-green-800 dark:text-green-400">+22%</h4>
                 <p className="text-xs text-green-600/60 mt-1">Net new drivers this month</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 p-6 rounded-3xl">
                 <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2">Fulfillment Speed</p>
                 <h4 className="text-3xl font-black text-blue-800 dark:text-blue-400">-12min</h4>
                 <p className="text-xs text-blue-600/60 mt-1">Reduction in avg fulfillment</p>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#101622] rounded-3xl p-8 text-white shadow-xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black mb-2 tracking-tight">Market Expansion</h3>
                <p className="text-white/40 text-xs">Recommended new hubs based on order density heatmaps.</p>
              </div>
              <div className="space-y-4">
                 {['Lekki Phase 2', 'Surulere', 'Ikorodu'].map(hub => (
                   <div key={hub} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-sm font-bold">{hub}</span>
                      <span className="text-[10px] font-black text-primary uppercase bg-primary/20 px-2 py-1 rounded">High Priority</span>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30">Generate Full Report</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
