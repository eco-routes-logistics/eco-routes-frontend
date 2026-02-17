import React, { useState } from 'react';
import { useSettingsStore, PricingRule, DeliveryZone, SystemSettings } from '@/stores/settingsStore';

const Settings: React.FC = () => {
  const {
    pricing,
    zones,
    system,
    updatePricing,
    addZone,
    deleteZone,
    updateSystem
  } = useSettingsStore();

  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'zones' | 'vehicles'>('general');
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneFare, setNewZoneFare] = useState(1000);

  const handleAddZone = () => {
    if (newZoneName) {
      addZone({ name: newZoneName, baseFare: newZoneFare, isActive: true });
      setNewZoneName('');
      setNewZoneFare(1000);
    }
  };

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-5xl mx-auto h-full overflow-y-auto">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white uppercase tracking-tighter">System Configuration</h1>
        <p className="text-[#616f89] dark:text-gray-400 text-sm mt-1">
          Manage global pricing, delivery zones, and regional preferences.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        {(['general', 'pricing', 'zones', 'vehicles'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold capitalize transition-colors relative ${activeTab === tab
                ? 'text-primary'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
          </button>
        ))}
      </div>

      {/* Content Tab: GENERAL */}
      {activeTab === 'general' && (
        <div className="space-y-8 animate-fade-in">
          <section className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-black text-lg">Regional Settings</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">Configure the operating currency and localization for your users.</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-slate-300">public</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Operating Currency</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateSystem({ currency: 'NGN' })}
                    className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${system.currency === 'NGN'
                        ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'border-slate-200 dark:border-gray-700 hover:bg-slate-50'
                      }`}
                  >
                    <span className="text-lg">₦</span> Nigerian Naira
                  </button>
                  <button
                    onClick={() => updateSystem({ currency: 'GBP' })}
                    className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${system.currency === 'GBP'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'border-slate-200 dark:border-gray-700 hover:bg-slate-50'
                      }`}
                  >
                    <span className="text-lg">£</span> British Pound
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Date Format</label>
                <select
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-transparent font-bold text-sm"
                  value={system.dateFormat}
                  onChange={(e) => updateSystem({ dateFormat: e.target.value })}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (UK/NG)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-black text-lg">System Automation</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">Control how the platform handles automatic assignments.</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-slate-300">smart_toy</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl">
              <div>
                <p className="font-bold text-sm">AI Auto-Dispatch</p>
                <p className="text-xs text-slate-400">Automatically assign orders to nearest riders</p>
              </div>
              <div
                onClick={() => updateSystem({ autoDispatch: !system.autoDispatch })}
                className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${system.autoDispatch ? 'bg-primary' : 'bg-slate-300'}`}
              >
                <div className={`size-4 bg-white rounded-full transition-all absolute top-1 ${system.autoDispatch ? 'left-7' : 'left-1'}`}></div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Content Tab: PRICING */}
      {activeTab === 'pricing' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-black text-lg mb-6">Base Pricing Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Base Fare ({system.currency === 'NGN' ? '₦' : '£'})</label>
                <input
                  type="number"
                  value={pricing.baseFare}
                  onChange={(e) => updatePricing({ baseFare: Number(e.target.value) })}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-transparent font-black text-xl"
                />
                <p className="text-xs text-slate-400">Starting price for every delivery.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Per KM Rate ({system.currency === 'NGN' ? '₦' : '£'})</label>
                <input
                  type="number"
                  value={pricing.perKmRate}
                  onChange={(e) => updatePricing({ perKmRate: Number(e.target.value) })}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-transparent font-black text-xl"
                />
                <p className="text-xs text-slate-400">Added cost for every kilometer covering the distance.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Surge Multiplier (x)</label>
                <input
                  type="number"
                  step="0.1"
                  value={pricing.surgeMultiplier}
                  onChange={(e) => updatePricing({ surgeMultiplier: Number(e.target.value) })}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-gray-700 bg-transparent font-black text-xl text-orange-500"
                />
                <p className="text-xs text-slate-400">Peak hour price multiplier (1.0 = normal).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Tab: ZONES */}
      {activeTab === 'zones' && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-white dark:bg-[#1a202c] p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-black text-lg mb-6">Delivery Zones</h3>

            <div className="flex gap-4 mb-8 items-end bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl">
              <div className="space-y-2 flex-1">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Zone Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lekki Phase 1"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  className="w-full h-10 px-4 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-bold"
                />
              </div>
              <div className="space-y-2 w-32">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Base Fare</label>
                <input
                  type="number"
                  value={newZoneFare}
                  onChange={(e) => setNewZoneFare(Number(e.target.value))}
                  className="w-full h-10 px-4 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-bold"
                />
              </div>
              <button
                onClick={handleAddZone}
                className="h-10 px-6 bg-primary text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary-dark transition-colors"
              >
                Add Zone
              </button>
            </div>

            <div className="space-y-4">
              {zones.map(zone => (
                <div key={zone.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-gray-800 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-slate-300">map</span>
                    <div>
                      <p className="font-bold">{zone.name}</p>
                      <p className="text-xs text-slate-400">Base Fare: {system.currency === 'NGN' ? '₦' : '£'}{zone.baseFare}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteZone(zone.id)}
                    className="size-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Tab: VEHICLES */}
      {activeTab === 'vehicles' && (
        <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-[#1a202c] rounded-3xl border border-slate-200 dark:border-gray-800 border-dashed">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">local_shipping</span>
          <p className="font-bold text-slate-500">Vehicle Management</p>
          <p className="text-xs text-slate-400">Coming soon in next update</p>
        </div>
      )}
    </div>
  );
};

export default Settings;
