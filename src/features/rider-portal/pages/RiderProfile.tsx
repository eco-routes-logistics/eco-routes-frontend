import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRiderAuthStore } from '@/stores/riderAuthStore';
import { useRiderMe, useUpdateRiderProfile } from '../hooks/useRiderAuth';

const vehicleOptions = ['Motorcycle', 'Bicycle', 'Car', 'Van', 'Truck'];

const RiderProfile: React.FC = () => {
    const { logout } = useRiderAuthStore();
    const navigate = useNavigate();
    const { data: meData } = useRiderMe();
    const { mutate: updateProfile, isPending: isSaving } = useUpdateRiderProfile();

    const liveRider = meData?.data?.rider;

    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        vehicleType: '',
    });

    useEffect(() => {
        if (liveRider) {
            setForm({ name: liveRider.name, phone: liveRider.phone, vehicleType: liveRider.vehicleType });
        }
    }, [liveRider]);

    if (!liveRider) return null;

    const initials = liveRider.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const successRate = liveRider.totalDeliveries > 0
        ? Math.round(((liveRider.completedOrders ?? 0) / liveRider.totalDeliveries) * 100)
        : 100;

    const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

    const handleSave = () => {
        updateProfile({ name: form.name, phone: form.phone, vehicleType: form.vehicleType });
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleCancel = () => {
        setForm({ name: liveRider.name, phone: liveRider.phone, vehicleType: liveRider.vehicleType });
        setEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/rider/login');
    };

    const statusConfig = {
        active: { label: 'Available', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
        busy: { label: 'On Delivery', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
        inactive: { label: 'Offline', color: 'bg-slate-100 text-slate-500 dark:bg-gray-800 dark:text-gray-400' },
    };
    const statusStyle = statusConfig[liveRider.status] ?? statusConfig.inactive;

    const inputClass = 'w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm font-medium outline-none transition-all text-slate-800 dark:text-white disabled:opacity-60 disabled:cursor-default';

    return (
        <div className="flex-1 overflow-y-auto p-6 max-w-2xl space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">Profile</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your rider account</p>
            </div>

            {saved && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <span className="material-symbols-outlined text-emerald-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <p className="text-[13px] text-emerald-700 dark:text-emerald-400 font-semibold">Profile updated successfully.</p>
                </div>
            )}

            {/* Avatar + identity */}
            <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 p-6 flex items-center gap-5">
                <div className="size-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                    <span className="text-white text-[24px] font-black">{initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xl font-black text-slate-900 dark:text-white">{liveRider.name}</p>
                    <p className="text-slate-500 text-sm">{liveRider.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusStyle.color}`}>{statusStyle.label}</span>
                        <span className="text-slate-300 dark:text-gray-600">·</span>
                        <span className="text-[12px] text-slate-500 font-medium">{liveRider.vehicleType}</span>
                    </div>
                </div>
            </div>

            {/* Performance */}
            <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 p-6">
                <p className="text-[13px] font-bold text-slate-500 uppercase tracking-wide mb-4">Performance</p>
                <div className="grid grid-cols-3 gap-4 mb-5">
                    {[
                        { label: 'Total Deliveries', value: liveRider.totalDeliveries },
                        { label: 'Active Orders', value: liveRider.currentOrders },
                        { label: 'Success Rate', value: `${successRate}%` },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center p-3 bg-slate-50 dark:bg-gray-800/50 rounded-xl">
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Rating bar */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[12px] font-bold text-slate-500 uppercase">Rating</p>
                        <p className="text-[14px] font-black text-amber-500">{liveRider.rating.toFixed(1)} ★</p>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-amber-400 rounded-full transition-all"
                            style={{ width: `${(liveRider.rating / 5) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>0</span>
                        <span>5.0</span>
                    </div>
                </div>
            </div>

            {/* Edit info */}
            <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-5">
                    <p className="text-[13px] font-bold text-slate-500 uppercase tracking-wide">Account Details</p>
                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 rounded-lg text-[12px] font-bold transition-all"
                        >
                            <span className="material-symbols-outlined text-[14px]">edit</span>
                            Edit
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="rider-name" className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Full Name</label>
                        <input
                            id="rider-name"
                            value={form.name}
                            onChange={(e) => update('name', e.target.value)}
                            disabled={!editing}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="rider-email" className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Email</label>
                        <input
                            id="rider-email"
                            value={liveRider.email ?? ''}
                            disabled
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="rider-phone" className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Phone</label>
                        <input
                            id="rider-phone"
                            value={form.phone}
                            onChange={(e) => update('phone', e.target.value)}
                            disabled={!editing}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="rider-vehicle" className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Vehicle Type</label>
                        {editing ? (
                            <select
                                id="rider-vehicle"
                                value={form.vehicleType}
                                onChange={(e) => update('vehicleType', e.target.value)}
                                className={inputClass}
                            >
                                {vehicleOptions.map((v) => <option key={v} value={v}>{v}</option>)}
                            </select>
                        ) : (
                            <input id="rider-vehicle" value={form.vehicleType} disabled className={inputClass} />
                        )}
                    </div>
                </div>

                {editing && (
                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 py-2.5 bg-primary text-white rounded-xl text-[14px] font-bold hover:bg-primary-dark transition-all shadow-sm shadow-primary/20 disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-bold text-sm text-slate-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Logout */}
            <div className="bg-white dark:bg-[#1a1d27] rounded-2xl border border-slate-100 dark:border-gray-800 p-5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-[14px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sign out of Rider Account
                </button>
            </div>
        </div>
    );
};

export default RiderProfile;
