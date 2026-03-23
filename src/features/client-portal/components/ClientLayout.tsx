import React, { useState } from 'react';
import { Navigate, Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useClientAuthStore } from '@/stores/clientAuthStore';

const navLinks = [
    { to: '/client/dashboard', label: 'Overview', icon: 'grid_view' },
    { to: '/client/orders', label: 'Orders', icon: 'inventory_2' },
    { to: '/client/invoices', label: 'Invoices', icon: 'receipt_long' },
];

const pageTitles: Record<string, string> = {
    '/client/dashboard': 'Overview',
    '/client/orders': 'Orders',
    '/client/orders/new': 'New Order',
    '/client/invoices': 'Invoices',
};

const ClientLayout: React.FC = () => {
    const { isAuthenticated, loggedInClient, logout } = useClientAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    if (!isAuthenticated || !loggedInClient) {
        return <Navigate to="/client/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/client/login');
    };

    const pageTitle = pageTitles[location.pathname] ?? 'Portal';
    const initials = loggedInClient.company.slice(0, 2).toUpperCase();

    return (
        <div className="flex h-screen bg-[#f7f8fa] dark:bg-[#0d0f14] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[220px] flex-shrink-0 flex flex-col bg-[#0f1117] text-white">
                {/* Brand */}
                <div className="px-6 py-6 border-b border-white/5 bg-[#141620]">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                        <p className="text-[16px] font-black text-white tracking-widest uppercase">EcoRoute</p>
                    </div>
                </div>

                {/* Company pill */}
                <div className="mx-4 mt-6 mb-4 px-3 py-3 rounded-2xl bg-[#1c1f2e] border border-white/5 flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                        <span className="text-white text-[13px] font-black">{initials}</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-[14px] font-bold text-white truncate leading-tight">{loggedInClient.company}</p>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-medium">{loggedInClient.email}</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-2 space-y-1">
                    <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-4 py-3">Menu</p>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === '/client/orders' ? false : true}
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

                {/* Bottom */}
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
                        <span className="text-slate-400 font-medium">Business Portal</span>
                        <span className="text-slate-300 dark:text-gray-600">/</span>
                        <span className="text-slate-800 dark:text-white font-semibold">{pageTitle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <NavLink
                            to="/client/orders/new"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-lg text-[13px] font-semibold hover:bg-primary-dark transition-all shadow-sm shadow-primary/20"
                        >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            New Order
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

export default ClientLayout;
