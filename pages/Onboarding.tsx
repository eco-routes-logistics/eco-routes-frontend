
import React, { useState } from 'react';
// @ts-ignore - Fixing "no exported member" errors which occur in some TypeScript environments with react-router-dom
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: 'Personal Profile', icon: 'person' },
    { id: 2, label: 'Identity Verification', icon: 'verified_user' },
    { id: 3, label: 'Vehicle Registration', icon: 'local_shipping' },
    { id: 4, label: 'Payout Settings', icon: 'account_balance' },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      {/* Onboarding Sidebar */}
      <aside className="w-full lg:w-80 bg-white dark:bg-[#1e293b] border-r border-slate-200 dark:border-gray-800 p-8 flex flex-col shrink-0 overflow-y-auto">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1 pb-6 border-b border-slate-100 dark:border-gray-700">
             <h2 className="text-xl font-black tracking-tight">EcoRoute Onboarding</h2>
             <div className="flex items-center justify-between mt-1">
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {step} of 4</span>
               <span className="text-xs font-black text-primary">{(step/4)*100}% Complete</span>
             </div>
             <div className="h-1.5 w-full bg-slate-100 dark:bg-gray-700 rounded-full mt-3">
               <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(step/4)*100}%` }}></div>
             </div>
          </div>

          <nav className="flex flex-col gap-4">
            {steps.map((s) => (
              <div key={s.id} className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300
                ${step === s.id ? 'bg-primary/10 border-l-4 border-primary text-primary font-bold' : 
                  step > s.id ? 'text-green-600' : 'text-slate-400 opacity-60'}
              `}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: step > s.id ? "'FILL' 1" : "" }}>
                  {step > s.id ? 'check_circle' : s.icon}
                </span>
                <span className="text-sm">{s.label}</span>
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
               <span className="material-symbols-outlined text-primary mb-3">security</span>
               <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Verified Community</h4>
               <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">To maintain trust, we verify all documents and perform automated liveness checks during registration.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Form Content Area */}
      <main className="flex-1 bg-background-light dark:bg-background-dark p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <div className="rounded-3xl overflow-hidden relative h-40 bg-primary group shadow-2xl shadow-primary/20">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse"></div>
             <div className="relative z-10 h-full flex flex-col justify-center p-8 text-white">
                <h2 className="text-3xl font-black tracking-tight mb-2">Final Step: Get Paid</h2>
                <p className="text-white/80 font-medium">Complete your payout settings to start receiving earnings weekly.</p>
             </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-gray-800 p-8 lg:p-10 shadow-sm flex flex-col gap-10">
             <div className="flex justify-between items-start">
               <div>
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white">Payout Settings</h2>
                 <p className="text-slate-500 mt-1">Enter your bank details to receive your 75% earnings share.</p>
               </div>
               <div className="size-12 rounded-2xl bg-blue-50 dark:bg-gray-800 flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined text-3xl">account_balance</span>
               </div>
             </div>

             <div className="bg-primary/5 rounded-2xl p-6 flex items-start gap-4 border border-primary/10">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <div>
                   <p className="text-sm font-bold text-primary mb-1">Weekly Automatic Payouts</p>
                   <p className="text-xs text-slate-600 dark:text-gray-400">Funds are typically settled every Tuesday. Ensure account holder name matches your verified ID.</p>
                </div>
             </div>

             <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-6">
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Select Bank</label>
                      <select className="h-14 rounded-2xl border-2 border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 font-bold text-slate-800 dark:text-white focus:border-primary focus:ring-0 transition-all">
                        <option>EcoBank LTD</option>
                        <option>United Bank for Logistics</option>
                        <option>First Global Fleet Bank</option>
                      </select>
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Account Number</label>
                      <input className="h-14 rounded-2xl border-2 border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 font-bold text-slate-800 dark:text-white focus:border-primary focus:ring-0 transition-all" type="text" placeholder="e.g. 1234567890" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Account Holder Name</label>
                      <input className="h-14 rounded-2xl border-2 border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 font-bold text-slate-800 dark:text-white focus:border-primary focus:ring-0 transition-all" type="text" placeholder="As it appears on ID" />
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button onClick={() => setStep(prev => Math.max(1, prev - 1))} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Go Back</button>
                  <button onClick={() => { if(step < 4) setStep(s => s+1); else navigate('/'); }} className="w-full sm:w-auto bg-primary text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                    {step === 4 ? 'Complete Activation' : 'Next Step'}
                    <span className="material-symbols-outlined font-bold text-sm">arrow_forward</span>
                  </button>
                </div>
             </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
