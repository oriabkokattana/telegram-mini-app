import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { WithdrawAPIRequestSchema, WithdrawAPIResponseSchema } from './schema';

const WithdrawAPIRequest = WithdrawAPIRequestSchema;

const WithdrawAPIResponse = WithdrawAPIResponseSchema;

const withdraw = api<z.infer<typeof WithdrawAPIRequest>, z.infer<typeof WithdrawAPIResponse>>({
  method: 'POST',
  path: Endpoints.PROFILE,
  requestSchema: WithdrawAPIRequest,
  responseSchema: WithdrawAPIResponse,
  type: 'private',
});

export function useWithdraw() {
  return useMutation<
    z.infer<typeof WithdrawAPIResponseSchema>,
    AxiosError<string>,
    z.infer<typeof WithdrawAPIRequestSchema>
  >({
    mutationFn: (payload) => withdraw(payload),
    onSuccess: () => {
      toast.success('Withdrawl successful');
    },
    onError: (error) => {
      const errorMessage = error.response?.data;
      console.error(errorMessage);
    },
  });
}
