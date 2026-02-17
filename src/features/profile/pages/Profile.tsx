
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">My Identity</h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage your dispatcher credentials and system access.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left: Identity Card */}
        <div className="md:col-span-5 space-y-6">
           <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 shadow-sm flex flex-col items-center text-center gap-4">
              <div className="size-32 rounded-full border-4 border-primary/20 p-1">
                 <div className="size-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/alex/300/300')" }}></div>
              </div>
              <div>
                <h3 className="text-2xl font-black">Alex Morgan</h3>
                <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">Senior Dispatcher • Level 4</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mt-4">
                 <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-2xl border border-slate-100 dark:border-gray-700">
                    <p className="text-[9px] font-black uppercase text-slate-400">Hub</p>
                    <p className="text-sm font-bold">Mainland</p>
                 </div>
                 <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-2xl border border-slate-100 dark:border-gray-700">
                    <p className="text-[9px] font-black uppercase text-slate-400">Shift</p>
                    <p className="text-sm font-bold">Day</p>
                 </div>
              </div>
           </div>

           <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-primary/20">
              <h4 className="text-lg font-black mb-2">System Security</h4>
              <p className="text-xs text-white/70 mb-6 font-medium">Your account is secured with Enterprise 2FA and Biometric Auth.</p>
              <button className="w-full py-3 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors">Rotate Auth Keys</button>
           </div>
        </div>

        {/* Right: Personal Settings */}
        <div className="md:col-span-7 space-y-8">
           <section className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 space-y-6">
              <h3 className="font-black text-lg">Personal Details</h3>
              <div className="grid grid-cols-1 gap-4">
                 <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                    <input className="h-12 bg-slate-50 dark:bg-gray-800 border-none rounded-xl px-4 text-sm font-bold" type="email" value="alex.morgan@ecoroute.com" readOnly />
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Mobile Contact</label>
                    <input className="h-12 bg-slate-50 dark:bg-gray-800 border-none rounded-xl px-4 text-sm font-bold" type="tel" defaultValue="+234 800 123 4567" />
                 </div>
              </div>
           </section>

           <section className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 space-y-6">
              <h3 className="font-black text-lg">Notifications</h3>
              <div className="space-y-4">
                 {[
                   { label: 'High Priority Orders', desc: 'Alert when VIP client places order' },
                   { label: 'Driver Delay Alerts', desc: 'Notify when courier is 15min off ETA' },
                   { label: 'System Health', desc: 'Connectivity status of local hub nodes' }
                 ].map((n, i) => (
                   <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 dark:border-gray-800 last:border-none">
                      <div className="flex-1">
                        <p className="text-sm font-bold">{n.label}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{n.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={i === 0} />
                        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
