import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import { LoginCredentials } from '@/types/user';

export const useLogin = () => {
  const loginAction = useAuthStore((state) => state.login);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (response) => {
      if (response.status === 'success' && response.data) {
        loginAction(response.data.user, response.data.token);
        queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      } else {
        toast.error(response.message || 'Login failed');
      }
    },
    // Request errors are shown inline on the login screen
  });
};

export const useLogout = () => {
  const logoutAction = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logoutAction();
      queryClient.clear(); // Clear all cached data on logout
    },
    onError: () => {
      // Even if API call fails, we should perform client-side logout
      logoutAction();
      queryClient.clear();
    },
  });
};

export const useGetMe = () => {
  const token = useAuthStore((state) => state.token);
  const updateUser = useAuthStore((state) => state.updateUser);
  const logoutAction = useAuthStore((state) => state.logout);

  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => authApi.getMe(),
    enabled: !!token, // Only fetch if we have a token
    retry: false, // Don't retry auth checks
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
