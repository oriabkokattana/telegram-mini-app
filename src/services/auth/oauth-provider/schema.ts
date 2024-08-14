import { z } from 'zod';

export const OAuthProviderAPIRequestSchema = z.void();

export const OAuthProviderAPIResponseSchema = z.object({
  redirect_url: z.string(),
});
