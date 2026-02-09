
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const routes = [
    { to: '/', label: 'Dashboard', icon: 'grid_view', desc: 'Main operations overview' },
    { to: '/dispatch-center', label: 'Live Dispatch', icon: 'distance', desc: 'Real-time fleet monitoring' },
    { to: '/live-voice-ops', label: 'Voice AI Ops', icon: 'mic', desc: 'Hands-free voice assistant' },
    { to: '/orders', label: 'Order Queue', icon: 'package_2', desc: 'Manage pending shipments' },
    { to: '/drivers', label: 'Fleet Crew', icon: 'person_search', desc: 'Driver profiles and tracking' },
    { to: '/vehicles', label: 'Asset Management', icon: 'local_shipping', desc: 'Maintenance and status' },
    { to: '/analytics', label: 'BI Analytics', icon: 'insights', desc: 'Deep data insights' },
    { to: '/finance', label: 'Profit & Loss', icon: 'account_balance', desc: 'Regional financial health' },
    { to: '/clients', label: 'Client CRM', icon: 'business_center', desc: 'Corporate relationships' },
    { to: '/hubs', label: 'Hub Network', icon: 'home_work', desc: 'Warehouse and sort centers' },
    { to: '/settings', label: 'Configuration', icon: 'settings', desc: 'Global system settings' },
    { to: '/marketplace', label: 'Recruitment', icon: 'group_add', desc: 'Onboard new couriers' },
    { to: '/sustainability', label: 'Eco Tracking', icon: 'eco', desc: 'Carbon offset metrics' },
  ];

  const filteredRoutes = routes.filter(r => 
    r.label.toLowerCase().includes(query.toLowerCase()) || 
    r.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 selection:bg-primary">
      <div className="absolute inset-0 bg-[#050b1a]/80 backdrop-blur-md" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a2230] rounded-[2.5rem] shadow-[0_0_80px_rgba(19,91,236,0.2)] border border-gray-200 dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search commands or navigate modules..."
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-slate-400 dark:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5">
             <span className="text-[10px] font-black uppercase text-slate-400">ESC</span>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
          {filteredRoutes.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-bold uppercase tracking-widest">No matching commands found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1">
              {filteredRoutes.map((r) => (
                <button
                  key={r.to}
                  onClick={() => {
                    navigate(r.to);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/10 group transition-all text-left"
                >
                  <div className="size-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined">{r.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{r.label}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{r.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-all">chevron_right</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tip: Use arrows to navigate, Enter to select</p>
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                 <span className="text-[9px] font-black text-slate-400 uppercase">Jump to hub</span>
                 <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-[9px] font-bold shadow-sm">G</kbd>
                 <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-[9px] font-bold shadow-sm">H</kbd>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
