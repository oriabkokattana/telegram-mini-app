import { z } from 'zod';

export const WithdrawAPIRequestSchema = z.object({
  amount: z.number(),
  destination_address: z.string(),
  network: z.string(),
  token: z.string(),
});

export const WithdrawAPIResponseSchema = z.object({ id: z.string() });
