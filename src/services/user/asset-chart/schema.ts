import { z } from 'zod';
import { ChartEntitySchema } from '../balance-chart/schema';

export const AssetChartAPIRequestSchema = z.void();

export const AssetChartAPIResponseSchema = z.object({
  chard_data: z.array(ChartEntitySchema).optional(),
  pnl_percent: z.string(),
  pnl_usd: z.string(),
});
