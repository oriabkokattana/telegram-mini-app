import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { ETimeframe } from '@/enums';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { BalancesAPIRequestSchema, BalancesAPIResponseSchema } from './schema';

const BalancesAPIRequest = BalancesAPIRequestSchema;

const BalancesAPIResponse = BalancesAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

export const getBalances = api<
  z.infer<typeof BalancesAPIRequest>,
  z.infer<typeof BalancesAPIResponse>
>({
  method: 'GET',
  path: Endpoints.BALANCES,
  requestSchema: BalancesAPIRequest,
  responseSchema: BalancesAPIResponse,
  type: 'private',
});

export function useBalances(timeframe: ETimeframe) {
  return useQuery<z.infer<typeof BalancesAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['profile', 'balances', timeframe],
    queryFn: () => getBalances({ params: { period: timeframe } }),
    refetchInterval: 10000,
  });
}
