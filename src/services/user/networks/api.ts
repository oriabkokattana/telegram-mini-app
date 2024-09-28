import { AxiosError } from 'axios';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { NetworksAPIRequestSchema, NetworksAPIResponseSchema } from './schema';

import { Direction } from '@/types';

const NetworksAPIRequest = NetworksAPIRequestSchema;

const NetworksAPIResponse = NetworksAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getNetworks = api<z.infer<typeof NetworksAPIRequest>, z.infer<typeof NetworksAPIResponse>>({
  method: 'GET',
  path: Endpoints.NETWORKS,
  requestSchema: NetworksAPIRequest,
  responseSchema: NetworksAPIResponse,
  type: 'public',
});

export function useNetworks(direction: Direction, token?: string) {
  return useQuery<z.infer<typeof NetworksAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['networks', direction, token],
    queryFn: token ? () => getNetworks({ query: `/${token}`, params: { direction } }) : skipToken,
  });
}
