import { z } from 'zod';

export const SwapTokensAPIRequestSchema = z.void();

export const SwapTokenSchema = z.object({
  name: z.string(),
  precision: z.number(),
  price_change_1h: z.string(),
  price_usd: z.string(),
  symbol: z.string(),
});

export const SwapTokensAPIResponseSchema = z.array(SwapTokenSchema);
