import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

const statusConfig: Record<string, { dot: string; text: string; label: string }> = {
    pending: { dot: 'bg-amber-400', text: 'text-amber-700 bg-amber-50', label: 'Pending' },
    in_transit: { dot: 'bg-blue-500', text: 'text-blue-700 bg-blue-50', label: 'In Transit' },
    delivered: { dot: 'bg-emerald-500', text: 'text-emerald-700 bg-emerald-50', label: 'Delivered' },
    cancelled: { dot: 'bg-red-400', text: 'text-red-700 bg-red-50', label: 'Cancelled' },
};

const filters = ['All', 'pending', 'in_transit', 'delivered', 'cancelled'];
const filterLabels: Record<string, string> = { All: 'All', pending: 'Pending', in_transit: 'In Transit', delivered: 'Delivered', cancelled: 'Cancelled' };

const ClientOrders: React.FC = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    const { data: ordersData } = useQuery({
        queryKey: ['client-orders'],
        queryFn: () => api.get<any, any>('/client-auth/orders'),
        enabled: !!localStorage.getItem('client_token'),
    });

    const myOrders = ordersData?.data?.orders ?? [];

    const filtered = useMemo(() => {
        return myOrders.filter((o: any) => {
            const q = search.toLowerCase();
            const matchesSearch = (o.trackingId || '').toLowerCase().includes(q) || (o.customerName || '').toLowerCase().includes(q) || (o.deliveryLocation || '').toLowerCase().includes(q);
            const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [myOrders, search, statusFilter]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f7f8fa] dark:bg-[#0d0f14]">
            <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Orders</h1>
                            <p className="text-sm text-slate-500 mt-0.5">{filtered.length} of {myOrders.length} orders</p>
                        </div>
                        <Link
                            to="/client/orders/new"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all"
                        >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            New Order
                        </Link>
                    </div>

                    {/* Toolbar */}
                    <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
                                </span>
                                <input
                                    className="w-full h-9 pl-9 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    placeholder="Search orders..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-1.5 flex-wrap">
                                {filters.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setStatusFilter(f)}
                                        className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${statusFilter === f
                                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                                : 'bg-gray-100 dark:bg-gray-800 text-slate-500 hover:text-slate-700 dark:hover:text-gray-300'
                                            }`}
                                    >
                                        {filterLabels[f] ?? f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        {filtered.length === 0 ? (
                            <div className="py-20 text-center">
                                <div className="size-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <span className="material-symbols-outlined text-slate-400 text-[22px]">inventory_2</span>
                                </div>
                                <p className="text-sm font-medium text-slate-600 dark:text-gray-400">No orders found</p>
                                {myOrders.length === 0 && (
                                    <Link to="/client/orders/new" className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                                        <span className="material-symbols-outlined text-[14px]">add</span> Place your first order
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-50 dark:border-gray-800">
                                        {['Order ID', 'Recipient', 'Destination', 'Type', 'Status', 'Date'].map((h) => (
                                            <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((order: any, i: number) => {
                                        const cfg = statusConfig[order.status];
                                        return (
                                            <tr
                                                key={order._id || order.id}
                                                onClick={() => setSelectedOrder(order)}
                                                className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors ${i === filtered.length - 1 ? 'border-none' : ''}`}
                                            >
                                                <td className="px-5 py-3.5">
                                                    <p className="font-semibold text-slate-900 dark:text-white text-[13px]">{order.trackingId}</p>
                                                    <p className="text-[11px] text-slate-400">{order._id || order.id}</p>
                                                </td>
                                                <td className="px-5 py-3.5 text-[13px] text-slate-700 dark:text-gray-300">{order.customerName}</td>
                                                <td className="px-5 py-3.5 text-[12px] text-slate-500 max-w-[160px] truncate">{order.deliveryLocation}</td>
                                                <td className="px-5 py-3.5 text-[12px] text-slate-500">{order.deliveryType}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg?.text || 'bg-gray-100 text-gray-600'}`}>
                                                        <span className={`size-1.5 rounded-full ${cfg?.dot || 'bg-gray-400'}`} />
                                                        {cfg?.label || order.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-[12px] text-slate-400">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Detail slide-in panel */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setSelectedOrder(null)} />
                    <div className="relative w-full max-w-[420px] bg-white dark:bg-[#1a1d27] shadow-2xl h-full flex flex-col border-l border-gray-200 dark:border-gray-800">
                        {/* Panel header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between">
                            <div>
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Order Details</p>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedOrder.trackingId}</h2>
                                <p className="text-[12px] text-slate-400 mt-0.5">{selectedOrder._id || selectedOrder.id}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-[20px] text-slate-500">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Status banner */}
                            {(() => {
                                const cfg = statusConfig[selectedOrder.status];
                                return (
                                    <div className={`flex items-center gap-3 p-4 rounded-xl ${cfg?.text || 'bg-gray-100 text-gray-600'}`}>
                                        <span className={`size-2.5 rounded-full ${cfg?.dot || 'bg-gray-400'} flex-shrink-0`} />
                                        <div>
                                            <p className="font-semibold text-[14px]">{cfg?.label || selectedOrder.status}</p>
                                            {selectedOrder.driver && <p className="text-[12px] opacity-70 mt-0.5">Rider: {selectedOrder.driver}</p>}
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Info rows */}
                            {[
                                { label: 'Recipient', value: selectedOrder.customerName },
                                { label: 'Phone', value: selectedOrder.customerPhone },
                                { label: 'Pickup', value: selectedOrder.pickupLocation },
                                { label: 'Delivery', value: selectedOrder.deliveryLocation },
                                { label: 'Package', value: selectedOrder.description || '—' },
                                { label: 'Weight', value: selectedOrder.weight },
                                { label: 'Value', value: `₦${Number(selectedOrder.value || 0).toLocaleString()}` },
                                { label: 'Type', value: selectedOrder.deliveryType },
                                { label: 'Date', value: selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString() : '—' },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex justify-between items-start py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-none">
                                    <span className="text-[12px] text-slate-400 font-medium">{label}</span>
                                    <span className="text-[13px] font-semibold text-slate-800 dark:text-white text-right max-w-[55%]">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientOrders;
