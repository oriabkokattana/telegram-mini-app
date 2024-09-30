import { z } from 'zod';
import { ChartEntitySchema } from '@/services/user/balance-chart/schema';

export type ChartEntity = z.infer<typeof ChartEntitySchema>;
