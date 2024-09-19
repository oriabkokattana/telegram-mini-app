import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useDisconnect } from 'wagmi';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/user-store';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { WalletAuthAPIRequestSchema, WalletAuthAPIResponseSchema } from './schema';

const WalletAuthRequest = WalletAuthAPIRequestSchema;

const WalletAuthResponse = WalletAuthAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

export const walletAuth = api<
  z.infer<typeof WalletAuthRequest>,
  z.infer<typeof WalletAuthResponse>
>({
  method: 'POST',
  path: Endpoints.WALLET_AUTH,
  requestSchema: WalletAuthRequest,
  responseSchema: WalletAuthResponse,
  type: 'public',
});

export function useWalletAuth() {
  const { disconnect } = useDisconnect();
  const { setCredentials } = useUserStore();

  return useMutation<
    z.infer<typeof WalletAuthAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    z.infer<typeof WalletAuthAPIRequestSchema>
  >({
    mutationFn: (data) => walletAuth({ data }),
    onSuccess: (resp) => {
      const { access_token, refresh_token } = resp;
      setCredentials({ accessToken: access_token, refreshToken: refresh_token });
      toast.success('Successfully logged in!');
    },
    onError: (error) => {
      const errorMessage = error.response?.data.error;
      toast.error(errorMessage);
      disconnect();
    },
  });
}
