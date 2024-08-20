import { z } from 'zod';

export const BalancesAPIRequestSchema = z.void();

export const BalancesAPIResponseSchema = z
  .object({
    balance: z.number(),
    token: z.string(),
  })
  .array();
