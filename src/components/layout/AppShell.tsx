import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/ui/Icon';

export interface ShellNavItem {
    to: string;
    label: string;
    icon: string;
    /** Match this path exactly instead of as a prefix */
    end?: boolean;
}

interface ShellUser {
    name: string;
    subtitle?: string;
    avatarUrl?: string;
}

interface AppShellProps {
    /** Small label under the logo, e.g. "Rider" */
    product: string;
    navItems: ShellNavItem[];
    user?: ShellUser;
    /** Rendered at the right of the top bar on every screen size */
    headerRight?: React.ReactNode;
    onSignOut: () => void;
    /** "tabs": bottom tab bar on phones (rider, client). "drawer": hamburger menu (admin). */
    mobileNav?: 'tabs' | 'drawer';
    /** Content width: narrow for phone-first apps, medium for forms beside a summary, wide for data tables */
    width?: 'narrow' | 'medium' | 'wide';
}

export const Logo: React.FC<{ product?: string; className?: string }> = ({ product, className }) => (
    <div className={cn('flex items-center gap-2.5', className)}>
        <div className="size-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Icon name="local_shipping" filled className="text-white text-[20px]" />
        </div>
        <div className="leading-tight">
            <p className="text-[16px] font-bold text-ink">EcoRoutes</p>
            {product && <p className="text-[12px] font-medium text-ink-muted">{product}</p>}
        </div>
    </div>
);

export const Avatar: React.FC<{ name: string; url?: string; className?: string }> = ({ name, url, className }) => {
    const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    return url ? (
        <img src={url} alt="" className={cn('rounded-full object-cover bg-surface-sunken', className)} />
    ) : (
        <div className={cn('rounded-full bg-primary-subtle text-primary font-bold flex items-center justify-center', className)}>
            {initials}
        </div>
    );
};

const isActivePath = (pathname: string, item: ShellNavItem) =>
    item.end ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + '/');

/** Logo, nav links and user card; used by the desktop sidebar and the mobile drawer. */
const SidebarContent: React.FC<Pick<AppShellProps, 'product' | 'navItems' | 'user' | 'onSignOut'>> = ({ product, navItems, user, onSignOut }) => (
    <>
        <div className="px-5 h-16 flex items-center border-b border-line flex-shrink-0">
            <Logo product={product} />
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Main">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                        cn(
                            'flex items-center gap-3 px-3 h-11 rounded-xl text-[15px] font-semibold transition-colors',
                            isActive ? 'bg-primary-subtle text-primary' : 'text-ink-secondary hover:bg-surface-sunken hover:text-ink'
                        )
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Icon name={item.icon} filled={isActive} className="text-[22px]" />
                            {item.label}
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
        {user && (
            <div className="p-3 border-t border-line flex-shrink-0">
                <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar name={user.name} url={user.avatarUrl} className="size-10 text-sm" />
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink truncate">{user.name}</p>
                        {user.subtitle && <p className="text-[12px] text-ink-muted truncate">{user.subtitle}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={onSignOut}
                        aria-label="Sign out"
                        title="Sign out"
                        className="size-9 rounded-lg flex items-center justify-center text-ink-muted hover:bg-surface-sunken hover:text-danger transition-colors"
                    >
                        <Icon name="logout" className="text-[20px]" />
                    </button>
                </div>
            </div>
        )}
    </>
);

export const AppShell: React.FC<AppShellProps> = ({ product, navItems, user, headerRight, onSignOut, mobileNav = 'tabs', width = 'narrow' }) => {
    const location = useLocation();
    const current = navItems.find((n) => isActivePath(location.pathname, n));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const tabs = mobileNav === 'tabs';

    // Close the mobile drawer whenever the route changes
    useEffect(() => setDrawerOpen(false), [location.pathname]);

    return (
        <div className="min-h-[100dvh] bg-surface md:flex">
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-64 flex-shrink-0 flex-col border-r border-line bg-surface-raised h-[100dvh] sticky top-0">
                <SidebarContent product={product} navItems={navItems} user={user} onSignOut={onSignOut} />
            </aside>

            {/* Mobile drawer */}
            {!tabs && drawerOpen && (
                <div className="md:hidden fixed inset-0 z-40">
                    <button type="button" aria-label="Close menu" className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
                    <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-surface-raised flex flex-col shadow-overlay">
                        <SidebarContent product={product} navItems={navItems} user={user} onSignOut={onSignOut} />
                    </aside>
                </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col">
                {/* Top bar */}
                <header className="sticky top-0 z-20 h-16 flex items-center justify-between gap-3 px-4 md:px-8 bg-surface/90 backdrop-blur border-b border-line">
                    <div className="flex items-center gap-3 min-w-0">
                        {tabs ? (
                            <div className="md:hidden size-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                                <Icon name="local_shipping" filled className="text-white text-[20px]" />
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setDrawerOpen(true)}
                                aria-label="Open menu"
                                className="md:hidden size-10 -ml-2 rounded-lg flex items-center justify-center text-ink-secondary hover:bg-surface-sunken"
                            >
                                <Icon name="menu" className="text-[24px]" />
                            </button>
                        )}
                        {/* Rider/client pages use this as their heading; admin pages render their own PageHeader h1 */}
                        {React.createElement(tabs ? 'h1' : 'p', { className: 'text-lg font-bold text-ink truncate' }, current?.label ?? product)}
                    </div>
                    {headerRight}
                </header>

                <main
                    className={cn(
                        'flex-1 w-full mx-auto px-4 md:px-8 pt-5',
                        { narrow: 'max-w-3xl', medium: 'max-w-5xl', wide: 'max-w-7xl' }[width],
                        tabs ? 'pb-28 md:pb-10' : 'pb-10'
                    )}
                >
                    <Outlet />
                </main>
            </div>

            {/* Mobile bottom tab bar */}
            {tabs && (
                <nav aria-label="Main" className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-surface-raised border-t border-line pb-safe">
                    <div className="grid" style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    cn('flex flex-col items-center justify-center gap-0.5 h-16 text-[12px] font-semibold transition-colors', isActive ? 'text-primary' : 'text-ink-muted')
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className={cn('h-7 w-14 rounded-full flex items-center justify-center transition-colors', isActive && 'bg-primary-subtle')}>
                                            <Icon name={item.icon} filled={isActive} className="text-[22px]" />
                                        </span>
                                        {item.label}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            )}
        </div>
    );
};
