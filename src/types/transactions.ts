import { z } from 'zod';
import { TransactionSchema } from '@/services/user/transactions/schema';

export type RawTransaction = z.infer<typeof TransactionSchema>;

export type RawTransactionMapping = Record<string, RawTransaction[]>;

export type TransactionItem = { id: string; action: string; date: string; amount: number };
