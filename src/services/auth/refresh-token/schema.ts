import { z } from 'zod';

export const RefreshTokenAPIRequestSchema = z.void();

export const RefreshTokenAPIResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
