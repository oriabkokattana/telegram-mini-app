import { AxiosError } from 'axios';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { TokensAPIRequestSchema, TokensAPIResponseSchema } from './schema';

import { Direction } from '@/types';

const TokensAPIRequest = TokensAPIRequestSchema;

const TokensAPIResponse = TokensAPIResponseSchema;

interface ErrorResponse {
  error: string;
}

const getTokens = api<z.infer<typeof TokensAPIRequest>, z.infer<typeof TokensAPIResponse>>({
  method: 'GET',
  path: Endpoints.TOKENS,
  requestSchema: TokensAPIRequest,
  responseSchema: TokensAPIResponse,
  type: 'public',
});

export function useTokens(direction: Direction) {
  return useQuery<z.infer<typeof TokensAPIResponseSchema>, AxiosError<ErrorResponse>>({
    queryKey: ['tokens', direction],
    queryFn: () => getTokens({ params: { direction } }),
  });
}
