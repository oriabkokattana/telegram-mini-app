import { z } from 'zod';
import { ChartEntitySchema } from '../balance-chart/schema';

export const AssetPriceChangeAPIRequestSchema = z.void();

export const AssetPriceChangeAPIResponseSchema = z.array(ChartEntitySchema).optional();
