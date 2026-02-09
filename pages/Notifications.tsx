
import React from 'react';

const Notifications: React.FC = () => {
  const items = [
    { title: 'Critical Low Fleet', desc: 'Ikeja hub reports only 2 riders for 45 pending orders.', time: '10m ago', unread: true, type: 'alert' },
    { title: 'Contract Renewal', desc: 'Acme Corp contract expires in 12 days. Renew now.', time: '2h ago', unread: true, type: 'info' },
    { title: 'System Maintenance', desc: 'Server cluster 4 will undergo scheduled maintenance at 02:00 AM.', time: '5h ago', unread: false, type: 'system' },
    { title: 'Payout Success', desc: 'Weekly rider payout process completed for 34 drivers.', time: '1d ago', unread: false, type: 'success' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-5xl mx-auto h-full overflow-hidden">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Notifications</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Stay updated with real-time operations and system alerts.</p>
        </div>
        <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline">Mark all as read</button>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4">
        {items.map((item, i) => (
          <div key={i} className={`p-6 rounded-3xl border transition-all cursor-pointer flex gap-6
            ${item.unread 
              ? 'bg-white dark:bg-[#1a202c] border-primary/20 shadow-md ring-1 ring-primary/10' 
              : 'bg-slate-50/50 dark:bg-gray-800/20 border-slate-100 dark:border-gray-800 opacity-80'}
          `}>
             <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0
               ${item.type === 'alert' ? 'bg-red-100 text-red-600' : 
                 item.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}
             `}>
                <span className="material-symbols-outlined">{item.type === 'alert' ? 'warning' : item.type === 'success' ? 'check_circle' : 'notifications'}</span>
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                   <h3 className={`font-black ${item.unread ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{item.title}</h3>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">{item.time}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
             </div>
             {item.unread && <div className="size-2.5 bg-primary rounded-full mt-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
