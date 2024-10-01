import { z } from 'zod';

export const TransactionsAPIRequestSchema = z.void();

export const TransactionTypeSchema = z.enum(['deposit', 'withdraw', 'swap']);

export const TransactionStatusSchema = z.enum(['new', 'pending', 'completed']);

export const TransactionSchema = z.object({
  destination_amount: z.string().optional(),
  destination_token: z.string().optional(),
  id: z.string(),
  source_amount: z.string(),
  source_token: z.string(),
  status: TransactionStatusSchema,
  timestamp: z.number(),
  transaction_type: TransactionTypeSchema,
  tx_hash: z.string(),
  value_usd: z.string(),
});

export const TransactionsAPIResponseSchema = z.array(TransactionSchema);
