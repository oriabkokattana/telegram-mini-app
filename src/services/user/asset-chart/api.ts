import { AxiosError } from 'axios';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { ETimeframe } from '@/enums';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { AssetChartAPIRequestSchema, AssetChartAPIResponseSchema } from './schema';

const AssetChartAPIRequest = AssetChartAPIRequestSchema;

const AssetChartAPIResponse = AssetChartAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getAssetChart = api<
  z.infer<typeof AssetChartAPIRequest>,
  z.infer<typeof AssetChartAPIResponse>
>({
  method: 'GET',
  path: Endpoints.ASSET_CHART,
  requestSchema: AssetChartAPIRequest,
  responseSchema: AssetChartAPIResponse,
  type: 'private',
});

export function useAssetChart(timeframe: ETimeframe, asset?: string) {
  return useQuery<z.infer<typeof AssetChartAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['asset', 'chart', timeframe],
    queryFn: asset
      ? () => getAssetChart({ query: `/${asset}`, params: { period: timeframe } })
      : skipToken,
  });
}
