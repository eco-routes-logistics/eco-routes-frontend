
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
// @ts-ignore - Fixing "no exported member" errors which occur in some TypeScript environments with react-router-dom
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const mockOrders: Order[] = [
    { id: 'ORD-3492', customer: 'Acme Corp', customerLocation: 'Springfield, IL', businessClient: 'Farmchops', status: OrderStatus.DELIVERED, driver: 'Mike Ross', date: 'Oct 24, 2023', weight: '5kg', value: '₦12,500' },
    { id: 'ORD-3493', customer: 'Globex Inc.', customerLocation: 'Shelbyville, IL', businessClient: 'TechSource', status: OrderStatus.IN_TRANSIT, driver: 'Sarah Connor', date: 'Oct 24, 2023', weight: '2kg', value: '₦8,000' },
    { id: 'ORD-3494', customer: 'Stark Industries', customerLocation: 'New York, NY', businessClient: 'LogiTech', status: OrderStatus.PENDING, date: 'Oct 25, 2023', weight: '10kg', value: '₦50,000' },
    { id: 'ORD-3495', customer: 'Wayne Enterprises', customerLocation: 'Gotham City', businessClient: 'UrbanMove', status: OrderStatus.IN_TRANSIT, driver: 'Bruce Banner', date: 'Oct 25, 2023', weight: '1.5kg', value: '₦12,500' },
    { id: 'ORD-3496', customer: 'Cyberdyne Systems', customerLocation: 'Sunnyvale, CA', businessClient: 'Farmchops', status: OrderStatus.CANCELLED, date: 'Oct 23, 2023', weight: '3.2kg', value: '₦15,000' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 lg:p-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Order Management</h1>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 h-10 px-6 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Order
            </button>
          </div>

          <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
            {/* Filters Toolbar */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
                {['All', 'Pending', 'In Transit', 'Completed', 'Cancelled'].map((tab) => (
                  <button 
                    key={tab}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200
                      ${tab === 'All' ? 'bg-primary text-white' : 'text-[#616f89] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </span>
                  <input 
                    className="w-full h-10 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50" 
                    placeholder="Filter by ID or client..." 
                    type="text" 
                  />
                </div>
                <button className="h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  <span className="hidden md:inline">Date</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb] dark:bg-gray-800/50 border-b border-[#e5e7eb] dark:border-gray-700">
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Order ID</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Customer</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Client</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Driver</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400">Date</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {mockOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors cursor-pointer group"
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <td className="py-4 px-6 font-bold text-primary text-sm group-hover:underline">{order.id}</td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-bold">{order.customer}</div>
                        <div className="text-xs text-[#616f89] dark:text-gray-500">{order.customerLocation}</div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium">{order.businessClient}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border
                          ${order.status === OrderStatus.DELIVERED ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400' : ''}
                          ${order.status === OrderStatus.IN_TRANSIT ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400' : ''}
                          ${order.status === OrderStatus.PENDING ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400' : ''}
                          ${order.status === OrderStatus.CANCELLED ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400' : ''}
                        `}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {order.driver ? (
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${order.driver}/100/100')` }}></div>
                            <span className="text-sm font-medium">{order.driver}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-[#616f89]">{order.date}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 text-[#616f89] hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/20">
              <span className="text-xs text-slate-500">Showing 5 of 124 results</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-xs font-bold disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1 rounded bg-primary text-white text-xs font-bold">1</button>
                <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-xs font-bold">2</button>
                <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-xs font-bold">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creation Modal (Sidebar Style) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1a202c] shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold">Create New Order</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
               <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase text-primary tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    Pickup Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Pickup Location</label>
                      <select className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm">
                        <option>EcoRoute Warehouse (Main)</option>
                        <option>EcoRoute Sub-hub (South)</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Contact Name</label>
                        <input className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm" type="text" placeholder="John" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Contact Phone</label>
                        <input className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm" type="tel" placeholder="+234" />
                      </div>
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase text-primary tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                    Delivery Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Customer Name</label>
                      <input className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm" type="text" placeholder="Full name" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                      <input className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm" type="text" placeholder="123 Street, City" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Nearest Landmark</label>
                      <input className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm" type="text" placeholder="Zenith Bank branch" />
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase text-primary tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                    Package Specs
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Weight (KG)</label>
                      <input className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm" type="number" placeholder="5.0" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Package Type</label>
                      <select className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm">
                        <option>Document</option>
                        <option>Small Box</option>
                        <option>Large Crate</option>
                      </select>
                    </div>
                  </div>
               </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex gap-4">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 font-bold text-sm text-slate-600 border border-slate-300 rounded-xl transition-all hover:bg-white">Cancel</button>
              <button className="flex-1 py-3 font-bold text-sm text-white bg-primary rounded-xl shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark">Create Order</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail View Overlay */}
      {selectedOrderId && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedOrderId(null)}></div>
          <div className="relative w-full max-w-4xl bg-white dark:bg-[#1a202c] shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-gray-700">
            <div className="px-6 py-5 border-b border-[#dbdfe6] dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-[#1a202c] z-10">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-3">
                  Order Details <span className="text-primary font-normal">{selectedOrderId}</span>
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Express Shipment • Created 2h ago</p>
              </div>
              <button onClick={() => setSelectedOrderId(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Map Placeholder */}
              <div className="relative h-64 bg-slate-200 dark:bg-gray-800 overflow-hidden group">
                 <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://picsum.photos/seed/map/1200/400')" }}></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="size-10 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                      <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                    <div className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight shadow">Current Location</div>
                 </div>
              </div>

              <div className="p-8 space-y-10">
                {/* Progress Tracker */}
                <div className="relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
                  <div className="relative z-10 flex justify-between">
                    {['Placed', 'Assigned', 'In Transit', 'Arrived', 'Delivered'].map((step, i) => (
                      <div key={step} className="flex flex-col items-center gap-2">
                        <div className={`size-8 rounded-full flex items-center justify-center border-4 border-white dark:border-[#1a202c] ring-2 ring-transparent
                          ${i < 3 ? 'bg-green-500 text-white ring-green-500/20' : i === 3 ? 'bg-primary text-white animate-pulse shadow-lg shadow-primary/40 ring-primary/20' : 'bg-gray-300 dark:bg-gray-700 text-white'}
                        `}>
                          <span className="material-symbols-outlined text-[16px]">{i < 3 ? 'check' : i === 3 ? 'local_shipping' : 'inventory_2'}</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider ${i < 3 ? 'text-green-600' : i === 3 ? 'text-primary' : 'text-slate-400'}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Pickup Point</h4>
                    <p className="text-lg font-black leading-tight mb-2">EcoRoute Hub #02</p>
                    <p className="text-sm text-slate-500 mb-4">Warehouse A12, Industrial Way, Lagos Mainland</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary">
                      <span className="material-symbols-outlined text-[18px]">person</span>
                      Dispatcher: Michael C. (0801...)
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Delivery Point</h4>
                    <p className="text-lg font-black leading-tight mb-2">Mrs. Adeola O.</p>
                    <p className="text-sm text-slate-500 mb-4">15 Admiralty Way, Lekki Phase 1, Lagos</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      OTP Verification Required
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="size-16 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-4xl">inventory_2</span>
                      </div>
                      <div>
                        <p className="text-lg font-black">5kg Premium Parboiled Rice</p>
                        <p className="text-sm text-slate-500 font-medium">Box #B-928 • Declared Value: ₦12,500</p>
                      </div>
                   </div>
                   <div className="text-center md:text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Security OTP</p>
                      <p className="text-4xl font-mono font-black text-primary tracking-widest">7492</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-[#1a202c] flex gap-4 no-print">
               <Link to={`/waybill/${selectedOrderId}`} className="flex-1 py-4 font-black text-sm text-slate-700 dark:text-white border-2 border-slate-200 dark:border-gray-700 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50">
                  <span className="material-symbols-outlined">print</span> Print Waybill
               </Link>
               <button className="flex-1 py-4 font-black text-sm text-white bg-primary rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:bg-primary-dark">
                  <span className="material-symbols-outlined">call</span> Contact Driver
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
