
import React from 'react';

const HelpCenter: React.FC = () => {
  const categories = [
    { title: 'Dispatching 101', count: 12, icon: 'bolt' },
    { title: 'Courier Disputes', count: 8, icon: 'forum' },
    { title: 'System Troubleshooting', count: 24, icon: 'settings_suggest' },
    { title: 'Finance & Payouts', count: 6, icon: 'payments' },
    { title: 'Legal & Compliance', count: 10, icon: 'gavel' },
    { title: 'Safety Protocol', count: 5, icon: 'security' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-6xl mx-auto h-full overflow-hidden">
      <header className="flex flex-col items-center text-center gap-6 py-10 bg-primary rounded-[3rem] text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
        <div className="relative z-10 space-y-2">
           <h1 className="text-4xl font-black tracking-tighter uppercase">Dispatcher Help Desk</h1>
           <p className="text-white/70 max-w-md mx-auto text-sm font-medium leading-relaxed">Search for standard operating procedures (SOPs), system guides, and conflict resolution protocols.</p>
        </div>
        <div className="w-full max-w-xl px-6 relative z-10">
           <span className="material-symbols-outlined absolute left-10 top-1/2 -translate-y-1/2 text-slate-400">search</span>
           <input className="w-full h-14 pl-14 pr-6 bg-white rounded-2xl text-slate-900 border-none shadow-xl focus:ring-4 focus:ring-white/20 font-medium" placeholder="Search knowledge base..." />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-10">
         {categories.map((cat, i) => (
           <div key={i} className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col gap-6 group hover:border-primary hover:shadow-xl transition-all cursor-pointer">
              <div className="size-14 rounded-2xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                 <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
              </div>
              <div>
                 <h3 className="text-xl font-black mb-1">{cat.title}</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat.count} ARTICLES</p>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-50 dark:border-gray-800 flex justify-between items-center">
                 <span className="text-primary text-[10px] font-black uppercase tracking-widest">Browse Category</span>
                 <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default HelpCenter;
