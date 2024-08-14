import { z } from 'zod';

export const OAuthLoginAPIRequestSchema = z.string();

export const OAuthLoginAPIResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
