
import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto h-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">System Console</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Global platform health, master database controls, and emergency protocols.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 flex items-center gap-2">
              <span className="material-symbols-outlined">emergency_home</span> Platform Lockdown
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Heartbeat Monitor */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="font-black text-lg">System Heartbeat</h3>
              <div className="flex items-center gap-2 text-[10px] font-black text-green-500 animate-pulse">
                 <span className="size-2 bg-green-500 rounded-full"></span> NOMINAL PERFORMANCE
              </div>
           </div>
           
           <div className="h-48 flex items-end gap-1 px-2 relative">
              <div className="absolute inset-0 flex flex-col justify-between opacity-5">
                 {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-slate-900"></div>)}
              </div>
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                   key={i} 
                   className="flex-1 bg-primary/20 rounded-t-sm" 
                   style={{ height: `${Math.random() * 40 + 60}%` }}
                ></div>
              ))}
           </div>
           
           <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-50 dark:border-gray-800">
              <div>
                 <p className="text-[10px] font-black uppercase text-slate-400">API Latency</p>
                 <p className="text-xl font-black">24ms</p>
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-slate-400">Request Rate</p>
                 <p className="text-xl font-black">1.2k / s</p>
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-slate-400">Error Rate</p>
                 <p className="text-xl font-black text-green-500">0.002%</p>
              </div>
           </div>
        </div>

        {/* Global Controls */}
        <div className="space-y-6">
           <div className="bg-[#101622] rounded-3xl p-8 text-white shadow-2xl space-y-8">
              <h4 className="font-black text-xl">Global Toggles</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Maintenance Mode', desc: 'Restrict public access', active: false },
                   { label: 'AI Auto-Dispatch', desc: 'Enable Gemini routing engine', active: true },
                   { label: 'SMS Notification', desc: 'Global carrier switch', active: true },
                 ].map((t, i) => (
                    <div key={i} className="flex justify-between items-start">
                       <div>
                          <p className="text-sm font-bold">{t.label}</p>
                          <p className="text-[10px] text-white/40">{t.desc}</p>
                       </div>
                       <div className={`w-10 h-5 rounded-full relative p-0.5 cursor-pointer ${t.active ? 'bg-primary' : 'bg-gray-800'}`}>
                          <div className={`size-4 bg-white rounded-full transition-all ${t.active ? 'ml-5' : 'ml-0'}`}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl">
              <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-2">Cloud Infrastructure</p>
              <div className="flex items-center gap-4">
                 <span className="material-symbols-outlined text-4xl text-primary">cloud_done</span>
                 <div>
                    <p className="text-sm font-bold">Region: AF-SOUTH-1</p>
                    <p className="text-[10px] text-slate-500">12 Distributed Nodes Online</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
