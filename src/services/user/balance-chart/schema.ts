import { z } from 'zod';

export const BalanceChartAPIRequestSchema = z.void();

export const ChartEntitySchema = z.object({ timestamp: z.number(), value: z.string() });

export const BalanceChartAPIResponseSchema = z.array(ChartEntitySchema).optional();
