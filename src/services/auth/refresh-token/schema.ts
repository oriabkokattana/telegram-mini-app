import { z } from 'zod';

export const RefreshTokenAPIRequestSchema = z.string().optional();

export const RefreshTokenAPIResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
