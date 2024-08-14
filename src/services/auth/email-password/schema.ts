import { z } from 'zod';

export const EmailPasswordAPIRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const EmailPasswordAPIResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
