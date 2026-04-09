import React, { useState } from 'react';
import { User, UserRole } from '@/types/user';
import { USER_ROLES } from '@/utils/constants';
import { useTeamUsers, useCreateTeamUser, useUpdateTeamUser, useDeleteTeamUser, useToggleTeamUserStatus } from '../hooks/useTeam';

const Team: React.FC = () => {
   const { data: teamResponse, isLoading } = useTeamUsers();
   const users = teamResponse?.data?.users || [];
   
   const { mutate: createUser } = useCreateTeamUser();
   const { mutate: updateUser } = useUpdateTeamUser();
   const { mutate: deleteUser } = useDeleteTeamUser();
   const { mutate: toggleUserStatus } = useToggleTeamUserStatus();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingUser, setEditingUser] = useState<User | null>(null);
   const [searchQuery, setSearchQuery] = useState('');
   const [roleFilter, setRoleFilter] = useState<string>('All');

   // Form State
   const [formData, setFormData] = useState<Partial<User>>({
      name: '',
      email: '',
      phone: '',
      role: USER_ROLES.LOGISTICS_STAFF,
      isActive: true,
   });

   const filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      return matchesSearch && matchesRole;
   });

   const handleOpenModal = (user?: User) => {
      if (user) {
         setEditingUser(user);
         setFormData(user);
      } else {
         setEditingUser(null);
         setFormData({
            name: '',
            email: '',
            phone: '',
            role: USER_ROLES.LOGISTICS_STAFF,
            isActive: true,
         });
      }
      setIsModalOpen(true);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingUser) {
         updateUser({ id: editingUser.id, data: formData });
      } else {
         createUser(formData as any);
      }
      setIsModalOpen(false);
   };

   const roleColors: Record<string, string> = {
      [USER_ROLES.SUPER_ADMIN]: 'bg-purple-100 text-purple-700',
      [USER_ROLES.LOGISTICS_STAFF]: 'bg-blue-100 text-blue-700',
      [USER_ROLES.BUSINESS_OWNER]: 'bg-amber-100 text-amber-700',
      [USER_ROLES.RIDER]: 'bg-green-100 text-green-700',
   };

   return (
      <div className="p-6 lg:p-10 flex flex-col gap-10 max-w-7xl mx-auto overflow-y-auto h-full">
         <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
               <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Team Management</h1>
               <p className="text-[#616f89] dark:text-gray-400 text-sm mt-1">
                  Manage user roles, specialized staff, and system access permissions.
               </p>
            </div>
            <button
               onClick={() => handleOpenModal()}
               className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2"
            >
               <span className="material-symbols-outlined text-[18px]">add</span>
               Add Member
            </button>
         </header>

         {/* Filters */}
         <div className="bg-white dark:bg-[#1a202c] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
               {['All', ...Object.values(USER_ROLES)].map((role) => (
                  <button
                     key={role}
                     onClick={() => setRoleFilter(role)}
                     className={`px-4 py-2 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition-colors ${roleFilter === role
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                  >
                     {role.replace('_', ' ')}
                  </button>
               ))}
            </div>
            <div className="relative w-full sm:w-64">
               <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">search</span>
               </span>
               <input
                  type="text"
                  placeholder="Search team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50"
               />
            </div>
         </div>

         {/* Team Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
               <div key={user.id} className="bg-white dark:bg-[#1a202c] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group relative">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                     <button
                        onClick={() => handleOpenModal(user)}
                        className="size-8 rounded-lg bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors"
                     >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                     </button>
                     <button
                        onClick={() => deleteUser(user.id)}
                        className="size-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                     >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                     </button>
                  </div>

                  <div className="flex flex-col items-center text-center">
                     <div className="relative">
                        <img
                           src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                           alt={user.name}
                           className="size-20 rounded-full object-cover border-4 border-slate-50 dark:border-gray-800 mb-4"
                        />
                        <span className={`absolute bottom-4 right-0 size-4 rounded-full border-2 border-white dark:border-gray-800 ${user.isActive ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                     </div>
                     <h3 className="font-black text-lg text-slate-900 dark:text-white mb-1">{user.name}</h3>
                     <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide mb-4 ${roleColors[user.role] || 'bg-gray-100 text-gray-600'}`}>
                        {user.role.replace('_', ' ')}
                     </span>

                     <div className="w-full space-y-3 mt-2">
                        <a href={`mailto:${user.email}`} className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-400 hover:text-primary transition-colors p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800/50">
                           <span className="material-symbols-outlined text-[18px]">mail</span>
                           <span className="truncate">{user.email}</span>
                        </a>
                        <a href={`tel:${user.phone}`} className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-400 hover:text-primary transition-colors p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800/50">
                           <span className="material-symbols-outlined text-[18px]">call</span>
                           <span className="truncate">{user.phone}</span>
                        </a>
                     </div>

                     <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`mt-6 w-full py-2 rounded-xl text-xs font-bold border transition-all ${user.isActive
                              ? 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-gray-700 dark:hover:bg-gray-800'
                              : 'border-green-200 text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/10'
                           }`}
                     >
                        {user.isActive ? 'Deactivate Account' : 'Activate Account'}
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* Edit/Add Modal */}
         {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
               <div className="bg-white dark:bg-[#1a202c] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                     <h2 className="text-xl font-black">{editingUser ? 'Edit Member' : 'Add New Member'}</h2>
                     <button onClick={() => setIsModalOpen(false)} className="size-8 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                     </button>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                        <input
                           required
                           type="text"
                           value={formData.name}
                           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary/50 font-bold"
                           placeholder="e.g. John Doe"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                        <input
                           required
                           type="email"
                           value={formData.email}
                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary/50 font-bold"
                           placeholder="john@ecoroutes.com"
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                           <input
                              required
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary/50 font-bold"
                              placeholder="+234..."
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role</label>
                           <select
                              value={formData.role}
                              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-primary/50 font-bold"
                           >
                              {Object.values(USER_ROLES).map(role => (
                                 <option key={role} value={role}>{role.replace('_', ' ')}</option>
                              ))}
                           </select>
                        </div>
                     </div>

                     <div className="pt-4 flex gap-3">
                        <button
                           type="button"
                           onClick={() => setIsModalOpen(false)}
                           className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           className="flex-1 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all"
                        >
                           {editingUser ? 'Save Changes' : 'Create Member'}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default Team;
