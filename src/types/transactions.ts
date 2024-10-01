import { z } from 'zod';
import {
  TransactionSchema,
  TransactionStatusSchema,
  TransactionTypeSchema,
} from '@/services/user/transactions/schema';

export type TransactionItem = z.infer<typeof TransactionSchema>;

export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;
