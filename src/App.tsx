import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useInitializeStores } from '@/hooks/useInitializeStores';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

// Import migrated pages
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

// Import Landing page from old location (will migrate later)
import Landing from '../pages/Landing';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Initialize stores with seed data on first load
    useInitializeStores();

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
                            {/* Public Routes */}
                            <Route path="/landing" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/track/:id" element={<Tracking />} />

                            {/* Admin Dashboard Routes */}
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/waybill/:id" element={<Waybill />} />
                            <Route path="/drivers" element={<Riders />} />
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
