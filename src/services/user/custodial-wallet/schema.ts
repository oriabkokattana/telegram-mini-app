import { z } from 'zod';

export const CustodialWalletAPIRequestSchema = z.void();

export const CustodialWalletAPIResponseSchema = z.object({
  address: z.string(),
  balances: z
    .object({
      balance: z.number(),
      token: z.string(),
    })
    .array()
    .optional(),
});
