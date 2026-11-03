import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppShell, ShellNavItem } from './AppShell';
import { useAuthStore } from '@/stores/authStore';
import { useLogout } from '@/features/auth/hooks/useAuth';

const ROLE_LABELS: Record<string, string> = {
    super_admin: 'Super admin',
    admin: 'Admin',
    logistics_staff: 'Logistics staff',
};

// Finance and Team are admin-only on the backend (restrictTo), so hide them from logistics staff
const isAdminRole = (role?: string) => role === 'super_admin' || role === 'admin';

/** Redirects to /login unless a staff user is signed in. Wraps every admin route, including the bare waybill print page. */
export const RequireStaff: React.FC = () => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();
    if (!isAuthenticated || !user || !localStorage.getItem('auth_token')) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
    return <Outlet />;
};

const AdminLayout: React.FC = () => {
    const user = useAuthStore((s) => s.user)!;
    const { mutate: logout } = useLogout();
    const navigate = useNavigate();

    const navItems: ShellNavItem[] = [
        { to: '/admin', label: 'Overview', icon: 'space_dashboard', end: true },
        { to: '/orders', label: 'Orders', icon: 'package_2' },
        { to: '/riders', label: 'Riders', icon: 'two_wheeler' },
        { to: '/clients', label: 'Clients', icon: 'storefront' },
        ...(isAdminRole(user.role)
            ? [
                  { to: '/finance', label: 'Finance', icon: 'account_balance' },
                  { to: '/team', label: 'Team', icon: 'group' },
              ]
            : []),
    ];

    const handleSignOut = () => logout(undefined, { onSettled: () => navigate('/login') });

    return (
        <AppShell
            product="Operations"
            navItems={navItems}
            mobileNav="drawer"
            width="wide"
            user={{ name: user.name, subtitle: ROLE_LABELS[user.role] ?? user.role }}
            onSignOut={handleSignOut}
        />
    );
};

export default AdminLayout;
