
import React from 'react';
import { Driver } from '../types';

const Drivers: React.FC = () => {
  const drivers: Driver[] = [
    { id: 'DR-4021', name: 'Sarah Jenkins', avatar: 'Sarah', status: 'Available', rating: 4.9, activeOrders: 0 },
    { id: 'DR-8832', name: 'Michael Chen', avatar: 'Michael', status: 'On Delivery', rating: 4.7, activeOrders: 3 },
    { id: 'DR-1129', name: 'David Ross', avatar: 'David', status: 'Offline', rating: 4.5, activeOrders: 0 },
    { id: 'DR-5541', name: 'Emily Watson', avatar: 'Emily', status: 'On Delivery', rating: 5.0, activeOrders: 2 },
    { id: 'DR-2291', name: 'James Carter', avatar: 'James', status: 'Available', rating: 4.2, activeOrders: 0 },
  ];

  const verificationQueue = [
    { name: 'Alex Rodriguez', email: 'alex.r@example.com', time: '2h ago', idPreview: 'id1' },
    { name: 'Sarah Miller', email: 'sarah.m@example.com', time: '4h ago', idPreview: 'id2' },
    { name: 'David Chen', email: 'd.chen88@example.com', time: '5h ago', idPreview: 'id3' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Fleet Management</h1>
          <p className="text-slate-500 dark:text-gray-400 text-base font-normal mt-1">Manage fleet availability, performance, and live tracking.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all">
          <span className="material-symbols-outlined text-xl">person_add</span>
          Add New Driver
        </button>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Driver Fleet */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drivers.map((driver) => (
              <div key={driver.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-gray-800 p-5 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-14 rounded-full bg-slate-100 overflow-hidden border-2 border-primary/10 shadow-sm" style={{ backgroundImage: `url('https://picsum.photos/seed/${driver.name}/150/150')`, backgroundSize: 'cover' }}></div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-bold text-base">{driver.name}</h3>
                      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{driver.id}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border
                    ${driver.status === 'Available' ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400' : ''}
                    ${driver.status === 'On Delivery' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400' : ''}
                    ${driver.status === 'Offline' ? 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-800 dark:text-gray-400' : ''}
                  `}>
                    <span className={`size-1.5 rounded-full ${driver.status === 'Available' ? 'bg-green-500' : driver.status === 'On Delivery' ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                    {driver.status}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-y border-slate-50 dark:border-gray-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Performance</span>
                    <div className="flex items-center gap-1 text-slate-900 dark:text-white font-black text-sm">
                      <span className="material-symbols-outlined text-yellow-400 text-lg fill-1">star</span>
                      {driver.rating}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-slate-100 dark:bg-gray-800"></div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Active Tasks</span>
                    <span className="text-slate-900 dark:text-white font-black text-sm">{driver.activeOrders}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-xl border-2 border-primary/20 text-primary hover:bg-primary/5 dark:hover:bg-primary/20 font-black text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">near_me</span>
                    Locate
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 font-black text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">person</span>
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Verification Queue & Map Preview */}
        <div className="flex flex-col gap-8">
          <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#dbdfe6] dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold">Verification Queue</h3>
              <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-2 py-1 rounded-full">3 Waiting</span>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {verificationQueue.map((app, i) => (
                <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-100" style={{ backgroundImage: `url('https://picsum.photos/seed/${app.name}/100/100')`, backgroundSize: 'cover' }}></div>
                    <div>
                      <p className="text-sm font-bold">{app.name}</p>
                      <p className="text-[11px] text-slate-400">{app.time} • {app.email}</p>
                    </div>
                  </div>
                  <button className="size-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 text-center">
              <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">View All Applications</button>
            </div>
          </div>

          {/* Map Preview Card */}
          <div className="bg-[#101622] rounded-2xl border border-gray-800 p-6 flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#135bec_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 flex flex-col items-center text-center gap-4">
               <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-2xl shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-4xl">map</span>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Live Fleet Map</h3>
                 <p className="text-sm text-slate-400 mb-6">Monitor real-time positions and route efficiency metrics.</p>
               </div>
               <button className="w-full py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                  Open Interactive Map
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Drivers;
