
import React from 'react';

const Feedback: React.FC = () => {
  const reviews = [
    { customer: 'Alice Wong', rating: 5, sentiment: 'Positive', text: 'Amazing speed! The driver was very professional.', date: '1h ago' },
    { customer: 'John Doe', rating: 3, sentiment: 'Neutral', text: 'Package arrived on time but the box was slightly crushed.', date: '4h ago' },
    { customer: 'Tunde Elias', rating: 5, sentiment: 'Positive', text: 'Best logistics app in Lagos by far.', date: '1d ago' },
    { customer: 'Sarah Miller', rating: 1, sentiment: 'Negative', text: 'Driver was rude and took a long detour.', date: '2d ago' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Customer Voice</h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Aggregated sentiment analysis and detailed service feedback.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
           <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Overall Hub Rating</h4>
           <div className="text-6xl font-black text-slate-900 dark:text-white mb-2">4.8</div>
           <div className="flex text-yellow-400 mb-4">
              {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined fill-1 text-2xl">star</span>)}
           </div>
           <p className="text-xs text-slate-500">Based on 12,402 verified reviews</p>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
           <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Sentiment Breakdown</h4>
           <div className="space-y-6">
              {[
                { label: 'Positive', val: 82, color: 'bg-green-500' },
                { label: 'Neutral', val: 12, color: 'bg-slate-400' },
                { label: 'Negative', val: 6, color: 'bg-red-500' },
              ].map(s => (
                <div key={s.label} className="space-y-2">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                      <span>{s.label}</span>
                      <span>{s.val}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color}`} style={{ width: `${s.val}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {reviews.map((r, i) => (
           <div key={i} className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary">{r.customer.charAt(0)}</div>
                    <div>
                       <p className="text-sm font-black">{r.customer}</p>
                       <p className="text-[10px] text-slate-400">{r.date}</p>
                    </div>
                 </div>
                 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${r.sentiment === 'Positive' ? 'bg-green-50 text-green-700' : r.sentiment === 'Negative' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'}`}>
                    {r.sentiment}
                 </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed italic">"{r.text}"</p>
              <div className="flex text-yellow-400 scale-75 origin-left">
                 {Array.from({ length: 5 }).map((_, i) => (
                   <span key={i} className={`material-symbols-outlined text-lg ${i < r.rating ? 'fill-1' : ''}`}>star</span>
                 ))}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Feedback;
