import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { SystemRatesAPIRequestSchema, SystemRatesAPIResponseSchema } from './schema';

const SystemRatesAPIRequest = SystemRatesAPIRequestSchema;

const SystemRatesAPIResponse = SystemRatesAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getSystemRates = api<
  z.infer<typeof SystemRatesAPIRequest>,
  z.infer<typeof SystemRatesAPIResponse>
>({
  method: 'GET',
  path: Endpoints.SYSTEM_RATES,
  requestSchema: SystemRatesAPIRequest,
  responseSchema: SystemRatesAPIResponse,
  type: 'public',
});

export function useSystemRates() {
  return useQuery<z.infer<typeof SystemRatesAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['system-rates'],
    queryFn: () => getSystemRates(),
    refetchInterval: 60000,
  });
}
