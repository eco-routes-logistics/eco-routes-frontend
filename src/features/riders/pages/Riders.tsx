
import React, { useState, useMemo } from 'react';
import { useRiderStore, type Rider } from '@/stores/riderStore';
import { useOrderStore } from '@/stores/orderStore';

const Riders: React.FC = () => {
  const { riders, addRider, updateRider, deleteRider, setSelectedRider, selectedRider } = useRiderStore();
  const { orders } = useOrderStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // New rider form state
  const [newRider, setNewRider] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: 'Motorcycle',
  });

  // Edit rider form state
  const [editRiderData, setEditRiderData] = useState<Partial<Rider>>({});

  // Filter riders based on search and status
  const filteredRiders = useMemo(() => {
    return riders.filter(rider => {
      const matchesSearch =
        rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rider.phone.includes(searchQuery) ||
        (rider.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false);

      const matchesStatus = statusFilter === 'All' || rider.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [riders, searchQuery, statusFilter]);

  // Generate rider ID
  const generateRiderId = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100);
    return `RID-${timestamp.toString().slice(-3)}${random}`;
  };

  // Handle add rider
  const handleAddRider = () => {
    if (!newRider.name || !newRider.phone) {
      alert('Please fill in name and phone number');
      return;
    }

    const rider: Rider = {
      id: generateRiderId(),
      name: newRider.name,
      phone: newRider.phone,
      email: newRider.email,
      status: 'active',
      currentOrders: 0,
      totalDeliveries: 0,
      rating: 5.0,
      vehicleType: newRider.vehicleType,
    };

    addRider(rider);
    setShowAddModal(false);
    setNewRider({
      name: '',
      phone: '',
      email: '',
      vehicleType: 'Motorcycle',
    });
  };

  // Handle edit rider
  const handleEditRider = () => {
    if (selectedRider && editRiderData) {
      updateRider(selectedRider.id, editRiderData);
      setShowEditModal(false);
      setSelectedRider(null);
      setEditRiderData({});
    }
  };

  // Toggle rider status
  const toggleRiderStatus = (riderId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateRider(riderId, { status: newStatus });
  };

  // Get rider's orders
  const getRiderOrders = (riderId: string) => {
    return orders.filter(order => order.driverId === riderId);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
      case 'busy':
        return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 lg:p-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Rider Management</h1>
              <p className="text-sm text-slate-500 mt-1">
                {filteredRiders.length} of {riders.length} riders • {riders.filter(r => r.status === 'active').length} active
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 h-10 px-6 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Rider
            </button>
          </div>

          <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
            {/* Filters Toolbar */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
                {['All', 'active', 'inactive', 'busy'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 capitalize
                      ${statusFilter === tab ? 'bg-primary text-white' : 'text-[#616f89] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
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
                    placeholder="Search by name, phone, or email..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Riders Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRiders.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-500">
                  <span className="material-symbols-outlined text-4xl mb-2 block text-slate-300">person_off</span>
                  No riders found
                </div>
              ) : (
                filteredRiders.map((rider) => (
                  <div
                    key={rider.id}
                    className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedRider(rider);
                      setEditRiderData(rider);
                      setShowEditModal(true);
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${rider.name}/100/100')` }}></div>
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{rider.name}</h3>
                          <p className="text-xs text-slate-500">{rider.id}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border ${getStatusColor(rider.status)}`}>
                        {rider.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-[18px] text-slate-400">phone</span>
                        <span className="text-slate-600 dark:text-slate-400">{rider.phone}</span>
                      </div>
                      {rider.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">email</span>
                          <span className="text-slate-600 dark:text-slate-400">{rider.email}</span>
                        </div>
                      )}
                      {rider.vehicleType && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">two_wheeler</span>
                          <span className="text-slate-600 dark:text-slate-400">{rider.vehicleType}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <p className="text-2xl font-black text-primary">{rider.currentOrders}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Active</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-slate-700 dark:text-white">{rider.totalDeliveries}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Total</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-amber-600">
                          {rider.rating.toFixed(1)}
                          <span className="material-symbols-outlined text-[16px] align-middle ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Rating</p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRiderStatus(rider.id, rider.status);
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${rider.status === 'active'
                            ? 'bg-red-50 text-red-700 hover:bg-red-100'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                      >
                        {rider.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRider(rider);
                        }}
                        className="px-4 py-2 text-xs font-bold bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all"
                      >
                        View Orders
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Rider Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1a202c] shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Rider</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name *</label>
                <input
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  type="text"
                  placeholder="John Doe"
                  value={newRider.name}
                  onChange={(e) => setNewRider({ ...newRider, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone Number *</label>
                <input
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={newRider.phone}
                  onChange={(e) => setNewRider({ ...newRider, phone: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Email (Optional)</label>
                <input
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  type="email"
                  placeholder="john@example.com"
                  value={newRider.email}
                  onChange={(e) => setNewRider({ ...newRider, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Vehicle Type</label>
                <select
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  value={newRider.vehicleType}
                  onChange={(e) => setNewRider({ ...newRider, vehicleType: e.target.value })}
                >
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Car">Car</option>
                  <option value="Van">Van</option>
                  <option value="Bicycle">Bicycle</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex gap-4">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 font-bold text-sm text-slate-600 border border-slate-300 rounded-xl transition-all hover:bg-white">Cancel</button>
              <button onClick={handleAddRider} className="flex-1 py-3 font-bold text-sm text-white bg-primary rounded-xl shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark">Add Rider</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Rider Modal */}
      {showEditModal && selectedRider && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => {
            setShowEditModal(false);
            setSelectedRider(null);
            setEditRiderData({});
          }}></div>
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a202c] shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-gray-700">
            <div className="px-6 py-5 border-b border-[#dbdfe6] dark:border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-3">
                  Rider Details <span className="text-primary font-normal">{selectedRider.id}</span>
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                  {selectedRider.totalDeliveries} Total Deliveries • {selectedRider.rating.toFixed(1)} ⭐ Rating
                </p>
              </div>
              <button onClick={() => {
                setShowEditModal(false);
                setSelectedRider(null);
                setEditRiderData({});
              }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Edit Information</h4>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      type="text"
                      value={editRiderData.name || ''}
                      onChange={(e) => setEditRiderData({ ...editRiderData, name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                    <input
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      type="tel"
                      value={editRiderData.phone || ''}
                      onChange={(e) => setEditRiderData({ ...editRiderData, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                    <input
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      type="email"
                      value={editRiderData.email || ''}
                      onChange={(e) => setEditRiderData({ ...editRiderData, email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Vehicle Type</label>
                    <select
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      value={editRiderData.vehicleType || 'Motorcycle'}
                      onChange={(e) => setEditRiderData({ ...editRiderData, vehicleType: e.target.value })}
                    >
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Car">Car</option>
                      <option value="Van">Van</option>
                      <option value="Bicycle">Bicycle</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/20">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Assigned Orders</h4>
                {getRiderOrders(selectedRider.id).length === 0 ? (
                  <p className="text-sm text-slate-500">No orders currently assigned</p>
                ) : (
                  <div className="space-y-2">
                    {getRiderOrders(selectedRider.id).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                        <div>
                          <p className="font-bold text-sm">{order.id}</p>
                          <p className="text-xs text-slate-500">{order.customer}</p>
                        </div>
                        <span className="text-xs font-bold text-primary">{order.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-[#1a202c] flex gap-4">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this rider?')) {
                    deleteRider(selectedRider.id);
                    setShowEditModal(false);
                    setSelectedRider(null);
                  }
                }}
                className="py-4 px-6 font-black text-sm text-red-700 dark:text-red-400 border-2 border-red-200 dark:border-red-800 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <span className="material-symbols-outlined">delete</span> Delete Rider
              </button>
              <button
                onClick={handleEditRider}
                className="flex-1 py-4 font-black text-sm text-white bg-primary rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:bg-primary-dark"
              >
                <span className="material-symbols-outlined">save</span> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Riders;
