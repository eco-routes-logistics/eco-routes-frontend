
import React from 'react';

const Support: React.FC = () => {
  const tickets = [
    { id: 'TKT-9201', subject: 'Payment Dispute', user: 'Mike Johnson (Driver)', priority: 'High', status: 'Open' },
    { id: 'TKT-8832', subject: 'App Crash Report', user: 'Sarah Connor (Driver)', priority: 'Medium', status: 'In Progress' },
    { id: 'TKT-1192', subject: 'Damaged Item Claim', user: 'Alice W. (Customer)', priority: 'Critical', status: 'Pending' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto h-full overflow-hidden">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Support Command</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Handle disputes and assist fleet members in real-time.</p>
        </div>
        <div className="flex gap-2">
           <button className="h-10 px-6 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-xs font-black uppercase tracking-widest">Knowledge Base</button>
           <button className="h-10 px-6 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">New Ticket</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0 overflow-hidden">
        {/* Tickets List */}
        <div className="w-full lg:w-96 flex flex-col gap-4 overflow-y-auto">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Tickets ({tickets.length})</h3>
          {tickets.map((t) => (
            <div key={t.id} className="bg-white dark:bg-[#1a202c] p-5 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm cursor-pointer hover:border-primary transition-all group">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-primary uppercase">{t.id}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${t.priority === 'Critical' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{t.priority}</span>
               </div>
               <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{t.subject}</h4>
               <p className="text-[11px] text-slate-500">{t.user}</p>
            </div>
          ))}
        </div>

        {/* Selected Ticket View (Placeholder) */}
        <div className="flex-1 bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col overflow-hidden">
           <div className="p-6 border-b border-slate-50 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-800/30 flex justify-between items-center">
              <div>
                <h3 className="font-black text-lg">Ticket Detail</h3>
                <p className="text-[11px] text-slate-500 uppercase font-bold">Select a ticket from the left to begin resolution.</p>
              </div>
              <div className="flex gap-2">
                 <button className="p-2 rounded-xl border border-slate-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"><span className="material-symbols-outlined text-lg">archive</span></button>
                 <button className="p-2 rounded-xl border border-slate-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"><span className="material-symbols-outlined text-lg">delete</span></button>
              </div>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-40">
              <span className="material-symbols-outlined text-8xl mb-4">forum</span>
              <h3 className="text-xl font-bold">Conversation Hub</h3>
              <p className="text-sm max-w-xs mt-2">All driver and customer communication is end-to-end encrypted and logged for quality assurance.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
