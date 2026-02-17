import React, { useState, useMemo } from 'react';
import { useClientStore, type Client } from '@/stores/clientStore';
import { useOrderStore } from '@/stores/orderStore';

const Clients: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient, setSelectedClient, selectedClient } = useClientStore();
  const { orders } = useOrderStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New client form state
  const [newClient, setNewClient] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
  });

  // Edit client form state
  const [editClientData, setEditClientData] = useState<Partial<Client>>({});

  // Filter clients based on search
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch =
        client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (client.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        client.phone.includes(searchQuery);

      return matchesSearch;
    });
  }, [clients, searchQuery]);

  // Generate client ID
  const generateClientId = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100);
    return `CLI-${timestamp.toString().slice(-3)}${random}`;
  };

  // Handle add client
  const handleAddClient = () => {
    if (!newClient.company || !newClient.contactName || !newClient.phone) {
      alert('Please fill in company name, contact name, and phone number');
      return;
    }

    const client: Client = {
      id: generateClientId(),
      company: newClient.company,
      contactName: newClient.contactName,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address,
      totalOrders: 0,
      activeOrders: 0,
    };

    addClient(client);
    setShowAddModal(false);
    setNewClient({
      company: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  // Handle edit client
  const handleEditClient = () => {
    if (selectedClient && editClientData) {
      updateClient(selectedClient.id, editClientData);
      setShowEditModal(false);
      setSelectedClient(null);
      setEditClientData({});
    }
  };

  // Get client's orders
  const getClientOrders = (clientName: string) => {
    return orders.filter(order => order.businessClient === clientName);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 lg:p-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Client Management</h1>
              <p className="text-sm text-slate-500 mt-1">
                {filteredClients.length} of {clients.length} business partners
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 h-10 px-6 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Client
            </button>
          </div>

          <div className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
            {/* Search Toolbar */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full lg:w-auto">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input
                  className="w-full h-10 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50"
                  placeholder="Search by company, contact, email, or phone..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Clients Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-500">
                  <span className="material-symbols-outlined text-4xl mb-2 block text-slate-300">business_center</span>
                  No clients found
                </div>
              ) : (
                filteredClients.map((client) => {
                  const clientOrders = getClientOrders(client.company);
                  const activeOrders = clientOrders.filter(o => o.status === 'In Transit' || o.status === 'Pending').length;

                  return (
                    <div
                      key={client.id}
                      className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => {
                        setSelectedClient(client);
                        setEditClientData(client);
                        setShowEditModal(true);
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[24px]">business</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{client.company}</h3>
                            <p className="text-xs text-slate-500">{client.id}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">person</span>
                          <span className="text-slate-600 dark:text-slate-400">{client.contactName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">phone</span>
                          <span className="text-slate-600 dark:text-slate-400">{client.phone}</span>
                        </div>
                        {client.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">email</span>
                            <span className="text-slate-600 dark:text-slate-400 truncate">{client.email}</span>
                          </div>
                        )}
                        {client.address && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">location_on</span>
                            <span className="text-slate-600 dark:text-slate-400 truncate">{client.address}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                          <p className="text-2xl font-black text-primary">{clientOrders.length}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Total Orders</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-black text-amber-600">{activeOrders}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Active</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1a202c] shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Client</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Company Name *</label>
                <input
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  type="text"
                  placeholder="Farmchops Ltd"
                  value={newClient.company}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Contact Person *</label>
                <input
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  type="text"
                  placeholder="John Doe"
                  value={newClient.contactName}
                  onChange={(e) => setNewClient({ ...newClient, contactName: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone Number *</label>
                <input
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Email (Optional)</label>
                <input
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  type="email"
                  placeholder="contact@farmchops.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Address (Optional)</label>
                <textarea
                  className="rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
                  rows={3}
                  placeholder="123 Business Street, Lagos"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex gap-4">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 font-bold text-sm text-slate-600 border border-slate-300 rounded-xl transition-all hover:bg-white">Cancel</button>
              <button onClick={handleAddClient} className="flex-1 py-3 font-bold text-sm text-white bg-primary rounded-xl shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark">Add Client</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && selectedClient && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => {
            setShowEditModal(false);
            setSelectedClient(null);
            setEditClientData({});
          }}></div>
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a202c] shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-gray-700">
            <div className="px-6 py-5 border-b border-[#dbdfe6] dark:border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black flex items-center gap-3">
                  Client Details <span className="text-primary font-normal">{selectedClient.id}</span>
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                  {getClientOrders(selectedClient.company).length} Total Orders
                </p>
              </div>
              <button onClick={() => {
                setShowEditModal(false);
                setSelectedClient(null);
                setEditClientData({});
              }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Edit Information</h4>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Company Name</label>
                    <input
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      type="text"
                      value={editClientData.company || ''}
                      onChange={(e) => setEditClientData({ ...editClientData, company: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Contact Person</label>
                    <input
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      type="text"
                      value={editClientData.contactName || ''}
                      onChange={(e) => setEditClientData({ ...editClientData, contactName: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                    <input
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      type="tel"
                      value={editClientData.phone || ''}
                      onChange={(e) => setEditClientData({ ...editClientData, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                    <input
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      type="email"
                      value={editClientData.email || ''}
                      onChange={(e) => setEditClientData({ ...editClientData, email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                    <textarea
                      className="rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                      rows={3}
                      value={editClientData.address || ''}
                      onChange={(e) => setEditClientData({ ...editClientData, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/20">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Order History</h4>
                {getClientOrders(selectedClient.company).length === 0 ? (
                  <p className="text-sm text-slate-500">No orders yet</p>
                ) : (
                  <div className="space-y-2">
                    {getClientOrders(selectedClient.company).slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                        <div>
                          <p className="font-bold text-sm">{order.id}</p>
                          <p className="text-xs text-slate-500">{order.customer} • {order.customerLocation}</p>
                        </div>
                        <span className="text-xs font-bold text-primary">{order.status}</span>
                      </div>
                    ))}
                    {getClientOrders(selectedClient.company).length > 5 && (
                      <p className="text-xs text-slate-500 text-center pt-2">
                        +{getClientOrders(selectedClient.company).length - 5} more orders
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-[#1a202c] flex gap-4">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this client?')) {
                    deleteClient(selectedClient.id);
                    setShowEditModal(false);
                    setSelectedClient(null);
                  }
                }}
                className="py-4 px-6 font-black text-sm text-red-700 dark:text-red-400 border-2 border-red-200 dark:border-red-800 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <span className="material-symbols-outlined">delete</span> Delete Client
              </button>
              <button
                onClick={handleEditClient}
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

export default Clients;
