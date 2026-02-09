
import React from 'react';
import { OrderStatus } from '../types';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Live Orders', value: '1,245', change: '+12%', icon: 'package_2', color: 'text-primary', trend: 'up' },
    { label: 'Active Drivers', value: '34/40', change: '+5 online', icon: 'local_shipping', color: 'text-blue-500', trend: 'up' },
    { label: 'Revenue (MTD)', value: '₦45,200', change: '+8%', icon: 'payments', color: 'text-purple-600', trend: 'up' },
  ];

  const recentOrders = [
    { id: '#ORD-2023-089', client: 'Acme Corp', sector: 'Retail', driver: 'John Doe', driverId: 'Truck #402', status: OrderStatus.IN_TRANSIT },
    { id: '#ORD-2023-092', client: 'Global Tech', sector: 'Electronics', driver: 'Unassigned', status: OrderStatus.PENDING },
    { id: '#ORD-2023-085', client: 'Fresh Foods Inc.', sector: 'Perishables', driver: 'Sarah Smith', driverId: 'Van #12', status: OrderStatus.DELIVERED },
    { id: '#ORD-2023-095', client: 'BuildCo', sector: 'Construction', driver: 'Unassigned', status: OrderStatus.PENDING },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">EcoRoute Command Center</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Lagos Logistics Hub • <span className="text-green-600 font-bold">System Online</span></p>
        </div>
        <div className="flex gap-2">
           <button className="h-10 px-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
             <span className="material-symbols-outlined text-sm">refresh</span> Sync Data
           </button>
           <button className="h-10 px-4 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
             <span className="material-symbols-outlined text-sm">rocket_launch</span> Batch Dispatch
           </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1a202c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#616f89] dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
                <h3 className="text-[#111318] dark:text-white text-3xl font-black">{stat.value}</h3>
              </div>
              <div className={`size-12 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${stat.trend === 'up' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700'}`}>{stat.change}</span>
              <span className="text-[#616f89] dark:text-gray-500 text-xs">Since 08:00 AM</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Map + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Live Ops Map Overlay */}
        <div className="lg:col-span-7 bg-[#101622] rounded-3xl border border-gray-800 p-1 overflow-hidden relative min-h-[400px] shadow-2xl">
          <div className="absolute top-6 left-6 z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
               <h4 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <span className="size-2 rounded-full bg-green-500 animate-ping"></span>
                 Live Fleet Activity
               </h4>
               <p className="text-white/40 text-[10px] mt-1">Monitoring 42 active vehicles</p>
            </div>
          </div>
          
          <div className="w-full h-full relative">
            <svg viewBox="0 0 800 500" className="w-full h-full opacity-40">
              <path d="M100 100 Q 400 50 700 100" stroke="#135bec" strokeWidth="2" fill="none" className="animate-pulse" />
              <path d="M150 350 Q 400 450 650 350" stroke="#10b981" strokeWidth="2" fill="none" className="opacity-50" />
              <circle cx="100" cy="100" r="4" fill="#135bec" />
              <circle cx="700" cy="100" r="4" fill="#135bec" />
              <circle cx="150" cy="350" r="4" fill="#10b981" />
              <circle cx="650" cy="350" r="4" fill="#10b981" />
              
              {/* Pulsating vehicles */}
              <circle cx="250" cy="75" r="3" fill="#fff" className="animate-bounce" />
              <circle cx="450" cy="425" r="3" fill="#fff" className="animate-ping" />
            </svg>
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
               <div className="flex gap-2">
                 {['Ikeja', 'Lekki', 'VI', 'Yaba'].map(loc => (
                   <span key={loc} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 text-[10px] font-bold">{loc}</span>
                 ))}
               </div>
               <button className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">Expand Tracking</button>
            </div>
          </div>
        </div>

        {/* Order Feed */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1a202c] rounded-3xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-white">Active Dispatch Queue</h2>
            <span className="material-symbols-outlined text-slate-400">more_horiz</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            {recentOrders.map((order, i) => (
              <div key={i} className="p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors flex items-center justify-between group">
                 <div className="flex items-center gap-4">
                    <div className={`size-10 rounded-xl flex items-center justify-center
                      ${order.status === OrderStatus.IN_TRANSIT ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20'}
                    `}>
                      <span className="material-symbols-outlined text-[20px]">{order.status === OrderStatus.IN_TRANSIT ? 'local_shipping' : 'pending_actions'}</span>
                    </div>
                    <div>
                       <p className="text-xs font-black text-slate-900 dark:text-white">{order.id}</p>
                       <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{order.client} • {order.driver}</p>
                    </div>
                 </div>
                 <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/20 text-center">
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View All Operations</button>
          </div>
        </div>
      </div>

      {/* Intelligence & Efficiency Section */}
      <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/20 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-9xl">auto_awesome</span>
          </div>
          <div className="flex-1 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest">
               <span className="material-symbols-outlined text-xs">bolt</span> AI Optimization Active
             </div>
             <h3 className="text-2xl font-black text-slate-900 dark:text-white">EcoRoute Efficiency Report</h3>
             <p className="text-sm text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed">
               Current routing batching has saved <span className="text-green-600 font-bold">142kg of carbon emissions</span> this week. Our system recommends prioritizing 4 motorcycle couriers for the VI-Lekki corridor to maintain 22min SLAs.
             </p>
             <div className="flex gap-4">
               <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-primary/20">Apply Smart Batching</button>
               <button className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-white px-6 py-2.5 rounded-xl font-bold text-xs">View Insights</button>
             </div>
          </div>
          <div className="flex gap-4">
             {[
               { val: '22min', label: 'Avg ETA', color: 'text-blue-600' },
               { val: '98.2%', label: 'Delivery Rate', color: 'text-green-600' },
             ].map((m, i) => (
               <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 text-center min-w-[120px]">
                  <p className={`text-xl font-black ${m.color}`}>{m.val}</p>
                  <p className="text-[10px] font-black uppercase text-slate-400 mt-1">{m.label}</p>
               </div>
             ))}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
