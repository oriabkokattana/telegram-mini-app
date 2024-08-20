import { z } from 'zod';

export const RefreshTokenAPIRequestSchema = z.string().optional();

export const RefreshTokenAPIResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
