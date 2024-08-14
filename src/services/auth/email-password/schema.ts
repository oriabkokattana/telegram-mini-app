import { z } from 'zod';

export const EmailPasswordAPIRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const EmailPasswordAPIResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
