import React, { useEffect } from 'react';
import { useFinanceStore } from '@/stores/financeStore';
import { useOrderStore } from '@/stores/orderStore';
import { useSettingsStore } from '@/stores/settingsStore';

const Finance: React.FC = () => {
   const { generateTransactions, getRevenueStats } = useFinanceStore();
   const { orders } = useOrderStore(); // To trigger updates
   const { system } = useSettingsStore();

   const currencySymbol = system.currency === 'NGN' ? '₦' : '£';

   useEffect(() => {
      generateTransactions();
   }, [orders, generateTransactions]);

   const stats = getRevenueStats('monthly');

   return (
      <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
         <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
               <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">Financial Overview</h1>
               <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
                  Revenue tracking for Standard (Fleet) and Premium (Gig) models.
               </p>
            </div>
            <div className="flex gap-2">
               <button className="bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 px-6 py-2.5 rounded-xl font-bold text-sm">Download Report</button>
            </div>
         </header>

         {/* KPI Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-4xl">payments</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Revenue</p>
               <h3 className="text-2xl font-black mb-1">{currencySymbol}{stats.totalRevenue.toLocaleString()}</h3>
               <span className="text-[10px] text-slate-400">Gross Delivery Volume</span>
            </div>

            <div className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-4xl text-blue-500">local_shipping</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Standard Fleet</p>
               <h3 className="text-2xl font-black mb-1 text-blue-600">{currencySymbol}{stats.standardRevenue.toLocaleString()}</h3>
               <span className="text-[10px] text-slate-400">100% Owned Revenue</span>
            </div>

            <div className="bg-white dark:bg-[#1a202c] p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-4xl text-purple-500">two_wheeler</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Premium Platform</p>
               <h3 className="text-2xl font-black mb-1 text-purple-600">{currencySymbol}{stats.platformEarnings.toLocaleString()}</h3>
               <span className="text-[10px] text-slate-400">25% Commission on {currencySymbol}{stats.premiumRevenue.toLocaleString()}</span>
            </div>

            <div className="bg-[#101622] p-6 rounded-3xl border border-slate-900 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                  <span className="material-symbols-outlined text-4xl text-green-400">trending_up</span>
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Net Profit (Est.)</p>
               <h3 className="text-2xl font-black mb-1 text-green-400">{currencySymbol}{stats.netProfit.toLocaleString()}</h3>
               <span className="text-[10px] text-slate-400">After Expenses & Payouts</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Standard Model Breakdown */}
            <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-lg flex items-center gap-2">
                     <span className="material-symbols-outlined text-blue-600">local_shipping</span>
                     Standard Model (Fleet)
                  </h3>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded uppercase">Company Owned</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-gray-100 dark:border-gray-800 pb-2">
                     <span className="text-sm font-bold text-slate-500">Gross Revenue</span>
                     <span className="text-lg font-black">{currencySymbol}{stats.standardRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 dark:border-gray-800 pb-2">
                     <span className="text-sm font-bold text-red-400">Est. OpEx (Fuel/Maint.)</span>
                     <span className="text-lg font-black text-red-400">- {currencySymbol}{stats.operationalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                     <span className="text-sm font-bold text-green-600">Net Profit</span>
                     <span className="text-xl font-black text-green-600">
                        {currencySymbol}{(stats.standardRevenue - stats.operationalExpenses).toLocaleString()}
                     </span>
                  </div>
               </div>
            </div>

            {/* Premium Model Breakdown */}
            <div className="bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 p-8">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-lg flex items-center gap-2">
                     <span className="material-symbols-outlined text-purple-600">two_wheeler</span>
                     Premium Model (Marketplace)
                  </h3>
                  <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-1 rounded uppercase">Gig Economy</span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-gray-100 dark:border-gray-800 pb-2">
                     <span className="text-sm font-bold text-slate-500">Gross Booking Value</span>
                     <span className="text-lg font-black">{currencySymbol}{stats.premiumRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 dark:border-gray-800 pb-2">
                     <span className="text-sm font-bold text-slate-500">Rider Payouts (75%)</span>
                     <span className="text-lg font-black text-slate-500">- {currencySymbol}{stats.riderPayouts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                     <span className="text-sm font-bold text-green-600">Platform Commission (25%)</span>
                     <span className="text-xl font-black text-green-600">
                        {currencySymbol}{stats.platformEarnings.toLocaleString()}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Finance;
