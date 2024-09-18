import { z } from 'zod';
import { SystemRateSchema } from './../services/user/system-rates/schema';

export type SystemCurrencyItem = z.infer<typeof SystemRateSchema>;
