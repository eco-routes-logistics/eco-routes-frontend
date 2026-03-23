import React, { useMemo, useState } from 'react';
import { useRiderAuthStore } from '@/stores/riderAuthStore';
import { useRiderStore } from '@/stores/riderStore';
import { useOrderStore } from '@/stores/orderStore';
import type { Order } from '@/types';

const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

const statusBadge: Record<string, string> = {
    Delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'In Transit': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Accepted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Pending: 'bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-gray-400',
};

type Tab = 'available' | 'active' | 'history';

const RiderDeliveries: React.FC = () => {
    const { loggedInRider } = useRiderAuthStore();
    const { riders, updateRider } = useRiderStore();
    const { orders, assignRider, updateOrderStatus, updateOrder } = useOrderStore();

    const [activeTab, setActiveTab] = useState<Tab>('available');
    const [deliveryNote, setDeliveryNote] = useState<Record<string, string>>({});
    const [completingId, setCompletingId] = useState<string | null>(null);

    const liveRider = riders.find((r) => r.id === loggedInRider?.id) ?? loggedInRider;

    const availableJobs = useMemo(
        () => orders.filter((o) => o.status === 'Pending' && !o.driverId),
        [orders]
    );

    const activeOrders = useMemo(
        () => orders.filter((o) => o.driverId === liveRider?.id && (o.status === 'Accepted' || o.status === 'In Transit')),
        [orders, liveRider?.id]
    );

    const historyOrders = useMemo(
        () => orders.filter((o) => o.driverId === liveRider?.id && (o.status === 'Delivered' || o.status === 'Cancelled' || o.status === 'Failed')),
        [orders, liveRider?.id]
    );

    if (!liveRider) return null;

    const handleAccept = (order: Order) => {
        assignRider(order.id, liveRider.id, liveRider.name);
        updateOrderStatus(order.id, 'Accepted');
        updateRider(liveRider.id, { currentOrders: liveRider.currentOrders + 1, status: 'busy' });
        setActiveTab('active');
    };

    const handlePickedUp = (orderId: string) => {
        updateOrderStatus(orderId, 'In Transit');
        updateOrder(orderId, { pickedUpAt: new Date().toISOString() });
    };

    const handleDeliver = async (order: Order) => {
        setCompletingId(order.id);
        await new Promise((r) => setTimeout(r, 500));
        updateOrderStatus(order.id, 'Delivered');
        updateOrder(order.id, {
            deliveredAt: new Date().toISOString(),
            deliveryProof: deliveryNote[order.id] ?? 'Delivered successfully.',
        });
        updateRider(liveRider.id, {
            currentOrders: Math.max(0, liveRider.currentOrders - 1),
            totalDeliveries: liveRider.totalDeliveries + 1,
            status: liveRider.currentOrders <= 1 ? 'active' : 'busy',
        });
        setCompletingId(null);
        setDeliveryNote((prev) => { const n = { ...prev }; delete n[order.id]; return n; });
    };

    const tabs: { id: Tab; label: string; count: number }[] = [
        { id: 'available', label: 'Available Jobs', count: availableJobs.length },
        { id: 'active', label: 'Active', count: activeOrders.length },
        { id: 'history', label: 'History', count: historyOrders.length },
    ];

    return (
        <div className="flex-1 overflow-y-auto">
            {/* Tab bar */}
            <div className="border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-[#111318] px-6">
                <div className="flex gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-4 text-[14px] font-bold border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`px-1.5 py-0.5 rounded-full text-[11px] font-black ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400'}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 space-y-4">
                {/* Available Jobs */}
                {activeTab === 'available' && (
                    <>
                        {availableJobs.length === 0 ? (
                            <div className="text-center py-16">
                                <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-gray-600" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
                                <p className="text-slate-600 dark:text-gray-400 font-semibold mt-3">No jobs available</p>
                            </div>
                        ) : (
                            availableJobs.map((order) => (
                                <div key={order.id} className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="text-[13px] font-black text-slate-400">{order.trackingId}</p>
                                            <p className="text-[15px] font-bold text-slate-800 dark:text-white mt-0.5">{order.description ?? 'Package Delivery'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[18px] font-black text-emerald-600">{formatCurrency((order.totalFee ?? 0) * 0.75)}</p>
                                            <p className="text-[11px] text-slate-400 font-medium">Your earnings</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-slate-50 dark:bg-gray-800/60 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Pickup</p>
                                            </div>
                                            <p className="text-[13px] font-semibold text-slate-700 dark:text-gray-200">{order.pickupLocation}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-gray-800/60 rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="material-symbols-outlined text-[14px] text-blue-500">flag</span>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Delivery</p>
                                            </div>
                                            <p className="text-[13px] font-semibold text-slate-700 dark:text-gray-200">{order.deliveryLocation}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-[12px] text-slate-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">scale</span>
                                            {order.weight}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">inventory_2</span>
                                            {order.deliveryType}
                                        </span>
                                        {order.value && (
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">attach_money</span>
                                                Value: {order.value}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleAccept(order)}
                                        className="w-full py-2.5 bg-primary text-white rounded-xl text-[14px] font-bold hover:bg-primary-dark transition-all shadow-sm shadow-primary/20"
                                    >
                                        Accept Job
                                    </button>
                                </div>
                            ))
                        )}
                    </>
                )}

                {/* Active Orders */}
                {activeTab === 'active' && (
                    <>
                        {activeOrders.length === 0 ? (
                            <div className="text-center py-16">
                                <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-gray-600" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                                <p className="text-slate-600 dark:text-gray-400 font-semibold mt-3">No active deliveries</p>
                            </div>
                        ) : (
                            activeOrders.map((order) => (
                                <div key={order.id} className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-primary/20 shadow-sm overflow-hidden">
                                    <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="size-2 rounded-full bg-primary animate-pulse" />
                                            <p className="text-[13px] font-bold text-primary">{order.trackingId}</p>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusBadge[order.status]}`}>{order.status}</span>
                                    </div>

                                    <div className="p-5 space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Customer</p>
                                                <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{order.customer}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Phone</p>
                                                <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{order.customerPhone}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pickup</p>
                                                <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{order.pickupLocation}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Delivery</p>
                                                <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{order.deliveryLocation}</p>
                                            </div>
                                        </div>

                                        {order.otp && (
                                            <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                                <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>key</span>
                                                <div>
                                                    <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase">Delivery OTP</p>
                                                    <p className="text-[20px] font-black text-amber-800 dark:text-amber-300 tracking-widest">{order.otp}</p>
                                                </div>
                                            </div>
                                        )}

                                        {order.status === 'In Transit' && (
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Delivery Note (optional)</label>
                                                <textarea
                                                    rows={2}
                                                    value={deliveryNote[order.id] ?? ''}
                                                    onChange={(e) => setDeliveryNote((prev) => ({ ...prev, [order.id]: e.target.value }))}
                                                    placeholder="e.g. Left with security, received by John..."
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm outline-none transition-all resize-none text-slate-800 dark:text-white placeholder:text-slate-400"
                                                />
                                            </div>
                                        )}

                                        <div className="flex gap-3">
                                            {order.status === 'Accepted' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handlePickedUp(order.id)}
                                                    className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-[13px] font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                    Mark as Picked Up
                                                </button>
                                            )}
                                            {order.status === 'In Transit' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeliver(order)}
                                                    disabled={completingId === order.id}
                                                    className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-[13px] font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                                                >
                                                    {completingId === order.id ? (
                                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                                        </svg>
                                                    ) : (
                                                        <span className="material-symbols-outlined text-[16px]">task_alt</span>
                                                    )}
                                                    Mark as Delivered
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}

                {/* History */}
                {activeTab === 'history' && (
                    <>
                        {historyOrders.length === 0 ? (
                            <div className="text-center py-16">
                                <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-gray-600" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                                <p className="text-slate-600 dark:text-gray-400 font-semibold mt-3">No delivery history</p>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-gray-800">
                                            <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Order</th>
                                            <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Route</th>
                                            <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Date</th>
                                            <th className="text-right px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Earnings</th>
                                            <th className="text-right px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
                                        {historyOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="px-5 py-3">
                                                    <p className="font-bold text-slate-800 dark:text-white text-[13px]">{order.trackingId}</p>
                                                    <p className="text-slate-400 text-[11px]">{order.deliveryType}</p>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <p className="text-[13px] text-slate-700 dark:text-gray-200">{order.pickupLocation}</p>
                                                    <p className="text-[11px] text-slate-400">→ {order.deliveryLocation}</p>
                                                </td>
                                                <td className="px-5 py-3 text-[13px] text-slate-500">{order.date}</td>
                                                <td className="px-5 py-3 text-right">
                                                    <p className={`text-[13px] font-bold ${order.status === 'Delivered' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                        {order.status === 'Delivered' ? formatCurrency((order.totalFee ?? 0) * 0.75) : '—'}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusBadge[order.status] ?? ''}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default RiderDeliveries;
