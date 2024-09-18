import { z } from 'zod';

export const TransactionsAPIRequestSchema = z.void();

export const TransactionSchema = z.object({
  amount: z.number(),
  is_income: z.boolean(),
  price_usd: z.number(),
  timestamp: z.number(),
});

export const TransactionsAPIResponseSchema = z.record(
  z.string(), // Currency name, e.g., "USDT"
  z.array(TransactionSchema)
);
