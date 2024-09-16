import { z } from 'zod';

export const OAuthLoginAPIRequestSchema = z.void();

export const OAuthLoginAPIResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
