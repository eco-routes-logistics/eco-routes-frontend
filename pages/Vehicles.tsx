
import React from 'react';

const Vehicles: React.FC = () => {
  const vehicles = [
    { id: 'VH-102', model: 'Honda CB125', type: 'Motorcycle', status: 'In Service', fuel: '85%', health: 'Good', driver: 'John Doe' },
    { id: 'VH-405', model: 'Toyota Hiace', type: 'Van', status: 'Maintenance', fuel: '20%', health: 'Needs Oil Change', driver: 'Sarah Connor' },
    { id: 'VH-882', model: 'Suzuki Gixxer', type: 'Motorcycle', status: 'Available', fuel: '100%', health: 'Excellent', driver: 'None' },
    { id: 'VH-119', model: 'Electric Bicycle', type: 'Bicycle', status: 'In Service', fuel: '45%', health: 'Good', driver: 'Mike Ross' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Fleet Assets</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Monitor vehicle health, maintenance schedules, and fuel logs.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2">
           <span className="material-symbols-outlined">add_circle</span> Register Vehicle
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white dark:bg-[#1a202c] rounded-2xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  {v.type === 'Motorcycle' ? 'motorcycle' : v.type === 'Van' ? 'airport_shuttle' : 'pedal_bike'}
                </span>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${v.status === 'In Service' ? 'bg-green-50 text-green-700' : v.status === 'Maintenance' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                {v.status}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">{v.id}</h3>
            <p className="text-xs text-slate-500 font-bold mb-4">{v.model}</p>
            
            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-gray-800">
               <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Health</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-gray-300">{v.health}</span>
               </div>
               <div className="w-full h-1.5 bg-slate-100 dark:bg-gray-700 rounded-full">
                  <div className={`h-full rounded-full ${v.health === 'Excellent' ? 'bg-green-500 w-full' : v.health === 'Good' ? 'bg-green-400 w-[80%]' : 'bg-red-500 w-[40%]'}`}></div>
               </div>
               <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Driver</span>
                  <span className="text-xs font-bold text-primary">{v.driver}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
