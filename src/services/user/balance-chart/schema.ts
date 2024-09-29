import { z } from 'zod';

export const BalanceChartAPIRequestSchema = z.void();

export const BalanceChartAPIResponseSchema = z.array(
  z.object({ timestamp: z.number(), value: z.string() })
);
