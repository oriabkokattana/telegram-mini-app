import { z } from 'zod';

export const OAuthLoginAPIRequestSchema = z.string();

export const OAuthLoginAPIResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
