import { z } from 'zod';

export const AssetPriceAPIRequestSchema = z.void();

export const AssetPriceAPIResponseSchema = z.object({
  price_change_1h: z.string(),
  price_usd: z.string(),
});
