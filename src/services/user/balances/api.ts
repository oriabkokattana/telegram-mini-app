import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { BalancesAPIRequestSchema, BalancesAPIResponseSchema } from './schema';

const BalancesAPIRequest = BalancesAPIRequestSchema;

const BalancesAPIResponse = BalancesAPIResponseSchema;

const getBalances = api<z.infer<typeof BalancesAPIRequest>, z.infer<typeof BalancesAPIResponse>>({
  method: 'GET',
  path: Endpoints.BALANCES,
  requestSchema: BalancesAPIRequest,
  responseSchema: BalancesAPIResponse,
  type: 'private',
});

export function useBalances() {
  return useQuery<z.infer<typeof BalancesAPIResponseSchema>, AxiosError<string>>({
    queryKey: ['profile'],
    queryFn: () => getBalances(),
  });
}
