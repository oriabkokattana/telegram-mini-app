import { z } from 'zod';
import { api } from '@/utils/api';
import { Endpoints } from '@/utils/endpoints-constants';
import { RefreshTokenAPIRequestSchema, RefreshTokenAPIResponseSchema } from './schema';

const RefreshTokenRequest = RefreshTokenAPIRequestSchema;

const RefreshTokenResponse = RefreshTokenAPIResponseSchema;

export const getRefreshToken = api<
  z.infer<typeof RefreshTokenRequest>,
  z.infer<typeof RefreshTokenResponse>
>({
  method: 'POST',
  path: Endpoints.REFRESH_TOKEN,
  requestSchema: RefreshTokenRequest,
  responseSchema: RefreshTokenResponse,
  type: 'private',
});
