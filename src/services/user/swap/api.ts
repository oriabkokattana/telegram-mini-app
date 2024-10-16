import { AxiosError } from 'axios';
import Big from 'big.js';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useTradingStore } from '@/store/trading-store';
import { trackTokenSwapped } from '@/utils/amplitude-events';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { SwapAPIRequestSchema, SwapAPIResponseSchema } from './schema';

const SwapAPIRequest = SwapAPIRequestSchema;

const SwapAPIResponse = SwapAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const swap = api<z.infer<typeof SwapAPIRequest>, z.infer<typeof SwapAPIResponse>>({
  method: 'POST',
  path: Endpoints.SWAP,
  requestSchema: SwapAPIRequest,
  responseSchema: SwapAPIResponse,
  type: 'private',
});

export function useSwap() {
  const setBaseAmount = useTradingStore((state) => state.setBaseAmount);
  const setQuoteAmount = useTradingStore((state) => state.setQuoteAmount);

  return useMutation<
    z.infer<typeof SwapAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    z.infer<typeof SwapAPIRequestSchema>
  >({
    mutationFn: (payload) => swap({ data: payload }),
    onSuccess: (_, payload) => {
      trackTokenSwapped(payload.tokenA, payload.tokenB, Big(payload.amountA).toNumber());
      setBaseAmount('');
      setQuoteAmount('');
    },
    onError: (error) => {
      const errorMessage = error.response?.data.error;
      toast.error(errorMessage);
    },
  });
}
