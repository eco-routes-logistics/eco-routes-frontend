import React, { useState } from 'react';
import { useFinanceStore } from '@/stores/financeStore';
import { Transaction } from '@/types';
import { useSettingsStore } from '@/stores/settingsStore';

const Billing: React.FC = () => {
  const { transactions, processPayout, markAsDisputed } = useFinanceStore();
  const { system } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<'transactions' | 'payouts' | 'invoices'>('transactions');
  const [searchQuery, setSearchQuery] = useState('');

  const currencySymbol = system.currency === 'NGN' ? '₦' : '£';

  const filteredTransactions = transactions.filter(t =>
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.riderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingPayouts = transactions.filter(t => t.deliveryModel === 'Premium' && t.status === 'Pending');
  const totalPendingAmount = pendingPayouts.reduce((sum, t) => sum + t.riderPayout, 0);

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Billing & Settlements</h1>
          <p className="text-[#616f89] dark:text-gray-400 text-sm mt-1">Manage invoices, rider payouts, and transaction history.</p>
        </div>
        {activeTab === 'payouts' && (
          <div className="flex gap-4 items-center bg-teal-50 dark:bg-teal-900/20 px-4 py-2 rounded-xl border border-teal-100 dark:border-teal-900">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400">Total Pending</p>
              <p className="text-lg font-black text-teal-700 dark:text-teal-300">{currencySymbol}{totalPendingAmount.toLocaleString()}</p>
            </div>
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all">
              Process All
            </button>
          </div>
        )}
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
        {(['transactions', 'payouts', 'invoices'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab
              ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
          <h3 className="text-lg font-bold capitalize">{activeTab} List</h3>
          <div className="flex gap-2">
            <input
              className="pl-4 pr-4 py-2 h-10 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-primary focus:border-primary"
              placeholder="Search..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-bold text-xs uppercase tracking-widest hover:bg-gray-50">
              <span className="material-symbols-outlined text-[18px]">download</span> Export
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#f9fafb] dark:bg-gray-800/50">
              <tr className="border-b border-[#dbdfe6] dark:border-gray-700">
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400">Status</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400">Reference</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400">Model</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400">Client / Rider</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400 text-right">Total Fee</th>
                {activeTab !== 'invoices' && (
                  <>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-primary text-right bg-primary/5">Admin (25%)</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-purple-600 text-right bg-purple-50/30">Rider Pay</th>
                  </>
                )}
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#616f89] dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No {activeTab} found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((trx, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${trx.status === 'Pending' ? 'bg-yellow-500' : trx.status === 'Processed' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-xs font-bold">{trx.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">{trx.id}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{trx.orderId}</div>
                      <div className="text-[10px] text-slate-400">{trx.date}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${trx.deliveryModel === 'Premium' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {trx.deliveryModel}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold">{trx.clientName}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">two_wheeler</span>
                        {trx.riderName}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-sm">{currencySymbol}{trx.totalFee.toLocaleString()}</td>
                    {activeTab !== 'invoices' && (
                      <>
                        <td className="py-4 px-6 text-right font-black text-sm text-primary bg-primary/5">
                          {currencySymbol}{trx.platformCommission.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-right font-black text-sm text-purple-600 bg-purple-50/30">
                          {trx.riderPayout > 0 ? `${currencySymbol}${trx.riderPayout.toLocaleString()}` : '-'}
                        </td>
                      </>
                    )}
                    <td className="py-4 px-6 text-right">
                      {trx.status === 'Pending' && trx.deliveryModel === 'Premium' && (
                        <button
                          onClick={() => processPayout(trx.id)}
                          className="text-[10px] font-bold bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Pay Rider
                        </button>
                      )}
                      {trx.status === 'Processed' && (
                        <span className="text-[10px] font-bold text-green-600 border border-green-200 px-2 py-1 rounded">Paid</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
