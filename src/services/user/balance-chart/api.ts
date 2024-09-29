import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useTimeframeStore } from '@/store/timeframe-store';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { BalanceChartAPIRequestSchema, BalanceChartAPIResponseSchema } from './schema';

const BalanceChartAPIRequest = BalanceChartAPIRequestSchema;

const BalanceChartAPIResponse = BalanceChartAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getBalanceChart = api<
  z.infer<typeof BalanceChartAPIRequest>,
  z.infer<typeof BalanceChartAPIResponse>
>({
  method: 'GET',
  path: Endpoints.BALANCE_CHART,
  requestSchema: BalanceChartAPIRequest,
  responseSchema: BalanceChartAPIResponse,
  type: 'private',
});

export function useBalanceChart() {
  const timeframe = useTimeframeStore((state) => state.balanceTimeframe);
  return useQuery<z.infer<typeof BalanceChartAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['profile', 'balance-chart', timeframe],
    queryFn: () => getBalanceChart({ params: { period: timeframe } }),
  });
}
