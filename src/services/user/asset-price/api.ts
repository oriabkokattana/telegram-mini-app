import { AxiosError } from 'axios';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { AssetPriceAPIRequestSchema, AssetPriceAPIResponseSchema } from './schema';

const AssetPriceAPIRequest = AssetPriceAPIRequestSchema;

const AssetPriceAPIResponse = AssetPriceAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getAssetPrice = api<
  z.infer<typeof AssetPriceAPIRequest>,
  z.infer<typeof AssetPriceAPIResponse>
>({
  method: 'GET',
  path: Endpoints.ASSET_PRICE,
  requestSchema: AssetPriceAPIRequest,
  responseSchema: AssetPriceAPIResponse,
  type: 'public',
});

export function useAssetPrice(asset?: string) {
  return useQuery<z.infer<typeof AssetPriceAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['asset', 'price', asset],
    queryFn: asset ? () => getAssetPrice({ query: `/${asset}` }) : skipToken,
  });
}
