import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { WithdrawAPIRequestSchema, WithdrawAPIResponseSchema } from './schema';

const WithdrawAPIRequest = WithdrawAPIRequestSchema;

const WithdrawAPIResponse = WithdrawAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const withdraw = api<z.infer<typeof WithdrawAPIRequest>, z.infer<typeof WithdrawAPIResponse>>({
  method: 'POST',
  path: Endpoints.WITHDRAW,
  requestSchema: WithdrawAPIRequest,
  responseSchema: WithdrawAPIResponse,
  type: 'private',
});

export function useWithdraw() {
  return useMutation<
    z.infer<typeof WithdrawAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    z.infer<typeof WithdrawAPIRequestSchema>
  >({
    mutationFn: (payload) => withdraw({ data: payload }),
    onSuccess: () => {
      toast.success('Withdrawl successful');
    },
    onError: (error) => {
      const errorMessage = error.response?.data.error;
      toast.error(errorMessage);
    },
  });
}
