import { z } from 'zod';

export const SystemRatesAPIRequestSchema = z.void();

export const SystemRateSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  precision: z.number(),
  popular: z.boolean(),
  slug: z.string(),
  price_usd: z.number(),
});

export const SystemRatesAPIResponseSchema = z.record(z.string(), SystemRateSchema);
