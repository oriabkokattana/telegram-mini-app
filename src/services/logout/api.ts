import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { LogoutAPIRequestSchema, LogoutAPIResponseSchema } from '@/services/logout/schema';
import { useUserStore } from '@/store/user-store';
import { api } from '@/utils/api';
import { API_ENDPOINT } from '@/utils/endpoints-constants';
import { StorageKeys } from '@/utils/local-storage-constants';
import { Routes } from '@/utils/routes-constants';

const LogoutRequest = LogoutAPIRequestSchema;

const LogoutResponse = LogoutAPIResponseSchema;

interface ErrorResponse {
  message: string;
}

const logout = api<z.infer<typeof LogoutRequest>, z.infer<typeof LogoutResponse>>({
  method: 'POST',
  path: API_ENDPOINT.SIGN_OUT,
  requestSchema: LogoutRequest,
  responseSchema: LogoutResponse,
});

export function useLogOut() {
  const navigate = useNavigate();

  const { removeCredentials } = useUserStore();
  return useMutation<z.infer<typeof LogoutAPIResponseSchema>, AxiosError<ErrorResponse>>({
    mutationFn: logout,
    onSuccess: (data) => {
      const { message } = data;
      removeCredentials();
      window.localStorage.removeItem(StorageKeys.TOKEN);
      toast.success(message);
      navigate(Routes.AUTH);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}
