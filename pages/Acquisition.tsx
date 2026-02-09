
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const Acquisition: React.FC = () => {
  const [designPrompt, setDesignPrompt] = useState('');
  const [generatedLivery, setGeneratedLivery] = useState<string | null>(null);
  const [isDesigning, setIsDesigning] = useState(false);

  const generateLivery = async () => {
    if (!designPrompt || isDesigning) return;
    setIsDesigning(true);
    try {
      // @ts-ignore
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `A photorealistic logistics vehicle wrap design. Subject: ${designPrompt}. The vehicle should be a modern delivery van or motorcycle, featuring EcoRoute branding colors (blue and white) in a clean, professional, high-fidelity aesthetic. Photographed in a studio.` }] },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedLivery(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDesigning(false);
    }
  };

  const orders = [
    { id: 'PO-9201', vendor: 'Honda West Africa', asset: '12x CB125 Motorcycles', status: 'In Transit', value: '₦8.2M' },
    { id: 'PO-8832', vendor: 'Toyota Elizade', asset: '2x Hiace Vans', status: 'Processing', value: '₦42M' },
    { id: 'PO-1192', vendor: 'GIG Motors', asset: '4x Electric Bikes', status: 'Delivered', value: '₦4.5M' },
  ];

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto font-display">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Fleet Procurement</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage asset acquisition, leasing contracts, and vendor relationships.</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
           Request Asset
        </button>
      </header>

      {/* AI Design Lab Section */}
      <section className="bg-white dark:bg-[#1a202c] rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm flex flex-col lg:flex-row">
        <div className="p-10 flex-1 flex flex-col gap-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest w-fit">
             <span className="material-symbols-outlined text-sm animate-pulse">auto_awesome</span>
             Generative Livery Designer
           </div>
           <h2 className="text-2xl font-black">Visualize Your Fleet</h2>
           <p className="text-sm text-slate-500 max-w-md leading-relaxed">
             Describe the branding for your next fleet acquisition. Our AI will generate a photorealistic mockup of the vehicle wrap.
           </p>
           
           <div className="space-y-4">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Visual Concept</label>
                 <textarea 
                    value={designPrompt}
                    onChange={(e) => setDesignPrompt(e.target.value)}
                    placeholder="e.g. Electric van with sleek geometric patterns in cyan and navy..."
                    className="w-full h-32 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
                 />
              </div>
              <button 
                onClick={generateLivery}
                disabled={isDesigning || !designPrompt}
                className="w-full h-14 bg-[#111318] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
              >
                {isDesigning ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">refresh</span>
                    Generating Concept...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">palette</span>
                    Generate Livery Mockup
                  </>
                )}
              </button>
           </div>
        </div>

        <div className="lg:w-1/2 bg-slate-50 dark:bg-white/5 p-6 flex items-center justify-center relative">
           {generatedLivery ? (
             <div className="w-full h-full animate-in zoom-in duration-500">
                <img src={generatedLivery} alt="Generated Livery" className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800" />
                <button 
                   onClick={() => setGeneratedLivery(null)}
                   className="absolute top-10 right-10 size-10 bg-black/40 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                   <span className="material-symbols-outlined">close</span>
                </button>
             </div>
           ) : (
             <div className="text-center p-12 space-y-4 opacity-30">
                <span className="material-symbols-outlined text-8xl">local_shipping</span>
                <p className="text-xs font-black uppercase tracking-[0.2em]">Ready for Simulation</p>
             </div>
           )}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col justify-between h-56">
            <div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Fleet Expansion (Q4)</p>
               <h3 className="text-4xl font-black">24 / 40</h3>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-bold">
                  <span>Progress to Goal</span>
                  <span className="text-primary">60%</span>
               </div>
               <div className="w-full h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '60%' }}></div>
               </div>
            </div>
         </div>

         <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col justify-between h-56">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Lease Liabilities</p>
                  <h3 className="text-2xl font-black">₦ 12.4M</h3>
               </div>
               <span className="material-symbols-outlined text-primary text-3xl">contract</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Next payment due in <span className="text-red-500 font-bold">4 days</span> for 12 motorcycles.</p>
         </div>

         <div className="bg-[#101622] rounded-3xl p-8 text-white flex flex-col justify-center gap-4">
            <h4 className="font-black uppercase tracking-widest text-[10px] text-white/40">Market Trend</h4>
            <p className="text-xl font-bold leading-tight">Prices for Electric 2-wheelers are down <span className="text-green-400">12%</span> this month. Strategic time for acquisition.</p>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest text-left hover:underline">View Market Intel</button>
         </div>
      </div>

      <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
         <div className="p-6 border-b border-slate-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
            <h3 className="font-black text-lg">Open Purchase Orders</h3>
         </div>
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-slate-50 dark:border-gray-800">
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">PO ID</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Vendor</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Asset Category</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Value</th>
                  <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
               {orders.map((o, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                     <td className="p-6 font-bold text-sm text-primary">{o.id}</td>
                     <td className="p-6 text-sm font-medium">{o.vendor}</td>
                     <td className="p-6 text-sm">{o.asset}</td>
                     <td className="p-6 font-black text-sm">{o.value}</td>
                     <td className="p-6 text-right">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${o.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                           {o.status}
                        </span>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default Acquisition;
