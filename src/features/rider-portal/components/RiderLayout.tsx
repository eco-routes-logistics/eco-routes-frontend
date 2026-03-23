import React from 'react';
import { Navigate, Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useRiderAuthStore } from '@/stores/riderAuthStore';
import { useRiderStore } from '@/stores/riderStore';

const navLinks = [
    { to: '/rider/dashboard', label: 'Overview', icon: 'grid_view' },
    { to: '/rider/deliveries', label: 'Deliveries', icon: 'local_shipping' },
    { to: '/rider/earnings', label: 'Earnings', icon: 'payments' },
    { to: '/rider/profile', label: 'Profile', icon: 'person' },
];

const pageTitles: Record<string, string> = {
    '/rider/dashboard': 'Overview',
    '/rider/deliveries': 'Deliveries',
    '/rider/earnings': 'Earnings',
    '/rider/profile': 'Profile',
};

const statusConfig = {
    active: { label: 'Available', color: 'bg-emerald-500/20 text-emerald-400' },
    busy: { label: 'On Delivery', color: 'bg-amber-500/20 text-amber-400' },
    inactive: { label: 'Offline', color: 'bg-zinc-500/20 text-zinc-400' },
};

const RiderLayout: React.FC = () => {
    const { isAuthenticated, loggedInRider, logout } = useRiderAuthStore();
    const { riders } = useRiderStore();
    const navigate = useNavigate();
    const location = useLocation();

    if (!isAuthenticated || !loggedInRider) {
        return <Navigate to="/rider/login" replace />;
    }

    // Get latest rider data from store (status may have been updated)
    const liveRider = riders.find((r) => r.id === loggedInRider.id) ?? loggedInRider;
    const status = statusConfig[liveRider.status] ?? statusConfig.inactive;

    const handleLogout = () => {
        logout();
        navigate('/rider/login');
    };

    const pageTitle = pageTitles[location.pathname] ?? 'Rider Portal';
    const initials = liveRider.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="flex h-screen bg-[#f7f8fa] dark:bg-[#0d0f14] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[220px] flex-shrink-0 flex flex-col bg-[#0f1117] text-white">
                {/* Brand */}
                <div className="px-6 py-6 border-b border-white/5 bg-[#141620]">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>delivery_dining</span>
                        <p className="text-[16px] font-black text-white tracking-widest uppercase">EcoRoute</p>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest mt-1 ml-[28px]">Rider App</p>
                </div>

                {/* Rider pill */}
                <div className="mx-4 mt-6 mb-4 px-3 py-3 rounded-2xl bg-[#1c1f2e] border border-white/5 flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                        <span className="text-white text-[13px] font-black">{initials}</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-[14px] font-bold text-white truncate leading-tight">{liveRider.name}</p>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-medium">{liveRider.vehicleType ?? 'Rider'}</p>
                    </div>
                </div>

                {/* Status badge */}
                <div className="mx-4 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${status.color}`}>
                        <span className="size-1.5 rounded-full bg-current" />
                        {status.label}
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-2 space-y-1">
                    <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-4 py-3">Menu</p>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 mx-1 px-3 py-3 rounded-xl text-[14px] font-semibold transition-all group ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`material-symbols-outlined text-[20px] transition-colors ${isActive ? 'text-primary' : 'text-zinc-500 group-hover:text-zinc-300'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {link.icon}
                                    </span>
                                    {link.label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-4 pb-6 mt-auto border-t border-white/5 pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all group"
                    >
                        <span className="material-symbols-outlined text-[20px] text-zinc-500 group-hover:text-zinc-300">logout</span>
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="h-14 bg-white dark:bg-[#111318] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400 font-medium">Rider Portal</span>
                        <span className="text-slate-300 dark:text-gray-600">/</span>
                        <span className="text-slate-800 dark:text-white font-semibold">{pageTitle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <NavLink
                            to="/rider/deliveries"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-lg text-[13px] font-semibold hover:bg-primary-dark transition-all shadow-sm shadow-primary/20"
                        >
                            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                            Find Jobs
                        </NavLink>
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary text-[12px] font-black">{initials}</span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-hidden flex flex-col">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default RiderLayout;
