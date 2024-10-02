import { AxiosError } from 'axios';
import { z } from 'zod';
import { skipToken, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { TransactionStatusAPIRequestSchema, TransactionStatusAPIResponseSchema } from './schema';

const TransactionStatusAPIRequest = TransactionStatusAPIRequestSchema;

const TransactionStatusAPIResponse = TransactionStatusAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getTransactionStatus = api<
  z.infer<typeof TransactionStatusAPIRequest>,
  z.infer<typeof TransactionStatusAPIResponse>
>({
  method: 'GET',
  path: Endpoints.TRANSACTION_STATUS,
  requestSchema: TransactionStatusAPIRequest,
  responseSchema: TransactionStatusAPIResponse,
  type: 'private',
});

export function useTransactionStatus(type: 'deposit' | 'withdraw' | 'swap', id?: string) {
  return useQuery<z.infer<typeof TransactionStatusAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['transaction', 'status', id, type],
    queryFn: id ? () => getTransactionStatus({ params: { id, type } }) : skipToken,
    refetchInterval: (data) => (data.state.data?.status === 'completed' ? false : 3000),
  });
}
