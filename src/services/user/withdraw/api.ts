import { AxiosError } from 'axios';
import Big from 'big.js';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { trackFundsWithdrawn } from '@/utils/amplitude-events';
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
    onSuccess: (_, payload) => {
      trackFundsWithdrawn(payload.token, payload.network, Big(payload.amount).toNumber());
    },
    onError: (error) => {
      const errorMessage = error.response?.data.error;
      toast.error(errorMessage);
    },
  });
}
