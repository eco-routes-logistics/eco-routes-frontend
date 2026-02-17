import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types/user';
import { USER_ROLES } from '@/utils/constants';

interface TeamState {
  users: User[];
  isLoading: boolean;
  
  // Actions
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
}

// Seed data
const seedUsers: User[] = [
  {
    id: 'usr_1',
    name: 'Admin User',
    email: 'admin@ecoroutes.com',
    phone: '+234 800 000 0001',
    role: USER_ROLES.SUPER_ADMIN,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  },
  {
    id: 'usr_2',
    name: 'John Logistics',
    email: 'john@ecoroutes.com',
    phone: '+234 800 000 0002',
    role: USER_ROLES.LOGISTICS_STAFF,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=John+Logistics&background=random',
  },
  {
    id: 'usr_3',
    name: 'Sarah Support',
    email: 'sarah@ecoroutes.com',
    phone: '+234 800 000 0003',
    role: USER_ROLES.LOGISTICS_STAFF,
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Support&background=random',
  }
];

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      users: seedUsers,
      isLoading: false,

      addUser: (userData) => set((state) => {
        const newUser: User = {
          ...userData,
          id: `usr_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
        };
        return { users: [newUser, ...state.users] };
      }),

      updateUser: (id, updates) => set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updates, updatedAt: new Date().toISOString() } : user
        ),
      })),

      deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      })),

      toggleUserStatus: (id) => set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, isActive: !user.isActive, updatedAt: new Date().toISOString() } : user
        ),
      })),
    }),
    {
      name: 'team-storage',
    }
  )
);
