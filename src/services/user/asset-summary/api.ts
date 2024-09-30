import { AxiosError } from 'axios';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { AssetSummaryAPIRequestSchema, AssetSummaryAPIResponseSchema } from './schema';

const AssetSummaryAPIRequest = AssetSummaryAPIRequestSchema;

const AssetSummaryAPIResponse = AssetSummaryAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getAssetSummary = api<
  z.infer<typeof AssetSummaryAPIRequest>,
  z.infer<typeof AssetSummaryAPIResponse>
>({
  method: 'GET',
  path: Endpoints.ASSET_SUMMARY,
  requestSchema: AssetSummaryAPIRequest,
  responseSchema: AssetSummaryAPIResponse,
  type: 'private',
});

export function useAssetSummary(asset?: string) {
  return useQuery<z.infer<typeof AssetSummaryAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['asset', 'summary', asset],
    queryFn: asset ? () => getAssetSummary({ query: `/${asset}` }) : skipToken,
  });
}
