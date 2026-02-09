
import React from 'react';

const AuditLogs: React.FC = () => {
  const logs = [
    { time: '14:22:01', user: 'Alex M.', action: 'Dispatched Order #ORD-4921', ip: '192.168.1.45', category: 'Ops' },
    { time: '13:45:12', user: 'System', action: 'Auto-assigned Driver DR-8832', ip: 'internal', category: 'System' },
    { time: '12:10:05', user: 'Sarah C.', action: 'Updated Client Contract: Acme Corp', ip: '192.168.1.12', category: 'Security' },
    { time: '09:30:55', user: 'Alex M.', action: 'Bulk Payout Processed (₦3.2M)', ip: '192.168.1.45', category: 'Finance' },
    { time: 'Yesterday', user: 'Admin', action: 'Modified System Settings (Dark Mode Default)', ip: '10.0.0.1', category: 'Settings' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto h-full overflow-hidden">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">System Audit Trail</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Immutable security log of all dispatcher and system actions.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-6 py-2.5 rounded-xl font-bold text-xs">Filter by Date</button>
           <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-primary/20">Export Log (CSV)</button>
        </div>
      </header>

      <div className="flex-1 bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-slate-50 dark:bg-gray-800/80 backdrop-blur-md z-10 border-b border-slate-100 dark:border-gray-700">
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <th className="p-6">Timestamp</th>
                <th className="p-6">User Identity</th>
                <th className="p-6">Action Performed</th>
                <th className="p-6">Access IP</th>
                <th className="p-6 text-right">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                  <td className="p-6 text-xs font-mono text-slate-400">{log.time}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-[10px]">{log.user.charAt(0)}</div>
                      <span className="text-sm font-bold">{log.user}</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-medium">{log.action}</td>
                  <td className="p-6 text-xs font-mono text-slate-400">{log.ip}</td>
                  <td className="p-6 text-right">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border 
                      ${log.category === 'Ops' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                        log.category === 'Security' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-gray-50 text-gray-700 border-gray-100'}
                    `}>{log.category}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 text-center">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying last 200 events</p>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
