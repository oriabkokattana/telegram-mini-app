import { z } from 'zod';

export const TransactionsAPIRequestSchema = z.void();

export const TransactionSchema = z.object({
  destination_amount: z.string(),
  destination_token: z.string(),
  id: z.string(),
  source_amount: z.string(),
  source_token: z.string(),
  status: z.enum(['new', 'pending', 'completed']),
  timestamp: z.number(),
  transaction_type: z.enum(['deposit', 'withdraw', 'swap']),
  tx_hash: z.string(),
  value_usd: z.string(),
});

export const TransactionsAPIResponseSchema = z.array(TransactionSchema);
