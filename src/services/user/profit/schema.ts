import { z } from 'zod';

export const ProfitAPIRequestSchema = z.void();

export const ProfitAPIResponseSchema = z.object({
  chard_data: z.array(
    z.object({
      timestamp: z.number(),
      value: z.string(),
    })
  ),
  total_deposit_usd: z.string(),
  total_savings_usd: z.string(),
  total_withdraw_usd: z.string(),
});
