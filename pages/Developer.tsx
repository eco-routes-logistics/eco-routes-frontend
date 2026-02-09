
import React from 'react';

const Developer: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Developer Hub</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage API integrations, webhooks, and third-party logistics plugins.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Generate API Key</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
           <section className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                 <h3 className="font-black text-lg">Active API Credentials</h3>
              </div>
              <div className="p-6 space-y-4">
                 {[
                   { name: 'Shopify Store (Live)', key: 'ec_live_****************92', usage: 'High' },
                   { name: 'Mobile App Testing', key: 'ec_test_****************a4', usage: 'Moderate' },
                 ].map((k, i) => (
                   <div key={i} className="p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold">{k.name}</p>
                        <p className="text-xs font-mono text-slate-400 mt-1">{k.key}</p>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                   </div>
                 ))}
              </div>
           </section>

           <section className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm p-8 space-y-6">
              <h3 className="font-black text-lg">Quick Integration</h3>
              <div className="bg-[#0b101a] rounded-2xl p-6 font-mono text-xs text-cyan-400 overflow-x-auto shadow-inner">
<pre>{`curl -X POST https://api.ecoroute.com/v1/dispatch \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "pickup": "Lagos Hub 01",
    "delivery": "12 Admiralty Way",
    "priority": "express"
  }'`}</pre>
              </div>
           </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-primary/20">
              <span className="material-symbols-outlined text-4xl mb-4">webhook</span>
              <h4 className="text-xl font-black mb-2">Webhooks</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6">Receive real-time notifications on delivery completion, driver assignment, and route delays directly to your server.</p>
              <button className="w-full py-3 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors">Configure Endpoints</button>
           </div>
           
           <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm p-6 space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">System Health</h4>
              <div className="flex items-center gap-3">
                 <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                 <span className="text-xs font-bold uppercase tracking-tight">API V1: Operational</span>
              </div>
              <div className="flex items-center gap-3">
                 <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                 <span className="text-xs font-bold uppercase tracking-tight">MQTT Broker: Connected</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
