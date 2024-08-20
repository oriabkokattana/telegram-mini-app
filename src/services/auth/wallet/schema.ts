import { z } from 'zod';

export const WalletAuthPayloadSchema = z.object({
  chainId: z.number(),
  comment: z.string(),
  device: z.string(),
  expired_at: z.string(),
  ip_restricted: z.boolean(),
  network: z.string(),
  wallet: z.string(),
});

export const WalletAuthAPIRequestSchema = z.object({
  payload: WalletAuthPayloadSchema,
  signature: z.string(),
});

export const WalletAuthAPIResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
