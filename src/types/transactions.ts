import { z } from 'zod';
import { TransactionSchema } from '@/services/user/transactions/schema';

export type TransactionItem = z.infer<typeof TransactionSchema>;
