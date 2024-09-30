import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { ETimeframe } from '@/enums';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { ProfitAPIRequestSchema, ProfitAPIResponseSchema } from './schema';

const ProfitAPIRequest = ProfitAPIRequestSchema;

const ProfitAPIResponse = ProfitAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getProfit = api<z.infer<typeof ProfitAPIRequest>, z.infer<typeof ProfitAPIResponse>>({
  method: 'GET',
  path: Endpoints.PROFIT,
  requestSchema: ProfitAPIRequest,
  responseSchema: ProfitAPIResponse,
  type: 'private',
});

export function useProfit(timeframe: ETimeframe) {
  return useQuery<z.infer<typeof ProfitAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['profile', 'profit', timeframe],
    queryFn: () => getProfit({ params: { period: timeframe } }),
  });
}
