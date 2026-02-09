
import React from 'react';

const Team: React.FC = () => {
  const staff = [
    { name: 'Michael Chen', role: 'Head of Ops', access: 'Owner', status: 'Online', hub: 'Lagos' },
    { name: 'Elena Korova', role: 'Senior Dispatcher', access: 'Admin', status: 'Away', hub: 'Abuja' },
    { name: 'Sarah Miller', role: 'Finance Manager', access: 'Billing Only', status: 'Online', hub: 'Lagos' },
    { name: 'David Ross', role: 'Fleet Technician', access: 'Assets Only', status: 'Offline', hub: 'Ikeja' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Team & Governance</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage administrative access, organizational roles, and user permissions.</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105">
           Invite Staff
        </button>
      </header>

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
         <div className="p-6 border-b border-slate-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
            <h3 className="font-black text-lg">Active System Users</h3>
         </div>
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-slate-50 dark:border-gray-800">
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">User Profile</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Role & Hub</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Access Tier</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Activity</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
               {staff.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                     <td className="p-6">
                        <div className="flex items-center gap-3">
                           <div className="size-10 rounded-xl bg-slate-100 dark:bg-gray-800 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${s.name}/100/100')` }}></div>
                           <p className="text-sm font-bold">{s.name}</p>
                        </div>
                     </td>
                     <td className="p-6">
                        <p className="text-sm font-medium">{s.role}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{s.hub} Hub</p>
                     </td>
                     <td className="p-6">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${s.access === 'Owner' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-gray-800'}`}>
                           {s.access}
                        </span>
                     </td>
                     <td className="p-6">
                        <div className="flex items-center gap-2">
                           <span className={`size-1.5 rounded-full ${s.status === 'Online' ? 'bg-green-500' : s.status === 'Away' ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                           <span className="text-xs font-medium">{s.status}</span>
                        </div>
                     </td>
                     <td className="p-6 text-right">
                        <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Edit Policy</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2 bg-primary rounded-3xl p-10 text-white flex items-center gap-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-10">
               <span className="material-symbols-outlined text-[200px]">security</span>
            </div>
            <div className="flex-1 space-y-4 relative z-10">
               <h2 className="text-3xl font-black uppercase tracking-tight">Security Hardening</h2>
               <p className="text-white/70 max-w-xl text-sm leading-relaxed">
                  Enterprise-grade 2FA is currently <span className="text-white font-bold">Enabled</span> for all users. System will force a password rotation for all "Admin" tier users in 12 days.
               </p>
               <button className="bg-white text-primary px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors">Manage Global Policy</button>
            </div>
         </div>
         <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <h4 className="font-black text-sm uppercase tracking-widest text-slate-400">Total Seats</h4>
            <div className="text-4xl font-black">12 / 25</div>
            <div className="w-full h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: '48%' }}></div>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Upgrade to Pro to unlock unlimited administrative seats.</p>
         </div>
      </div>
    </div>
  );
};

export default Team;
