import { AxiosError } from 'axios';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { AssetAnalyticsAPIRequestSchema, AssetAnalyticsAPIResponseSchema } from './schema';

const AssetAnalyticsAPIRequest = AssetAnalyticsAPIRequestSchema;

const AssetAnalyticsAPIResponse = AssetAnalyticsAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getAssetAnalytics = api<
  z.infer<typeof AssetAnalyticsAPIRequest>,
  z.infer<typeof AssetAnalyticsAPIResponse>
>({
  method: 'GET',
  path: Endpoints.TRANSACTIONS,
  requestSchema: AssetAnalyticsAPIRequest,
  responseSchema: AssetAnalyticsAPIResponse,
  type: 'private',
});

export function useAssetAnalytics(
  period: '1h' | '24h' | '1w' | '1m' | '3m' | '1y',
  type: 'value' | 'diff',
  asset?: string
) {
  return useQuery<z.infer<typeof AssetAnalyticsAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['asset-analytics', period, type, asset],
    queryFn: asset ? () => getAssetAnalytics({ params: { period, type } }) : skipToken,
  });
}
