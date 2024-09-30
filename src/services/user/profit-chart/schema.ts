import { z } from 'zod';
import { ChartEntitySchema } from '../balance-chart/schema';

export const ProfitChartAPIRequestSchema = z.void();

export const ProfitChartAPIResponseSchema = z.object({
  chard_data: z.array(ChartEntitySchema).optional(),
  total_deposit_usd: z.string(),
  total_savings_usd: z.string(),
  total_withdraw_usd: z.string(),
});
