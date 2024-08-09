import { z } from 'zod';
import {
  RefreshTokenAPIRequestSchema,
  RefreshTokenAPIResponseSchema,
} from '@/services/refresh-token/schema';
import { api } from '@/utils/api';
import { API_ENDPOINT } from '@/utils/endpoints-constants';

const RefreshTokenRequest = RefreshTokenAPIRequestSchema;

const RefreshTokenResponse = RefreshTokenAPIResponseSchema;

export const getRefreshToken = api<
  z.infer<typeof RefreshTokenRequest>,
  z.infer<typeof RefreshTokenResponse>
>({
  method: 'GET',
  path: API_ENDPOINT.REFRESH_TOKEN,
  requestSchema: RefreshTokenRequest,
  responseSchema: RefreshTokenResponse,
  type: 'public',
});
