
import React from 'react';

const Incidents: React.FC = () => {
  const incidents = [
    { id: 'INC-921', vehicle: 'VH-102', type: 'Minor Accident', status: 'In Response', urgency: 'Critical', time: '12m ago' },
    { id: 'INC-882', vehicle: 'VH-405', type: 'Vehicle Breakdown', status: 'Pending Tow', urgency: 'Medium', time: '2h ago' },
    { id: 'INC-110', vehicle: 'VH-882', type: 'Theft Report', status: 'Police Notified', urgency: 'Critical', time: '4h ago' },
    { id: 'INC-332', vehicle: 'VH-119', type: 'Late Pick-up Appeal', status: 'Resolved', urgency: 'Low', time: 'Yesterday' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Incident Command</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Real-time emergency management and safety response desk.</p>
        </div>
        <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 flex items-center gap-2">
           <span className="material-symbols-outlined">emergency</span> SOS Broadcast
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: 'Open Critical', val: '2', color: 'bg-red-100 text-red-600' },
           { label: 'Resolved (MTD)', val: '142', color: 'bg-green-100 text-green-600' },
           { label: 'Avg Response', val: '4.2m', color: 'bg-blue-100 text-blue-600' },
           { label: 'Field Safety', val: '98.2%', color: 'bg-primary/10 text-primary' },
         ].map((s, i) => (
           <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
              <h3 className={`text-2xl font-black ${s.color.split(' ')[1]}`}>{s.val}</h3>
           </div>
         ))}
      </div>

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex justify-between items-center">
           <h3 className="font-black text-lg">Active Field Incidents</h3>
           <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-slate-100 dark:bg-gray-800 rounded-full text-[10px] font-black uppercase">Filter: All</button>
           </div>
        </div>
        <table className="w-full text-left">
           <thead>
              <tr className="border-b border-slate-50 dark:border-gray-800">
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">ID & Time</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Vehicle</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Incident Type</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Status</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">Action</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
              {incidents.map((inc, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                  <td className="p-6">
                    <p className="text-sm font-black text-primary">{inc.id}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{inc.time}</p>
                  </td>
                  <td className="p-6 font-bold text-sm">{inc.vehicle}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <span className={`size-2 rounded-full ${inc.urgency === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></span>
                       <span className="text-sm font-medium">{inc.type}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${inc.status === 'Resolved' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                       {inc.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Launch Command</button>
                  </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incidents;
