
import React from 'react';

const Compliance: React.FC = () => {
  const documents = [
    { title: 'Fleet Insurance (Group)', entity: 'EcoRoute Hub', status: 'Active', expiry: 'Oct 2024', health: 85 },
    { title: 'Vehicle Permit (Motorcycles)', entity: 'Lagos State Govt', status: 'Expiring Soon', expiry: 'Nov 2023', health: 15 },
    { title: 'Driver License Vault', entity: '34 Couriers', status: 'Audit Required', expiry: 'Ongoing', health: 45 },
    { title: 'Hazardous Goods Permit', entity: 'Safety Board', status: 'Revoked', expiry: 'N/A', health: 0 },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Compliance Vault</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Track regulatory permits, insurance coverage, and driver certifications.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2">
           <span className="material-symbols-outlined">upload_file</span> Upload Document
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {documents.map((doc, i) => (
           <div key={i} className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col gap-6 group hover:border-primary transition-all">
              <div className="flex justify-between items-start">
                 <div className="size-14 rounded-2xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">policy</span>
                 </div>
                 <div className="text-right">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${doc.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                       {doc.status}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 mt-2">Expires: {doc.expiry}</p>
                 </div>
              </div>

              <div>
                 <h3 className="text-xl font-black mb-1">{doc.title}</h3>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{doc.entity}</p>
              </div>

              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    <span>Audit Status</span>
                    <span className={doc.health < 20 ? 'text-red-500' : 'text-primary'}>{doc.health}% Health</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${doc.health < 20 ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${doc.health}%` }}></div>
                 </div>
              </div>

              <div className="pt-4 border-t border-slate-50 dark:border-gray-800 flex justify-between items-center">
                 <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View Document</button>
                 <button className="text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">delete</span>
                 </button>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-[#101622] rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl">
         <div className="size-20 rounded-2xl bg-white/10 flex items-center justify-center text-red-500 animate-pulse">
            <span className="material-symbols-outlined text-5xl">gavel</span>
         </div>
         <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-black">Lagos Logistics Levy Alert</h2>
            <p className="text-sm text-white/50 leading-relaxed">
               New state regulations require all motorcycles under EcoRoute to possess the <span className="text-white font-bold">2024 Road Worthiness Badge</span> by November 1st. 12 vehicles in your fleet are currently non-compliant.
            </p>
         </div>
         <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Resolve Compliance</button>
      </div>
    </div>
  );
};

export default Compliance;
