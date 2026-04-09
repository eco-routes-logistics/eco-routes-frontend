import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi } from '../api/team';
import toast from 'react-hot-toast';
import { User } from '@/types/user';

export const useTeamUsers = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: () => teamApi.getUsers(),
  });
};

export const useTeamUserDetails = (id: string) => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => teamApi.getUserById(id),
    enabled: !!id,
  });
};

export const useCreateTeamUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Team member created successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create team member');
    },
  });
};

export const useUpdateTeamUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => teamApi.updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      queryClient.invalidateQueries({ queryKey: ['team', variables.id] });
      toast.success('Team member updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update team member');
    },
  });
};

export const useToggleTeamUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.toggleUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Team member status updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update team member status');
    },
  });
};

export const useDeleteTeamUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Team member deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete team member');
    },
  });
};
