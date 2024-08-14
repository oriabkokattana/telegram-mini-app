import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/user-store';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { Routes } from '@/utils/routes-constants';
import { EmailPasswordAPIRequestSchema, EmailPasswordAPIResponseSchema } from './schema';

const EmailPasswordRequest = EmailPasswordAPIRequestSchema;

const EmailPasswordResponse = EmailPasswordAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

export const emailPassword = api<
  z.infer<typeof EmailPasswordRequest>,
  z.infer<typeof EmailPasswordResponse>
>({
  method: 'POST',
  path: Endpoints.EMAIL_PASSWORD,
  requestSchema: EmailPasswordRequest,
  responseSchema: EmailPasswordResponse,
  type: 'public',
});

export function useEmailPassword() {
  const navigate = useNavigate();

  const { setCredentials } = useUserStore();

  return useMutation<
    z.infer<typeof EmailPasswordAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    z.infer<typeof EmailPasswordAPIRequestSchema>
  >({
    mutationFn: (payload) => emailPassword(payload),
    onSuccess: (resp) => {
      const { accessToken, refreshToken } = resp;
      setCredentials({ accessToken, refreshToken });
      toast.success('Successfully logged in!');
      navigate(Routes.PROFILE);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.error;
      toast.error(errorMessage);
    },
  });
}
