import { z } from 'zod';
import { TransactionSchema } from '../transactions/schema';

export const AssetSummaryAPIRequestSchema = z.void();

export const AssetSummaryAPIResponseSchema = z.object({
  first_purchase_date: z.number(),
  first_purchase_price: z.string(),
  recent_transactions: z.array(TransactionSchema),
  total_balance: z.string(),
  total_balance_usd: z.string(),
});
