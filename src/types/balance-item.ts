import { z } from 'zod';
import { BalanceSchema } from '@/services/user/balances/schema';

export type BalanceItem = z.infer<typeof BalanceSchema>;