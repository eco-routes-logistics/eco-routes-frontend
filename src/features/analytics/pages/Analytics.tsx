import React, { useEffect } from 'react';
import { useAnalyticsStore } from '@/stores/analyticsStore';

const Analytics: React.FC = () => {
   const {
      calculateMetrics,
      averageDeliveryTime,
      successRate,
      onTimeRate,
      volumeByTime,
      topRiders,
      topClients
   } = useAnalyticsStore();

   useEffect(() => {
      calculateMetrics();
   }, [calculateMetrics]);

   return (
      <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
         <header>
            <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white uppercase tracking-tighter">Business Intelligence</h1>
            <p className="text-[#616f89] dark:text-gray-400 text-sm mt-1">
               Performance metrics, delivery heatmaps, and growth insights.
            </p>
         </header>

         {/* Hero KPIs */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-6xl">timer</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Avg. Delivery Time</p>
               <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black">{averageDeliveryTime}</h3>
                  <span className="text-sm font-bold text-slate-500">min</span>
               </div>
               <p className="text-xs text-green-500 font-bold mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                  12% faster vs last week
               </p>
            </div>

            <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-6xl">check_circle</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Success Rate</p>
               <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black text-primary">{successRate}%</h3>
               </div>
               <div className="w-full bg-slate-100 dark:bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${successRate}%` }}></div>
               </div>
            </div>

            <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-6xl">schedule</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">On-Time Performance</p>
               <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black text-purple-600">{onTimeRate}%</h3>
               </div>
               <p className="text-xs text-slate-400 font-bold mt-2">Target: 95%</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Peak Hours Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 shadow-sm">
               <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500">bar_chart</span>
                  Order Volume by Hour (Peak Times)
               </h3>
               <div className="h-64 flex items-end gap-2">
                  {volumeByTime.map((item, index) => (
                     <div key={index} className="flex-1 flex flex-col items-center justify-end group h-full">
                        <div
                           className="w-full bg-orange-500/10 border-t border-orange-500/30 rounded-t-lg relative group-hover:bg-orange-500 transition-all duration-300"
                           style={{ height: `${(item.count / 10) * 100}%`, minHeight: '4px' }}
                        >
                           <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded font-bold transition-opacity">
                              {item.count}
                           </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold mt-2 -rotate-90 sm:rotate-0 origin-top-left sm:origin-center translate-y-2 sm:translate-y-0 block w-full text-center">
                           {item.hour}
                        </span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Top Riders */}
            <div className="bg-[#101622] text-white rounded-3xl p-8 shadow-xl">
               <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-yellow-400">workspace_premium</span>
                  Top Performers
               </h3>
               <div className="space-y-6">
                  {topRiders.map((rider, i) => (
                     <div key={rider.id} className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                           {i + 1}
                        </div>
                        <div className="flex-1">
                           <p className="font-bold text-sm">{rider.name}</p>
                           <p className="text-xs text-white/50">{rider.orders} Orders Completed</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded text-yellow-400 text-xs font-bold">
                           <span className="material-symbols-outlined text-[14px]">star</span>
                           {rider.rating}
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-3 bg-white/10 text-white rounded-xl font-bold text-xs hover:bg-white/20 transition-all">
                  View All Staff Performance
               </button>
            </div>
         </div>

         {/* Heatmap Placeholder (Visual) */}
         <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-black flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500">location_on</span>
                  Delivery Drop-off Heatmap
               </h3>
               <select className="text-xs font-bold border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 dark:bg-gray-800 dark:text-white dark:border-gray-700">
                  <option>Lagos Mainland</option>
                  <option>Lagos Island</option>
               </select>
            </div>

            <div className="aspect-video bg-slate-50 dark:bg-gray-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-100 dark:border-gray-800">
               <div className="text-center opacity-40">
                  <span className="material-symbols-outlined text-6xl mb-2 text-slate-300">map</span>
                  <p className="text-sm font-bold text-slate-400">Interactive Map Visualization</p>
                  <p className="text-xs text-slate-300 mt-1">Showing high density drop-off zones</p>
               </div>
               {/* Simulated Hotspots */}
               <div className="absolute top-1/3 left-1/4 size-24 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
               <div className="absolute bottom-1/3 right-1/3 size-32 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-75"></div>
               <div className="absolute top-1/2 right-1/4 size-16 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-150"></div>
            </div>
         </div>

      </div>
   );
};

export default Analytics;
