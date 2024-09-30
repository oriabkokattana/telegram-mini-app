import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { ETimeframe } from '@/enums';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { ProfitChartAPIRequestSchema, ProfitChartAPIResponseSchema } from './schema';

const ProfitChartAPIRequest = ProfitChartAPIRequestSchema;

const ProfitChartAPIResponse = ProfitChartAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getProfitChart = api<
  z.infer<typeof ProfitChartAPIRequest>,
  z.infer<typeof ProfitChartAPIResponse>
>({
  method: 'GET',
  path: Endpoints.PROFIT_CHART,
  requestSchema: ProfitChartAPIRequest,
  responseSchema: ProfitChartAPIResponse,
  type: 'private',
});

export function useProfitChart(timeframe: ETimeframe) {
  return useQuery<z.infer<typeof ProfitChartAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['profile', 'profit', timeframe],
    queryFn: () => getProfitChart({ params: { period: timeframe } }),
  });
}
