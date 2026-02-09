
import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">System Configuration</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Global hub settings and identity management.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 px-6 py-2.5 rounded-xl font-bold text-sm text-slate-700 dark:text-white">Discard</button>
          <button className="bg-primary text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Apply Changes</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          
          <section className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
               <h3 className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-whatsapp">chat</span>
                  Logistics Communication
               </h3>
               <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-green-50 text-green-700">Automation Active</span>
            </div>
            <div className="p-8 space-y-8">
               <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <p className="text-sm font-bold mb-1">WhatsApp OTP Protocol</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Secure verification code sent to receivers upon dispatch. Reduces failed delivery attempts by 32%.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-whatsapp"></div>
                  </label>
               </div>

               <div className="flex flex-col gap-3 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-700">
                  <div className="flex justify-between">
                     <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Template</span>
                  </div>
                  <textarea 
                    className="w-full h-24 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-3 text-sm font-medium focus:ring-primary focus:border-primary"
                    defaultValue="Hi {{CustomerName}}, your order {{OrderID}} is on its way with {{DriverName}}. Use PIN {{OTP}} to verify your delivery."
                  />
               </div>
            </div>
          </section>

          <section className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-gray-800 p-8 space-y-8">
             <h3 className="font-bold">Appearance & Theme</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-bold">System Mode</p>
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-slate-100 dark:border-gray-700">
                     <button 
                        onClick={() => isDarkMode && toggleDarkMode()}
                        className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all
                          ${!isDarkMode ? 'bg-white shadow-md text-primary' : 'text-slate-400'}
                        `}
                     >
                       <span className="material-symbols-outlined text-sm">light_mode</span> Day
                     </button>
                     <button 
                        onClick={() => !isDarkMode && toggleDarkMode()}
                        className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all
                          ${isDarkMode ? 'bg-slate-700 shadow-md text-white' : 'text-slate-400'}
                        `}
                     >
                       <span className="material-symbols-outlined text-sm">dark_mode</span> Midnight
                     </button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-bold">Accent Profile</p>
                  <div className="flex gap-4">
                     {['#135bec', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                       <button key={c} className="size-8 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" style={{ backgroundColor: c }}></button>
                     ))}
                  </div>
                </div>
             </div>
          </section>

        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="sticky top-6 flex flex-col gap-6">
             <div className="bg-primary rounded-3xl p-8 text-white shadow-2xl shadow-primary/30">
                <span className="material-symbols-outlined text-4xl mb-4">cloud_sync</span>
                <h4 className="text-xl font-black mb-2 leading-tight tracking-tight">Enterprise Cloud Sync</h4>
                <p className="text-xs text-white/70 leading-relaxed font-medium">Your hub configuration is synchronized across 12 nodes globally for high-availability logistics dispatching.</p>
             </div>

             <div className="bg-[#101622] rounded-[2.5rem] border-[10px] border-slate-900 h-[480px] w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#e5ddd5] dark:bg-[#0b141a]">
                  <div className="bg-[#005c4b] dark:bg-[#1f2c34] h-12 flex items-center px-4 gap-3">
                    <div className="size-7 rounded-full bg-white text-[10px] font-black text-primary flex items-center justify-center">ER</div>
                    <span className="text-white text-[11px] font-bold">EcoRoute HQ</span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-white dark:bg-[#202c33] p-3 rounded-2xl rounded-tl-none shadow-sm text-[10px] max-w-[80%] border-l-4 border-primary">
                      Order #ORD-3492 successfully dispatched. Client notified with PIN 7492.
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full"></div>
             </div>
             <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Automation Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
