import React, { useState } from 'react';
import { Navigate, Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useClientAuthStore } from '@/stores/clientAuthStore';

const navLinks = [
    { to: '/client/dashboard', label: 'Overview', icon: 'grid_view' },
    { to: '/client/orders', label: 'Orders', icon: 'inventory_2' },
    { to: '/client/orders/new', label: 'New Order', icon: 'add_circle', highlight: true },
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
                <div className="px-5 py-5 flex items-center gap-2.5 border-b border-white/5">
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                        <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-white leading-none">EcoRoute</p>
                        <p className="text-[10px] text-white/30 font-medium mt-0.5">Business</p>
                    </div>
                </div>

                {/* Company pill */}
                <div className="mx-3 mt-4 mb-2 px-3 py-2.5 rounded-xl bg-white/5 flex items-center gap-2.5">
                    <div className="size-7 rounded-md bg-primary/80 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[11px] font-black">{initials}</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-white truncate leading-none">{loggedInClient.company}</p>
                        <p className="text-[10px] text-white/40 truncate mt-0.5">{loggedInClient.email}</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-2 space-y-0.5">
                    <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest px-3 py-2">Menu</p>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === '/client/orders' ? false : true}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${link.highlight
                                    ? isActive
                                        ? 'bg-primary text-white'
                                        : 'bg-primary/15 text-primary hover:bg-primary/25'
                                    : isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{link.icon}</span>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="px-3 pb-4 space-y-0.5 border-t border-white/5 pt-3">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
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
