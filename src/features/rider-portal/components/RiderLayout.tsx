import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppShell, Avatar } from '@/components/layout/AppShell';
import { StatusBadge } from '@/components/ui';
import { useRiderAuthStore } from '@/stores/riderAuthStore';
import { useRiderMe } from '../hooks/useRiderAuth';

const navItems = [
    { to: '/rider/dashboard', label: 'Home', icon: 'home' },
    { to: '/rider/deliveries', label: 'Jobs', icon: 'two_wheeler' },
    { to: '/rider/earnings', label: 'Earnings', icon: 'account_balance_wallet' },
    { to: '/rider/profile', label: 'Profile', icon: 'person' },
];

const RiderLayout: React.FC = () => {
    const { isAuthenticated, loggedInRider, logout } = useRiderAuthStore();
    const { data: meData } = useRiderMe();
    const navigate = useNavigate();

    if (!isAuthenticated || !loggedInRider || !localStorage.getItem('rider_token')) {
        return <Navigate to="/rider/login" replace />;
    }

    // Prefer fresh server data; fall back to what we stored at login
    const rider = meData?.data?.rider ?? loggedInRider;

    const handleSignOut = () => {
        logout();
        navigate('/rider/login');
    };

    return (
        <AppShell
            product="Rider"
            navItems={navItems}
            user={{ name: rider.name, subtitle: rider.vehicleType, avatarUrl: rider.passportPhotoUrl }}
            onSignOut={handleSignOut}
            headerRight={
                <div className="flex items-center gap-3">
                    <StatusBadge status={rider.status} kind="rider" dot />
                    <Avatar name={rider.name} url={rider.passportPhotoUrl} className="md:hidden size-9 text-[13px]" />
                </div>
            }
        />
    );
};

export default RiderLayout;
