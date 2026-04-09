import React from 'react';
import { useRiderEarnings } from '../hooks/useRiderSelf';

const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

const RiderEarnings: React.FC = () => {
    const { data, isLoading } = useRiderEarnings();

    const summary = data?.data?.summary;
    const payouts = data?.data?.payouts ?? [];

    if (isLoading) return (
        <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
    );

    const summaryCards = [
        { label: 'Today', value: summary?.today ?? 0, icon: 'today', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'This Week', value: summary?.thisWeek ?? 0, icon: 'date_range', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'This Month', value: summary?.thisMonth ?? 0, icon: 'calendar_month', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { label: 'All Time', value: summary?.allTime ?? 0, icon: 'account_balance_wallet', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    ];

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">Earnings</h1>
                <p className="text-slate-500 text-sm mt-1">Track your delivery payouts</p>
            </div>

            {/* Commission notice */}
            <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-medium">
                    You earn <span className="font-black text-primary">75%</span> of each delivery fee. EcoRoutes retains 25% as a platform fee.
                </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card) => (
                    <div key={card.label} className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 p-5 shadow-sm">
                        <div className={`size-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                            <span className={`material-symbols-outlined text-[20px] ${card.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(card.value)}</p>
                        <p className="text-xs text-slate-500 font-semibold mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Payout table */}
            <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-gray-800">
                    <p className="font-bold text-slate-800 dark:text-white text-[15px]">Delivery Payouts</p>
                    <p className="text-slate-400 text-[12px] mt-0.5">{payouts.length} completed deliveries</p>
                </div>

                {payouts.length === 0 ? (
                    <div className="py-16 text-center">
                        <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-gray-600" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                        <p className="text-slate-600 dark:text-gray-400 font-semibold mt-3">No earnings yet</p>
                        <p className="text-slate-400 text-sm mt-1">Complete deliveries to start earning.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-gray-800">
                                <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Order</th>
                                <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Route</th>
                                <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Date</th>
                                <th className="text-right px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Delivery Fee</th>
                                <th className="text-right px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Your Payout (75%)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
                            {payouts.map((payout) => (
                                <tr key={payout.orderId} className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-5 py-3">
                                        <p className="font-bold text-slate-800 dark:text-white text-[13px]">{payout.trackingId}</p>
                                        <p className="text-slate-400 text-[11px]">{payout.deliveryType}</p>
                                    </td>
                                    <td className="px-5 py-3">
                                        <p className="text-[13px] text-slate-700 dark:text-gray-200">{payout.pickupLocation}</p>
                                        <p className="text-[11px] text-slate-400">→ {payout.deliveryLocation}</p>
                                    </td>
                                    <td className="px-5 py-3 text-[13px] text-slate-500">
                                        {payout.deliveredAt
                                            ? new Date(payout.deliveredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                            : '—'}
                                    </td>
                                    <td className="px-5 py-3 text-right text-[13px] text-slate-500">
                                        {formatCurrency(payout.totalFee ?? 0)}
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <p className="text-[13px] font-bold text-emerald-600">{formatCurrency(payout.riderEarnings)}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-slate-50 dark:bg-gray-800/50 border-t border-slate-100 dark:border-gray-800">
                                <td colSpan={4} className="px-5 py-3 text-[13px] font-bold text-slate-600 dark:text-gray-300">Total Earnings</td>
                                <td className="px-5 py-3 text-right text-[15px] font-black text-emerald-600">{formatCurrency(summary?.allTime ?? 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                )}
            </div>
        </div>
    );
};

export default RiderEarnings;
