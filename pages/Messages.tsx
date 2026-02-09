
import React, { useState } from 'react';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [selectedThread, setSelectedThread] = useState(0);

  const threads = [
    { name: 'Sarah Jenkins (VH-102)', preview: 'Pickup at hub confirmed, moving to VI.', time: '2m ago', unread: true },
    { name: 'Michael Chen (DR-8832)', preview: 'Traffic at Lekki Toll Gate is heavy.', time: '15m ago', unread: false },
    { name: 'Farmchops Admin', preview: 'Daily report uploaded to the portal.', time: '1h ago', unread: false },
    { name: 'Customer Support Bot', preview: 'New ticket #9281 assigned to you.', time: '3h ago', unread: true },
  ];

  return (
    <div className="h-screen w-full bg-white dark:bg-[#101622] flex flex-col overflow-hidden text-[#111318] dark:text-white font-display">
      <header className="h-16 border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-[#1a202c] flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="size-9 bg-slate-100 dark:bg-gray-800 rounded-xl flex items-center justify-center transition-all">
             <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
          <h1 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
            Communications Hub
            <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] rounded-full font-black">12 NEW</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
           <button className="bg-primary text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">Broadcast Alert</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Threads */}
        <aside className="w-80 border-r border-slate-200 dark:border-gray-800 flex flex-col shrink-0 bg-slate-50/50 dark:bg-[#101622]">
           <div className="p-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input className="w-full h-10 pl-10 pr-4 bg-white dark:bg-gray-800 border-none rounded-xl text-xs focus:ring-primary shadow-sm" placeholder="Search chats..." />
              </div>
           </div>
           <div className="flex-1 overflow-y-auto">
              {threads.map((t, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedThread(i)}
                  className={`p-5 flex gap-4 cursor-pointer border-b border-slate-100 dark:border-gray-800/50 transition-colors
                    ${selectedThread === i ? 'bg-white dark:bg-gray-800 shadow-sm ring-1 ring-primary/10' : 'hover:bg-white/50 dark:hover:bg-gray-800/50'}
                  `}
                >
                   <div className="size-11 rounded-full bg-slate-200 shrink-0 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${t.name}/100/100')` }}></div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                         <h4 className="text-xs font-black truncate">{t.name}</h4>
                         <span className="text-[9px] font-bold text-slate-400 uppercase">{t.time}</span>
                      </div>
                      <p className={`text-[11px] truncate ${t.unread ? 'font-black text-slate-900 dark:text-white' : 'text-slate-500'}`}>{t.preview}</p>
                   </div>
                   {t.unread && <div className="size-2 bg-primary rounded-full self-center"></div>}
                </div>
              ))}
           </div>
        </aside>

        {/* Center: Active Chat */}
        <main className="flex-1 flex flex-col bg-white dark:bg-[#101622] relative">
           <div className="p-6 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${threads[selectedThread].name}/100/100')` }}></div>
                 <div>
                    <h3 className="font-black text-sm">{threads[selectedThread].name}</h3>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="size-1.5 bg-green-500 rounded-full"></span> Online
                    </p>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">call</span></button>
                 <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">videocam</span></button>
                 <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 dark:bg-transparent">
              <div className="flex justify-center">
                 <span className="px-3 py-1 bg-slate-100 dark:bg-gray-800 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">Today</span>
              </div>
              
              <div className="flex justify-start gap-4 max-w-[70%]">
                 <div className="size-8 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url('https://picsum.photos/seed/${threads[selectedThread].name}/100/100')` }}></div>
                 <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none border border-slate-100 dark:border-gray-700 shadow-sm text-sm leading-relaxed">
                    Hello Dispatch, I've arrived at the Ikeja hub. The gate security is asking for the hub entry permit ID for VH-102. Can you send it over?
                 </div>
              </div>

              <div className="flex justify-end gap-4 max-w-[70%] ml-auto">
                 <div className="p-4 bg-primary text-white rounded-2xl rounded-tr-none shadow-xl shadow-primary/10 text-sm leading-relaxed">
                    Understood Sarah. Checking the compliance vault now... Here is the ID: <span className="font-mono font-black"> HUB-NG-9281-LGS </span>. Let me know if you face further issues.
                 </div>
              </div>
           </div>

           <div className="p-6 border-t border-slate-100 dark:border-gray-800 bg-white dark:bg-[#1a202c]">
              <div className="flex items-center gap-4">
                 <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">attach_file</span></button>
                 <input className="flex-1 h-12 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl px-6 text-sm font-medium focus:ring-primary" placeholder="Type message..." />
                 <button className="size-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined">send</span>
                 </button>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
