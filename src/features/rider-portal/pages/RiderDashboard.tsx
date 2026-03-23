import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRiderAuthStore } from '@/stores/riderAuthStore';
import { useRiderStore } from '@/stores/riderStore';
import { useOrderStore } from '@/stores/orderStore';

const statusOptions = [
    { value: 'active', label: 'Available', icon: 'check_circle', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20' },
    { value: 'busy', label: 'Busy', icon: 'schedule', color: 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20' },
    { value: 'inactive', label: 'Offline', icon: 'do_not_disturb_on', color: 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700' },
] as const;

const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Morning';
    if (h < 17) return 'Afternoon';
    return 'Evening';
};

const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

const RiderDashboard: React.FC = () => {
    const { loggedInRider } = useRiderAuthStore();
    const { riders, updateRider } = useRiderStore();
    const { orders } = useOrderStore();

    const liveRider = riders.find((r) => r.id === loggedInRider?.id) ?? loggedInRider;

    const myOrders = useMemo(
        () => orders.filter((o) => o.driverId === liveRider?.id),
        [orders, liveRider?.id]
    );

    const today = new Date().toDateString();

    const todayDeliveries = useMemo(
        () => myOrders.filter((o) => o.status === 'Delivered' && o.deliveredAt && new Date(o.deliveredAt).toDateString() === today),
        [myOrders, today]
    );

    const todayEarnings = useMemo(
        () => todayDeliveries.reduce((sum, o) => sum + (o.totalFee ?? 0) * 0.75, 0),
        [todayDeliveries]
    );

    const activeDelivery = useMemo(
        () => myOrders.find((o) => o.status === 'In Transit'),
        [myOrders]
    );

    const recentDeliveries = useMemo(
        () => myOrders.filter((o) => o.status === 'Delivered').slice(0, 5),
        [myOrders]
    );

    if (!liveRider) return null;

    const handleStatusChange = (status: 'active' | 'busy' | 'inactive') => {
        updateRider(liveRider.id, { status });
    };

    const statusBadge: Record<string, string> = {
        Delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        'In Transit': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        Accepted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        Failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                        {greeting()}, {liveRider.name.split(' ')[0]}
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Today's summary</p>
                </div>
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700">
                    {statusOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleStatusChange(opt.value)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-bold border transition-all ${liveRider.status === opt.value
                                    ? opt.color + ' shadow-sm'
                                    : 'bg-transparent text-slate-400 border-transparent hover:text-slate-600 dark:hover:text-gray-300'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>{opt.icon}</span>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        label: "Today's Deliveries",
                        value: todayDeliveries.length,
                        icon: 'local_shipping',
                        color: 'text-blue-500',
                        bg: 'bg-blue-50 dark:bg-blue-900/20',
                    },
                    {
                        label: "Today's Earnings",
                        value: formatCurrency(todayEarnings),
                        icon: 'payments',
                        color: 'text-emerald-500',
                        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
                    },
                    {
                        label: 'Your Rating',
                        value: `${liveRider.rating.toFixed(1)} ★`,
                        icon: 'star',
                        color: 'text-amber-500',
                        bg: 'bg-amber-50 dark:bg-amber-900/20',
                    },
                    {
                        label: 'Total Deliveries',
                        value: liveRider.totalDeliveries,
                        icon: 'inventory_2',
                        color: 'text-purple-500',
                        bg: 'bg-purple-50 dark:bg-purple-900/20',
                    },
                ].map((card) => (
                    <div key={card.label} className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 p-5 shadow-sm">
                        <div className={`size-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                            <span className={`material-symbols-outlined text-[20px] ${card.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
                        </div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{card.value}</p>
                        <p className="text-xs text-slate-500 font-semibold mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Active delivery */}
            {activeDelivery ? (
                <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-primary/30 shadow-sm shadow-primary/10 overflow-hidden">
                    <div className="px-5 py-4 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-primary animate-pulse" />
                            <p className="text-[13px] font-bold text-primary uppercase tracking-wide">Active Delivery</p>
                        </div>
                        <span className="text-[12px] font-bold text-slate-500">{activeDelivery.trackingId}</span>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Pickup</p>
                                <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{activeDelivery.pickupLocation}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Delivery</p>
                                <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{activeDelivery.deliveryLocation}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Customer</p>
                                <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{activeDelivery.customer}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Phone</p>
                                <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{activeDelivery.customerPhone}</p>
                            </div>
                        </div>
                        <Link
                            to="/rider/deliveries"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold hover:bg-primary-dark transition-all"
                        >
                            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                            View & Update Delivery
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 p-8 text-center">
                    <span className="material-symbols-outlined text-[40px] text-slate-300 dark:text-gray-600" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                    <p className="text-slate-600 dark:text-gray-400 font-semibold mt-2">No active delivery</p>
                    <Link
                        to="/rider/deliveries"
                        className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-bold hover:bg-primary-dark transition-all"
                    >
                        View available jobs
                    </Link>
                </div>
            )}

            {/* Recent deliveries */}
            {recentDeliveries.length > 0 && (
                <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between">
                        <p className="font-bold text-slate-800 dark:text-white text-[15px]">Recent Deliveries</p>
                        <Link to="/rider/deliveries" className="text-primary text-[13px] font-semibold hover:underline">View all</Link>
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-gray-800">
                        {recentDeliveries.map((order) => (
                            <div key={order.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
                                <div>
                                    <p className="text-[13px] font-bold text-slate-800 dark:text-white">{order.trackingId}</p>
                                    <p className="text-[12px] text-slate-400">{order.pickupLocation} → {order.deliveryLocation}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-[13px] font-bold text-emerald-600">{formatCurrency((order.totalFee ?? 0) * 0.75)}</p>
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${statusBadge[order.status] ?? ''}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RiderDashboard;
