import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import AdminLayout, { RequireStaff } from '@/components/layout/AdminLayout';

// Admin pages
import Dashboard from '@/features/dashboard/pages/Dashboard';
import Orders from '@/features/orders/pages/Orders';
import Waybill from '@/features/orders/pages/Waybill';
import Riders from '@/features/riders/pages/Riders';
import Clients from '@/features/clients/pages/Clients';
import Finance from '@/features/finance/pages/Finance';
import Team from '@/features/team/pages/Team';
import Tracking from '@/features/tracking/pages/Tracking';
import Login from '@/features/auth/pages/Login';

// Client Portal pages
import ClientLogin from '@/features/client-portal/pages/ClientLogin';
import ClientSignup from '@/features/client-portal/pages/ClientSignup';
import ClientLayout from '@/features/client-portal/components/ClientLayout';
import ClientDashboard from '@/features/client-portal/pages/ClientDashboard';
import ClientOrders from '@/features/client-portal/pages/ClientOrders';
import ClientNewOrder from '@/features/client-portal/pages/ClientNewOrder';
import ClientPayments from '@/features/client-portal/pages/ClientPayments';
import ClientAccount from '@/features/client-portal/pages/ClientAccount';

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
import SignIn from '@/pages/SignIn';

function App() {
    return (
        <ErrorBoundary>
            <Routes>
                {/* Public */}
                <Route path="/" element={<Landing />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/login" element={<Login />} />
                <Route path="/track/:id" element={<Tracking />} />

                {/* Staff console */}
                <Route element={<RequireStaff />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/riders" element={<Riders />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/finance" element={<Finance />} />
                        <Route path="/team" element={<Team />} />
                    </Route>
                    {/* Printable page, no console chrome */}
                    <Route path="/waybill/:id" element={<Waybill />} />

                    {/* Old URLs, merged into the pages above */}
                    <Route path="/analytics" element={<Navigate to="/admin" replace />} />
                    <Route path="/billing" element={<Navigate to="/finance" replace />} />
                    <Route path="/settings" element={<Navigate to="/team" replace />} />
                    <Route path="/profile" element={<Navigate to="/team" replace />} />
                </Route>

                {/* Client portal */}
                <Route path="/client/login" element={<ClientLogin />} />
                <Route path="/client/signup" element={<ClientSignup />} />
                <Route path="/client/corporate-signup" element={<Navigate to="/client/signup?type=corporate" replace />} />
                <Route path="/client" element={<ClientLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<ClientDashboard />} />
                    <Route path="orders" element={<ClientOrders />} />
                    <Route path="orders/new" element={<ClientNewOrder />} />
                    <Route path="payments" element={<ClientPayments />} />
                    <Route path="account" element={<ClientAccount />} />
                    <Route path="invoices" element={<Navigate to="/client/payments" replace />} />
                </Route>

                {/* Rider portal */}
                <Route path="/rider/login" element={<RiderLogin />} />
                <Route path="/rider/signup" element={<RiderSignup />} />
                <Route path="/rider" element={<RiderLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<RiderDashboard />} />
                    <Route path="deliveries" element={<RiderDeliveries />} />
                    <Route path="earnings" element={<RiderEarnings />} />
                    <Route path="profile" element={<RiderProfile />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </ErrorBoundary>
    );
}

export default App;
