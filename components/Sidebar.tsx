
import React from 'react';
// @ts-ignore
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavSection {
  section: string;
}

interface NavLinkItem {
  to: string;
  label: string;
  icon: string;
  highlight?: boolean;
  badge?: number;
}

type NavItem = NavSection | NavLinkItem;

const isSection = (item: NavItem): item is NavSection => {
  return 'section' in item;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems: NavItem[] = [
    { section: 'PUBLIC PORTALS' },
    { to: '/landing', label: 'Home Page', icon: 'public' },
    { to: '/track/ORD-3492', label: 'Client Tracking', icon: 'location_searching' },

    { section: 'CORE OPERATIONS' },
    { to: '/', label: 'Dashboard', icon: 'grid_view' },
    { to: '/live-voice-ops', label: 'Voice Dispatch', icon: 'mic_external_on', highlight: true },
    { to: '/dispatch-center', label: 'Live Dispatch', icon: 'distance' },
    { to: '/messages', label: 'Communications', icon: 'chat', badge: 12 },
    { to: '/orders', label: 'Order Queue', icon: 'package_2' },
    { to: '/incidents', label: 'Incident Desk', icon: 'report_problem' },
    { to: '/inventory', label: 'Inventory', icon: 'inventory_2' },
    
    { section: 'FLEET & ASSETS' },
    { to: '/drivers', label: 'Fleet Crew', icon: 'person_search' },
    { to: '/vehicles', label: 'Assets', icon: 'local_shipping' },
    { to: '/acquisition', label: 'Procurement', icon: 'shopping_cart' },
    { to: '/maintenance', label: 'Maintenance', icon: 'build' },
    { to: '/fuel', label: 'Fuel & Energy', icon: 'ev_station' },
    { to: '/sustainability', label: 'Eco Tracking', icon: 'eco' },
    
    { section: 'INTELLIGENCE' },
    { to: '/analytics', label: 'BI Analytics', icon: 'insights' },
    { to: '/route-lab', label: 'Route Lab', icon: 'query_stats' },
    { to: '/benchmarking', label: 'Network Bench', icon: 'leaderboard' },
    { to: '/reports', label: 'Data Reports', icon: 'description' },
    
    { section: 'STRATEGIC GROWTH' },
    { to: '/business-hub', label: 'Business Hub', icon: 'handshake' },
    { to: '/finance', label: 'Profit & Loss', icon: 'account_balance' },
    { to: '/clients', label: 'Client CRM', icon: 'business_center' },
    { to: '/campaigns', label: 'Campaigns', icon: 'campaign' },
    { to: '/billing', label: 'Settlements', icon: 'payments' },
    
    { section: 'HUMAN CAPITAL' },
    { to: '/team', label: 'Administration', icon: 'badge' },
    { to: '/payroll', label: 'Payroll & HR', icon: 'account_balance_wallet' },
    { to: '/marketplace', label: 'Recruitment', icon: 'group_add' },
    { to: '/training', label: 'Academy', icon: 'school' },
    
    { section: 'GOVERNANCE' },
    { to: '/hubs', label: 'Hub Network', icon: 'home_work' },
    { to: '/regions', label: 'Regions', icon: 'map' },
    { to: '/compliance', label: 'Compliance', icon: 'gavel' },
    { to: '/audit-logs', label: 'Audit Trail', icon: 'history' },
    { to: '/notifications', label: 'Notifications', icon: 'notifications' },
    { to: '/settings', label: 'Configuration', icon: 'settings' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[40] md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed inset-y-0 left-0 z-[50] w-72 bg-[#111318] text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
               <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter uppercase leading-none text-white">EcoRoute</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">Lagos Hub v4.2</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
            <div className="space-y-1">
              {navItems.map((item, idx) => {
                if (isSection(item)) {
                  return (
                    <div key={idx} className="pt-6 pb-2 px-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.section}</p>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      if (window.innerWidth < 768) onClose();
                    }}
                    className={({ isActive }: { isActive: boolean }) => `
                      flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'}
                      ${item.highlight ? 'bg-primary/10 text-primary border border-primary/20' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[22px] ${item.highlight ? 'text-primary' : ''}`}>
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-white/5 bg-white/5">
             <div className="flex items-center gap-3 p-2">
                <div className="size-10 rounded-xl bg-slate-700 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/alex/100/100')" }}></div>
                <div className="flex-1 min-w-0">
                   <p className="text-xs font-black truncate">Alex Morgan</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase truncate">Senior Dispatcher</p>
                </div>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
