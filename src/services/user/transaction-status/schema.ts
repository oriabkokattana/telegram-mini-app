import { z } from 'zod';
import { TransactionStatusSchema } from '../transactions/schema';

export const TransactionStatusAPIRequestSchema = z.void();

export const TransactionStatusAPIResponseSchema = z.object({
  status: TransactionStatusSchema,
  tx_hash: z.string().optional(),
});
