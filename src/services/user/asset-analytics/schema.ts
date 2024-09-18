import { z } from 'zod';

export const AssetAnalyticsAPIRequestSchema = z.void();

export const AssetAnalyticsAPIResponseSchema = z.object({
  change_usd: z.number(),
  chart_data: z.record(z.string(), z.number()),
  purchase_date: z.number(),
  purchase_price: z.number(),
});
