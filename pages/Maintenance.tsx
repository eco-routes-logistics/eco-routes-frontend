
import React from 'react';

const Maintenance: React.FC = () => {
  const tasks = [
    { vehicle: 'VH-102', model: 'Honda CB125', task: 'Oil Change & Filter', due: 'Overdue (3d)', tech: 'S. Bello', priority: 'High' },
    { vehicle: 'VH-405', model: 'Toyota Hiace', task: 'Brake Pad Replacement', due: 'In 2 days', tech: 'Unassigned', priority: 'Medium' },
    { vehicle: 'VH-882', model: 'Suzuki Gixxer', task: 'Tire Rotation', due: 'Completed', tech: 'K. James', priority: 'Low' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Maintenance Hub</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Lifecycle management and preventative service for fleet assets.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2">
           <span className="material-symbols-outlined">schedule</span> Schedule Service
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Repairs', val: '4', color: 'text-red-500', icon: 'engineering' },
          { label: 'Service Health', val: '92%', color: 'text-green-500', icon: 'favorite' },
          { label: 'Fleet Downtime', val: '2.4h', color: 'text-blue-500', icon: 'timer_off' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex items-center gap-6">
            <div className={`size-12 rounded-2xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center ${s.color}`}>
              <span className="material-symbols-outlined text-2xl">{s.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{s.label}</p>
              <h3 className="text-2xl font-black">{s.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
           <h3 className="font-black text-lg">Upcoming Service Queue</h3>
           <span className="text-xs font-bold text-slate-400">Next 14 Days</span>
        </div>
        <table className="w-full text-left">
           <thead>
              <tr className="border-b border-slate-50 dark:border-gray-800">
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Vehicle</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Service Required</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Scheduled Date</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400">Technician</th>
                 <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">Action</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
              {tasks.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                  <td className="p-6">
                    <p className="text-sm font-bold">{t.vehicle}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{t.model}</p>
                  </td>
                  <td className="p-6 text-sm font-medium">{t.task}</td>
                  <td className="p-6">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${t.due.includes('Overdue') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      {t.due}
                    </span>
                  </td>
                  <td className="p-6 text-sm">{t.tech}</td>
                  <td className="p-6 text-right">
                    <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Maintenance;
