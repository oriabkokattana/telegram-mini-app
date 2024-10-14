import { z } from 'zod';
import { TokenSchema } from '@/services/user/tokens/schema';

export type TokenItem = z.infer<typeof TokenSchema>;

export type WithdrawDepositToken = {
  name: string;
  symbol: string;
  precision: number;
};
