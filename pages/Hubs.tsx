
import React from 'react';

const Hubs: React.FC = () => {
  const hubs = [
    { id: 'HB-01', name: 'Mainland Gateway', location: 'Ikeja, Lagos', capacity: '82%', dispatchers: 4, vehicles: 12, status: 'High Volume' },
    { id: 'HB-02', name: 'Island Hub', location: 'Victoria Island, Lagos', capacity: '45%', dispatchers: 2, vehicles: 8, status: 'Steady' },
    { id: 'HB-03', name: 'Lekki Distribution', location: 'Lekki Phase 1', capacity: '92%', dispatchers: 3, vehicles: 15, status: 'At Capacity' },
    { id: 'HB-04', name: 'Sub-Hub South', location: 'Surulere, Lagos', capacity: '15%', dispatchers: 1, vehicles: 3, status: 'Idle' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Warehouse Hubs</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage physical sorting nodes and localized dispatch teams.</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">Open New Hub</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hubs.map((h) => (
          <div key={h.id} className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">home_work</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{h.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{h.id} • {h.location}</p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border
                ${h.status === 'Steady' ? 'bg-green-50 text-green-700 border-green-100' : 
                  h.status === 'At Capacity' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'}
              `}>{h.status}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-50 dark:border-gray-800">
               <div className="text-center">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Crew</p>
                 <p className="text-lg font-black">{h.dispatchers}</p>
               </div>
               <div className="text-center border-x border-slate-100 dark:border-gray-800">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Fleet</p>
                 <p className="text-lg font-black">{h.vehicles}</p>
               </div>
               <div className="text-center">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Utilization</p>
                 <p className="text-lg font-black">{h.capacity}</p>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="flex-1 h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000
                    ${parseInt(h.capacity) > 90 ? 'bg-red-500' : parseInt(h.capacity) > 70 ? 'bg-amber-500' : 'bg-green-500'}
                  `} style={{ width: h.capacity }}></div>
               </div>
               <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline shrink-0">Hub Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hubs;
