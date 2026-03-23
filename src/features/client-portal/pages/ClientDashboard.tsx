import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useClientAuthStore } from '@/stores/clientAuthStore';
import { useOrderStore } from '@/stores/orderStore';
import { useWalletStore } from '@/stores/walletStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { ORDER_STATUSES } from '@/utils/constants';

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
    [ORDER_STATUSES.PENDING]: { label: 'Pending', dot: 'bg-amber-400', text: 'text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400' },
    [ORDER_STATUSES.IN_TRANSIT]: { label: 'In Transit', dot: 'bg-blue-500', text: 'text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' },
    [ORDER_STATUSES.DELIVERED]: { label: 'Delivered', dot: 'bg-emerald-500', text: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' },
    [ORDER_STATUSES.CANCELLED]: { label: 'Cancelled', dot: 'bg-red-400', text: 'text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400' },
};

const ClientDashboard: React.FC = () => {
    const { loggedInClient } = useClientAuthStore();
    const { orders } = useOrderStore();
    const { getWallet } = useWalletStore();
    const { system } = useSettingsStore();
    const currency = system.currency === 'NGN' ? '₦' : '£';

    const myOrders = useMemo(
        () => orders.filter((o) => o.businessClientId === loggedInClient?.id),
        [orders, loggedInClient]
    );

    const stats = useMemo(() => ({
        total: myOrders.length,
        pending: myOrders.filter((o) => o.status === ORDER_STATUSES.PENDING).length,
        inTransit: myOrders.filter((o) => o.status === ORDER_STATUSES.IN_TRANSIT).length,
        delivered: myOrders.filter((o) => o.status === ORDER_STATUSES.DELIVERED).length,
    }), [myOrders]);

    const wallet = loggedInClient ? getWallet(loggedInClient.id) : null;
    const balance = wallet ? wallet.balance : 0;

    const recentOrders = [...myOrders].reverse().slice(0, 6);
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="flex-1 overflow-y-auto bg-[#f7f8fa] dark:bg-[#0d0f14]">
            <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

                {/* Page header */}
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">{today}</p>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
                            <span className="text-slate-600 dark:text-slate-300 font-semibold">{loggedInClient?.contactName?.split(' ')[0] || loggedInClient?.company}</span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-0.5">Here's what's happening with your deliveries today.</p>
                    </div>
                    <Link
                        to="/client/orders/new"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-all shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Place Order
                    </Link>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Account Type Specific Cards */}
                    {loggedInClient?.accountType === 'pay_as_you_go' ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group">
                            <div className="absolute -right-6 -top-6 size-24 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Wallet Balance</p>
                                    <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[18px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">{currency}{balance.toLocaleString()}</p>
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 py-2 bg-primary text-white rounded-lg text-[11px] font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                                            Fund Wallet
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group">
                            <div className="absolute -right-6 -top-6 size-24 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/30 transition-all duration-500" />
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Monthly Bill</p>
                                    <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[18px] text-purple-400" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white">{currency}0</p>
                                    <div className="mt-4 flex gap-2">
                                        <div className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-[11px] font-bold text-center">
                                            Post-Paid Account
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {[
                        { label: 'Total Orders', value: stats.total, sub: 'All time', icon: 'inventory_2', iconBg: 'bg-slate-100 dark:bg-slate-800', iconColor: 'text-slate-600 dark:text-slate-300' },
                        { label: 'Pending', value: stats.pending, sub: 'Awaiting pickup', icon: 'schedule', iconBg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-600' },
                        { label: 'In Transit', value: stats.inTransit, sub: 'On the way', icon: 'local_shipping', iconBg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-600' },
                    ].map((card) => (
                        <div key={card.label} className="bg-white dark:bg-[#1a1d27] rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wide">{card.label}</p>
                                <div className={`size-8 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                                    <span className={`material-symbols-outlined text-[18px] ${card.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                            <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Two column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent orders table */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Orders</h2>
                            <Link to="/client/orders" className="text-xs text-primary font-semibold hover:underline">View all</Link>
                        </div>
                        {recentOrders.length === 0 ? (
                            <div className="py-16 text-center">
                                <div className="size-12 bg-slate-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <span className="material-symbols-outlined text-slate-400 text-[24px]">inventory_2</span>
                                </div>
                                <p className="text-sm font-medium text-slate-600 dark:text-gray-400">No orders yet</p>
                                <p className="text-xs text-slate-400 mt-1">Place your first order to get started</p>
                                <Link to="/client/orders/new" className="mt-4 inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                                    <span className="material-symbols-outlined text-[14px]">add</span> Place Order
                                </Link>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-50 dark:border-gray-800">
                                        <th className="px-6 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Order</th>
                                        <th className="px-6 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Recipient</th>
                                        <th className="px-6 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order, i) => {
                                        const cfg = statusConfig[order.status];
                                        return (
                                            <tr key={order.id} className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors ${i === recentOrders.length - 1 ? 'border-none' : ''}`}>
                                                <td className="px-6 py-3.5">
                                                    <p className="font-semibold text-slate-900 dark:text-white text-[13px]">{order.id}</p>
                                                    <p className="text-[11px] text-slate-400">{order.deliveryLocation}</p>
                                                </td>
                                                <td className="px-6 py-3.5 text-[13px] text-slate-600 dark:text-gray-400">{order.customer}</td>
                                                <td className="px-6 py-3.5">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg?.text || 'bg-gray-100 text-gray-600'}`}>
                                                        <span className={`size-1.5 rounded-full ${cfg?.dot || 'bg-gray-400'}`} />
                                                        {cfg?.label || order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3.5 text-[12px] text-slate-400">{order.date}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Quick actions */}
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                {[
                                    { to: '/client/orders/new', icon: 'add_box', label: 'Place New Order', desc: 'Submit a delivery request' },
                                    { to: '/client/orders', icon: 'manage_search', label: 'Track Shipments', desc: 'View live order status' },
                                    { to: '/client/invoices', icon: 'receipt_long', label: 'View Invoices', desc: 'Download billing history' },
                                ].map((action) => (
                                    <Link
                                        key={action.to}
                                        to={action.to}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="size-9 rounded-xl bg-slate-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                                            <span className="material-symbols-outlined text-[18px] text-slate-500 group-hover:text-primary transition-colors">{action.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold text-slate-800 dark:text-white">{action.label}</p>
                                            <p className="text-[11px] text-slate-400">{action.desc}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-[16px] text-slate-300 dark:text-gray-600 ml-auto group-hover:text-primary transition-colors">chevron_right</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Account info */}
                        <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Account</h2>
                            <div className="space-y-2.5">
                                <div className="flex justify-between text-[12px]">
                                    <span className="text-slate-400">Company</span>
                                    <span className="font-medium text-slate-800 dark:text-white">{loggedInClient?.company}</span>
                                </div>
                                <div className="flex justify-between text-[12px]">
                                    <span className="text-slate-400">Contact</span>
                                    <span className="font-medium text-slate-800 dark:text-white">{loggedInClient?.contactName}</span>
                                </div>
                                <div className="flex justify-between text-[12px]">
                                    <span className="text-slate-400">Status</span>
                                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                                        <span className="size-1.5 rounded-full bg-emerald-500" /> Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
