
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Drivers from './pages/Drivers';
import Vehicles from './pages/Vehicles';
import Clients from './pages/Clients';
import Analytics from './pages/Analytics';
import Support from './pages/Support';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Waybill from './pages/Waybill';
import Onboarding from './pages/Onboarding';
import DispatchCenter from './pages/DispatchCenter';
import Hubs from './pages/Hubs';
import Profile from './pages/Profile';
import Inventory from './pages/Inventory';
import AuditLogs from './pages/AuditLogs';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Marketplace from './pages/Marketplace';
import RouteLab from './pages/RouteLab';
import Feedback from './pages/Feedback';
import Compliance from './pages/Compliance';
import Maintenance from './pages/Maintenance';
import Fuel from './pages/Fuel';
import Training from './pages/Training';
import Developer from './pages/Developer';
import Messages from './pages/Messages';
import Sustainability from './pages/Sustainability';
import Incidents from './pages/Incidents';
import Payroll from './pages/Payroll';
import Regions from './pages/Regions';
import HelpCenter from './pages/HelpCenter';
import Acquisition from './pages/Acquisition';
import Finance from './pages/Finance';
import Team from './pages/Team';
import Campaigns from './pages/Campaigns';
import Benchmarking from './pages/Benchmarking';
import Admin from './pages/Admin';
import BusinessHub from './pages/BusinessHub';
import Landing from './pages/Landing';
import Tracking from './pages/Tracking';
import LiveVoiceOps from './pages/LiveVoiceOps';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AIAssistant from './components/AIAssistant';
import CommandPalette from './components/CommandPalette';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isPrintView = location.pathname.includes('/waybill');
  const isOnboarding = location.pathname.includes('/onboarding');
  const isLanding = location.pathname === '/landing';
  const isTracking = location.pathname.includes('/track');
  const isLogin = location.pathname === '/login';
  const isFullscreen = location.pathname.includes('/dispatch-center') || 
                     location.pathname.includes('/route-lab') ||
                     location.pathname.includes('/messages') ||
                     location.pathname.includes('/live-voice-ops') ||
                     isLanding || isTracking || isLogin;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark' && !isLanding && !isTracking && !isLogin) {
      document.documentElement.classList.add('dark');
    } else if (isLanding || isTracking || isLogin) {
      // These pages forced to dark or special theme
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [location]);

  if (isPrintView) return <>{children}</>;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {!isOnboarding && !isFullscreen && (
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      )}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-background-light dark:bg-background-dark">
        {!isOnboarding && !isFullscreen && (
          <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        )}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        {!isOnboarding && !isFullscreen && <AIAssistant />}
        {!isOnboarding && !isFullscreen && <CommandPalette />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/track/:id" element={<Tracking />} />
          <Route path="/live-voice-ops" element={<LiveVoiceOps />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/fuel" element={<Fuel />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/business-hub" element={<BusinessHub />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dispatch-center" element={<DispatchCenter />} />
          <Route path="/hubs" element={<Hubs />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/team" element={<Team />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/acquisition" element={<Acquisition />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/route-lab" element={<RouteLab />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/benchmarking" element={<Benchmarking />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/training" element={<Training />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/waybill/:id" element={<Waybill />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
