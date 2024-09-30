import { AxiosError } from 'axios';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { ETimeframe } from '@/enums';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { AssetPriceChangeAPIRequestSchema, AssetPriceChangeAPIResponseSchema } from './schema';

const AssetPriceChangeAPIRequest = AssetPriceChangeAPIRequestSchema;

const AssetPriceChangeAPIResponse = AssetPriceChangeAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getAssetPriceChange = api<
  z.infer<typeof AssetPriceChangeAPIRequest>,
  z.infer<typeof AssetPriceChangeAPIResponse>
>({
  method: 'GET',
  path: Endpoints.ASSET_PRICE_CHANGE,
  requestSchema: AssetPriceChangeAPIRequest,
  responseSchema: AssetPriceChangeAPIResponse,
  type: 'public',
});

export function useAssetPriceChange(timeframe: ETimeframe, asset?: string) {
  return useQuery<z.infer<typeof AssetPriceChangeAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['asset', 'price-change', timeframe],
    queryFn: asset
      ? () => getAssetPriceChange({ query: `/${asset}`, params: { period: timeframe } })
      : skipToken,
  });
}
