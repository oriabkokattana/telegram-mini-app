import { z } from 'zod';

export const SwapAPIRequestSchema = z.object({
  amountA: z.number(),
  tokenA: z.string(),
  tokenB: z.string(),
});

export const SwapAPIResponseSchema = z.string();
