import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Icon } from '@/components/ui';
import { useClientAuthStore } from '@/stores/clientAuthStore';
import { useClientMe } from '../hooks/useClientAuth';
import { ACCOUNT_TYPE_LABELS } from '@/features/clients/components/ClientForms';

const navItems = [
    { to: '/client/dashboard', label: 'Home', icon: 'home' },
    // `end` so /client/orders/new highlights Book, not Orders
    { to: '/client/orders', label: 'Orders', icon: 'package_2', end: true },
    { to: '/client/orders/new', label: 'Book', icon: 'add_circle' },
    { to: '/client/payments', label: 'Payments', icon: 'account_balance_wallet' },
    { to: '/client/account', label: 'Account', icon: 'storefront' },
];

const ClientLayout: React.FC = () => {
    const { isAuthenticated, loggedInClient, logout } = useClientAuthStore();
    const { data: meData } = useClientMe();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (!isAuthenticated || !loggedInClient || !localStorage.getItem('client_token')) {
        return <Navigate to="/client/login" replace />;
    }

    const client = meData?.data?.client ?? loggedInClient;

    const handleSignOut = () => {
        logout();
        navigate('/client/login');
    };

    return (
        <AppShell
            product="Business"
            navItems={navItems}
            user={{ name: client.company, subtitle: ACCOUNT_TYPE_LABELS[client.accountType ?? ''] }}
            onSignOut={handleSignOut}
            width="medium"
            headerRight={
                pathname !== '/client/orders/new' && (
                <Link
                    to="/client/orders/new"
                    className="hidden md:inline-flex h-10 px-4 rounded-xl bg-primary text-white text-sm font-semibold items-center gap-1.5 hover:bg-primary-hover transition-colors"
                >
                    <Icon name="add" className="text-[20px]" /> New delivery
                </Link>
                )
            }
        />
    );
};

export default ClientLayout;
