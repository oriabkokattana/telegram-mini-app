import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/user-store';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { Routes } from '@/utils/routes-constants';
import { LogoutAPIRequestSchema, LogoutAPIResponseSchema } from './schema';

const LogoutRequest = LogoutAPIRequestSchema;

const LogoutResponse = LogoutAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const logout = api<z.infer<typeof LogoutRequest>, z.infer<typeof LogoutResponse>>({
  method: 'POST',
  path: Endpoints.LOGOUT,
  requestSchema: LogoutRequest,
  responseSchema: LogoutResponse,
});

export function useLogout() {
  const navigate = useNavigate();

  const { user, removeCredentials } = useUserStore();

  return useMutation<z.infer<typeof LogoutAPIResponseSchema>, AxiosError<ErrorResponse>>({
    mutationFn: () => logout(user?.refreshToken, true),
    onSuccess: (success) => {
      if (success) {
        removeCredentials();
        navigate(Routes.AUTH);
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data.error;
      toast.error(errorMessage);
    },
  });
}