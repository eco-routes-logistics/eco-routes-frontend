
import React from 'react';
// @ts-ignore - Fixing "no exported member" errors which occur in some TypeScript environments with react-router-dom
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/') return <span className="text-[#111318] dark:text-white">Dashboard Overview</span>;
    if (path === '/orders') return (
      <div className="flex items-center gap-2">
        <span>Orders</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-[#111318] dark:text-white">Management</span>
      </div>
    );
    if (path === '/riders') return (
      <div className="flex items-center gap-2">
        <span>Fleet</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-[#111318] dark:text-white">Driver Management</span>
      </div>
    );
    if (path === '/billing') return <span className="text-[#111318] dark:text-white">Settlements & Billing</span>;
    if (path === '/settings') return <span className="text-[#111318] dark:text-white">Configuration</span>;
    return <span>EcoRoute</span>;
  };

  return (
    <header className="bg-white dark:bg-[#1a202c] border-b border-[#f0f2f4] dark:border-gray-800 h-16 flex items-center justify-between px-6 lg:px-8 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-[#616f89] dark:text-gray-400 p-1">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center gap-2 text-[#616f89] dark:text-gray-400 text-sm font-medium">
          {getBreadcrumbs()}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-[11px] font-bold border border-green-200 dark:border-green-800 uppercase tracking-tight">
          <span className="block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Live Ops
        </div>
        <button className="relative p-2 text-[#616f89] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-gray-800 rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a202c]"></span>
        </button>
        <button className="p-2 text-[#616f89] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-gray-800 rounded-full transition-colors">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
