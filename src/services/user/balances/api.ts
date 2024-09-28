import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useTimeframeStore } from '@/store/timeframe-store';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { BalancesAPIRequestSchema, BalancesAPIResponseSchema } from './schema';

const BalancesAPIRequest = BalancesAPIRequestSchema;

const BalancesAPIResponse = BalancesAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getBalances = api<z.infer<typeof BalancesAPIRequest>, z.infer<typeof BalancesAPIResponse>>({
  method: 'GET',
  path: Endpoints.BALANCES,
  requestSchema: BalancesAPIRequest,
  responseSchema: BalancesAPIResponse,
  type: 'private',
});

export function useBalances() {
  const timeframe = useTimeframeStore((state) => state.balanceTimeframe);
  return useQuery<z.infer<typeof BalancesAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['profile', 'balances', timeframe],
    queryFn: () => getBalances({ params: { period: timeframe } }),
    refetchInterval: 10000,
  });
}
