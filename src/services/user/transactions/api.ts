import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { TransactionsAPIRequestSchema, TransactionsAPIResponseSchema } from './schema';

const TransactionsAPIRequest = TransactionsAPIRequestSchema;

const TransactionsAPIResponse = TransactionsAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getTransactions = api<
  z.infer<typeof TransactionsAPIRequest>,
  z.infer<typeof TransactionsAPIResponse>
>({
  method: 'GET',
  path: Endpoints.TRANSACTIONS,
  requestSchema: TransactionsAPIRequest,
  responseSchema: TransactionsAPIResponse,
  type: 'private',
});

export function useTransactions(limit?: number, lastTimestamp?: number) {
  return useQuery<z.infer<typeof TransactionsAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['transactions', limit, lastTimestamp],
    queryFn: () => getTransactions({ params: { limit, last_timestamp: lastTimestamp } }),
  });
}
