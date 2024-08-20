import { z } from 'zod';

export const WithdrawAPIRequestSchema = z.object({
  amount: z.number(),
  token: z.string(),
  wallet: z.string(),
});

export const WithdrawAPIResponseSchema = z.string();
