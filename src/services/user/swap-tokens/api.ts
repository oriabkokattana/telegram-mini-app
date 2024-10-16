import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { SwapTokensAPIRequestSchema, SwapTokensAPIResponseSchema } from './schema';

const SwapTokensAPIRequest = SwapTokensAPIRequestSchema;

const SwapTokensAPIResponse = SwapTokensAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

export const getSwapTokens = api<
  z.infer<typeof SwapTokensAPIRequest>,
  z.infer<typeof SwapTokensAPIResponse>
>({
  method: 'GET',
  path: Endpoints.SWAP_TOKENS,
  requestSchema: SwapTokensAPIRequest,
  responseSchema: SwapTokensAPIResponse,
  type: 'public',
});

export function useSwapTokens(token?: string) {
  return useQuery<z.infer<typeof SwapTokensAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['swap-tokens', token],
    queryFn: () => getSwapTokens({ params: { token } }),
  });
}
