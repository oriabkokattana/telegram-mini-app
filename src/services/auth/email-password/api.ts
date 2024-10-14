import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/user-store';
import { trackOnboardingSignUpCompleted } from '@/utils/amplitude-events';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
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
  const { setCredentials } = useUserStore();

  return useMutation<
    z.infer<typeof EmailPasswordAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    z.infer<typeof EmailPasswordAPIRequestSchema>
  >({
    mutationFn: (data) => emailPassword({ data }),
    onSuccess: (resp) => {
      const { access_token, refresh_token } = resp;
      setCredentials({ accessToken: access_token, refreshToken: refresh_token });
      toast.success('Successfully logged in!');
      trackOnboardingSignUpCompleted('Email');
    },
    onError: (error) => {
      const errorMessage = error.response?.data.error;
      toast.error(errorMessage);
    },
  });
}
