
import React from 'react';

const Training: React.FC = () => {
  const courses = [
    { title: 'Defensive City Driving', duration: '2h 15m', level: 'Required', progress: 100, icon: 'shield' },
    { title: 'Eco-Handling 101', duration: '45m', level: 'Optional', progress: 45, icon: 'eco' },
    { title: 'App & Dispatcher Logic', duration: '1h 30m', level: 'Required', progress: 12, icon: 'smartphone' },
    { title: 'Conflict De-escalation', duration: '3h', level: 'Senior', progress: 0, icon: 'forum' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">EcoRoute Academy</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Specialized certification and safety training for the modern fleet.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Add Course</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((c, i) => (
          <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col gap-6 group hover:border-primary transition-all">
            <div className="flex justify-between items-start">
               <div className="size-12 rounded-2xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-2xl">{c.icon}</span>
               </div>
               <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${c.level === 'Required' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                  {c.level}
               </span>
            </div>
            <div>
               <h3 className="text-lg font-black leading-tight mb-2">{c.title}</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.duration}</p>
            </div>
            <div className="space-y-2 mt-auto">
               <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Progress</span>
                  <span className="text-primary">{c.progress}%</span>
               </div>
               <div className="w-full h-1.5 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${c.progress}%` }}></div>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#101622] rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-10">
         <div className="size-24 rounded-full border-8 border-primary/20 flex items-center justify-center relative">
            <span className="material-symbols-outlined text-5xl text-primary">verified</span>
            <div className="absolute inset-0 border-8 border-primary rounded-full border-t-transparent animate-spin"></div>
         </div>
         <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tight">Enterprise Safety Badge</h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-xl">
               Drivers who complete the <span className="text-white font-bold">Lagos Metropolis Safety Circuit</span> receive a priority badge on the marketplace, increasing order volume by an average of 18%.
            </p>
         </div>
         <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-100">Invite Fleet</button>
      </div>
    </div>
  );
};

export default Training;
