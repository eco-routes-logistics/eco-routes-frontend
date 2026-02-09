
import React from 'react';
// @ts-ignore
import { useParams, Link } from 'react-router-dom';

const Tracking: React.FC = () => {
  const { id } = useParams();

  const steps = [
    { label: 'Ordered', time: '10:24 AM', completed: true },
    { label: 'Processing at Hub', time: '12:45 PM', completed: true },
    { label: 'Out for Delivery', time: '02:15 PM', completed: true, active: true },
    { label: 'Delivered', time: 'Pending', completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#0b101a] font-display selection:bg-primary">
      {/* Mini Nav */}
      <nav className="h-16 px-6 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#0b101a]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
          </div>
          <span className="text-sm font-black uppercase tracking-tighter dark:text-white">EcoRoute Tracking</span>
        </div>
        <Link to="/landing" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Support Hub</Link>
      </nav>

      <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
        {/* Tracking Header */}
        <div className="bg-white dark:bg-[#1a2230] p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5">
          <p className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest mb-1">Live Shipment ID</p>
          <h1 className="text-3xl font-black tracking-tight dark:text-white">{id || 'ORD-3492'}</h1>
          <div className="flex items-center gap-2 mt-4">
             <span className="px-3 py-1 bg-blue-50 dark:bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">In Transit</span>
             <span className="text-[11px] text-slate-500 font-medium tracking-tight">ETA: 22 mins • VI, Lagos</span>
          </div>
        </div>

        {/* Live Status */}
        <div className="bg-white dark:bg-[#1a2230] rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
           {/* Simple Map Placeholder */}
           <div className="h-48 bg-slate-200 dark:bg-gray-800 relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://picsum.photos/seed/trackmap/800/400')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                 <div className="size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                 </div>
              </div>
           </div>

           <div className="p-8 space-y-8">
              <div className="space-y-6">
                 {steps.map((step, i) => (
                    <div key={i} className="flex gap-4 relative">
                       {i < steps.length - 1 && (
                          <div className={`absolute left-[7px] top-4 w-0.5 h-10 ${step.completed ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}`}></div>
                       )}
                       <div className={`size-4 rounded-full mt-1 shrink-0 z-10 border-2 border-white dark:border-[#1a2230]
                          ${step.active ? 'bg-primary ring-4 ring-primary/20' : step.completed ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'}
                       `}></div>
                       <div className="flex-1 pb-4">
                          <div className="flex justify-between items-start">
                             <h4 className={`text-sm font-bold ${step.completed ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step.label}</h4>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{step.time}</span>
                          </div>
                          {step.active && <p className="text-[11px] text-primary font-bold mt-1">Driver is currently 1.2km from your location.</p>}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Courier Contact */}
        <div className="bg-primary p-6 rounded-[2rem] text-white flex items-center justify-between shadow-2xl shadow-primary/30">
           <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-white/20 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/driver-sarah/100/100')" }}></div>
              <div>
                 <p className="text-[9px] font-black uppercase text-white/50 tracking-widest">Your Courier</p>
                 <p className="text-base font-black">Sarah Jenkins</p>
              </div>
           </div>
           <div className="flex gap-2">
              <button className="size-11 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                 <span className="material-symbols-outlined">call</span>
              </button>
              <button className="size-11 bg-whatsapp text-white rounded-xl flex items-center justify-center transition-transform hover:scale-105">
                 <span className="material-symbols-outlined fill-1">chat</span>
              </button>
           </div>
        </div>

        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] mt-4">Powered by EcoRoute AI Logistics</p>
      </div>
    </div>
  );
};

export default Tracking;
