import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useInitializeStores } from '@/hooks/useInitializeStores';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

// Admin pages
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Orders from '@/features/orders/pages/Orders';
import Waybill from '@/features/orders/pages/Waybill';
import Riders from '@/features/riders/pages/Riders';
import Clients from '@/features/clients/pages/Clients';
import Analytics from '@/features/analytics/pages/Analytics';
import Finance from '@/features/finance/pages/Finance';
import Billing from '@/features/finance/pages/Billing';
import Settings from '@/features/settings/pages/Settings';
import Profile from '@/features/profile/pages/Profile';
import Team from '@/features/team/pages/Team';
import Tracking from '@/features/tracking/pages/Tracking';
import Login from '@/features/auth/pages/Login';

// Client Portal pages
import ClientLogin from '@/features/client-portal/pages/ClientLogin';
import ClientSignup from '@/features/client-portal/pages/ClientSignup';
import CorporateSignup from '@/features/client-portal/pages/CorporateSignup';
import ClientLayout from '@/features/client-portal/components/ClientLayout';
import ClientDashboard from '@/features/client-portal/pages/ClientDashboard';
import ClientOrders from '@/features/client-portal/pages/ClientOrders';
import ClientNewOrder from '@/features/client-portal/pages/ClientNewOrder';
import ClientInvoices from '@/features/client-portal/pages/ClientInvoices';

// Rider Portal pages
import RiderLogin from '@/features/rider-portal/pages/RiderLogin';
import RiderSignup from '@/features/rider-portal/pages/RiderSignup';
import RiderLayout from '@/features/rider-portal/components/RiderLayout';
import RiderDashboard from '@/features/rider-portal/pages/RiderDashboard';
import RiderDeliveries from '@/features/rider-portal/pages/RiderDeliveries';
import RiderEarnings from '@/features/rider-portal/pages/RiderEarnings';
import RiderProfile from '@/features/rider-portal/pages/RiderProfile';

// Public landing page
import Landing from '@/pages/Landing';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Initialize stores with seed data on first load
    useInitializeStores();

    // Client portal routes get their own layout
    // Fix: Ensure we don't match /clients (admin route) by checking for /client/ or exact /client
    const isClientPortal = location.pathname.startsWith('/client/') || location.pathname === '/client';

    // Rider portal routes get their own layout
    const isRiderPortal = location.pathname.startsWith('/rider/') || location.pathname === '/rider';

    // Public pages (no admin chrome)
    const isPublicPage = location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/landing';

    if (isClientPortal) {
        return (
            <ErrorBoundary>
                <Routes>
                    <Route path="/client/login" element={<ClientLogin />} />
                    <Route path="/client/signup" element={<ClientSignup />} />
                    <Route path="/client/corporate-signup" element={<CorporateSignup />} />
                    <Route path="/client" element={<ClientLayout />}>
                        <Route path="dashboard" element={<ClientDashboard />} />
                        <Route path="orders" element={<ClientOrders />} />
                        <Route path="orders/new" element={<ClientNewOrder />} />
                        <Route path="invoices" element={<ClientInvoices />} />
                    </Route>
                </Routes>
            </ErrorBoundary>
        );
    }

    if (isRiderPortal) {
        return (
            <ErrorBoundary>
                <Routes>
                    <Route path="/rider/login" element={<RiderLogin />} />
                    <Route path="/rider/signup" element={<RiderSignup />} />
                    <Route path="/rider" element={<RiderLayout />}>
                        <Route path="dashboard" element={<RiderDashboard />} />
                        <Route path="deliveries" element={<RiderDeliveries />} />
                        <Route path="earnings" element={<RiderEarnings />} />
                        <Route path="profile" element={<RiderProfile />} />
                    </Route>
                </Routes>
            </ErrorBoundary>
        );
    }

    if (isPublicPage) {
        return (
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </ErrorBoundary>
        );
    }

    return (
        <ErrorBoundary>
            <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto">
                        <Routes>
                            <Route path="/track/:id" element={<Tracking />} />

                            {/* Admin Dashboard Routes */}
                            <Route path="/admin" element={<Dashboard />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/waybill/:id" element={<Waybill />} />
                            <Route path="/riders" element={<Riders />} />
                            <Route path="/clients" element={<Clients />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/finance" element={<Finance />} />
                            <Route path="/billing" element={<Billing />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/team" element={<Team />} />

                            {/* Fallback */}
                            <Route path="*" element={<Dashboard />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default App;

