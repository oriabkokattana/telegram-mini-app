import { z } from 'zod';

export const CustodialWalletAPIRequestSchema = z.void();

export const CustodialWalletAPIResponseSchema = z.object({
  address: z.string(),
});
