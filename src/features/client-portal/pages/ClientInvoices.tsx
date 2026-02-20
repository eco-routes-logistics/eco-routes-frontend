import React, { useMemo } from 'react';
import { useClientAuthStore } from '@/stores/clientAuthStore';
import { useFinanceStore } from '@/stores/financeStore';
import { useSettingsStore } from '@/stores/settingsStore';

const statusConfig: Record<string, { dot: string; text: string }> = {
    Pending: { dot: 'bg-amber-400', text: 'text-amber-700 bg-amber-50' },
    Processed: { dot: 'bg-emerald-500', text: 'text-emerald-700 bg-emerald-50' },
    Disputed: { dot: 'bg-red-400', text: 'text-red-700 bg-red-50' },
};

const ClientInvoices: React.FC = () => {
    const { loggedInClient } = useClientAuthStore();
    const { transactions } = useFinanceStore();
    const { system } = useSettingsStore();
    const sym = system.currency === 'NGN' ? '₦' : '£';

    const myTransactions = useMemo(
        () => transactions.filter((t) => t.clientId === loggedInClient?.id),
        [transactions, loggedInClient]
    );

    const totalSpent = myTransactions.reduce((sum, t) => sum + t.totalFee, 0);
    const outstanding = myTransactions.filter((t) => t.status === 'Pending').reduce((sum, t) => sum + t.totalFee, 0);

    return (
        <div className="flex-1 overflow-y-auto bg-[#f7f8fa] dark:bg-[#0d0f14]">
            <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Invoices</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Your billing and payment history</p>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Total Invoices', value: String(myTransactions.length), icon: 'receipt_long', iconBg: 'bg-slate-100 dark:bg-slate-800', iconColor: 'text-slate-600 dark:text-slate-300' },
                        { label: 'Total Spent', value: `${sym}${totalSpent.toLocaleString()}`, icon: 'payments', iconBg: 'bg-primary/5', iconColor: 'text-primary' },
                        { label: 'Outstanding', value: `${sym}${outstanding.toLocaleString()}`, icon: 'pending_actions', iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-600' },
                    ].map((card) => (
                        <div key={card.label} className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{card.label}</p>
                                <div className={`size-8 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                                    <span className={`material-symbols-outlined text-[18px] ${card.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Transactions table */}
                <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Transaction History</h2>
                    </div>

                    {myTransactions.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="size-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <span className="material-symbols-outlined text-slate-400 text-[22px]">receipt_long</span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 dark:text-gray-400">No invoices yet</p>
                            <p className="text-xs text-slate-400 mt-1">Invoices are generated when orders are delivered</p>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-50 dark:border-gray-800">
                                    {['Invoice', 'Order', 'Date', 'Amount', 'Status'].map((h) => (
                                        <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {myTransactions.map((t, i) => {
                                    const cfg = statusConfig[t.status];
                                    return (
                                        <tr key={t.id} className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors ${i === myTransactions.length - 1 ? 'border-none' : ''}`}>
                                            <td className="px-5 py-3.5">
                                                <p className="font-semibold text-slate-900 dark:text-white text-[13px]">{t.id}</p>
                                            </td>
                                            <td className="px-5 py-3.5 text-[12px] text-slate-500">{t.orderId}</td>
                                            <td className="px-5 py-3.5 text-[12px] text-slate-400">{t.date}</td>
                                            <td className="px-5 py-3.5">
                                                <p className="font-semibold text-slate-900 dark:text-white text-[13px]">{sym}{t.totalFee.toLocaleString()}</p>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg?.text || 'bg-gray-100 text-gray-600'}`}>
                                                    <span className={`size-1.5 rounded-full ${cfg?.dot || 'bg-gray-400'}`} />
                                                    {t.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientInvoices;
