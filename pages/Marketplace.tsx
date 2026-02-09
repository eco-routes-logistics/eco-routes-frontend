
import React from 'react';

const Marketplace: React.FC = () => {
  const applicants = [
    { name: 'Olatunji B.', type: 'Bicycle', rating: 'N/A', status: 'In Review', date: '2h ago', score: 88 },
    { name: 'Chinedu O.', type: 'Motorcycle', rating: '4.8', status: 'Background Check', date: '5h ago', score: 95 },
    { name: 'Fatima S.', type: 'Van', rating: 'N/A', status: 'Interviewing', date: '1d ago', score: 92 },
    { name: 'Ibrahim K.', type: 'Motorcycle', rating: '4.5', status: 'Approved', date: '2d ago', score: 84 },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Recruitment Hub</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Vet and onboard high-performing couriers for the EcoRoute network.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">Post Opening</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Applicants', val: '142', icon: 'group' },
          { label: 'Avg Trust Score', val: '91%', icon: 'verified_user' },
          { label: 'Hiring Target', val: '12/20', icon: 'target' },
          { label: 'Pending Checks', val: '45', icon: 'security' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
             <div className="size-10 rounded-xl bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-primary mb-4">
               <span className="material-symbols-outlined">{stat.icon}</span>
             </div>
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
             <h3 className="text-2xl font-black">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-50 dark:border-gray-800 flex justify-between items-center">
           <h3 className="font-black text-lg">Active Applications</h3>
           <div className="flex gap-2">
              {['Active', 'Archived'].map(t => (
                <button key={t} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${t === 'Active' ? 'bg-primary text-white' : 'text-slate-400'}`}>{t}</button>
              ))}
           </div>
        </div>
        <table className="w-full text-left">
           <thead>
              <tr className="bg-slate-50 dark:bg-gray-800/50 border-b border-slate-100 dark:border-gray-700">
                 <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400">Applicant</th>
                 <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400">Asset Type</th>
                 <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400">Trust Score</th>
                 <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400">Pipeline Stage</th>
                 <th className="py-4 px-6 text-[10px] font-black uppercase text-slate-400 text-right">Action</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
              {applicants.map((a, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                  <td className="py-4 px-6">
                     <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-100" style={{ backgroundImage: `url('https://picsum.photos/seed/${a.name}/100/100')`, backgroundSize: 'cover' }}></div>
                        <div>
                           <p className="text-sm font-bold">{a.name}</p>
                           <p className="text-[10px] text-slate-400">{a.date}</p>
                        </div>
                     </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium">{a.type}</td>
                  <td className="py-4 px-6">
                     <div className="flex items-center gap-2">
                        <span className={`font-black text-sm ${a.score > 90 ? 'text-green-600' : 'text-primary'}`}>{a.score}</span>
                        <div className="w-12 h-1 bg-slate-100 dark:bg-gray-800 rounded-full">
                           <div className="h-full bg-primary rounded-full" style={{ width: `${a.score}%` }}></div>
                        </div>
                     </div>
                  </td>
                  <td className="py-4 px-6">
                     <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${a.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                        {a.status}
                     </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                     <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Review Dossier</button>
                  </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marketplace;
