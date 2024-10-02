import { z } from 'zod';

export const NetworksAPIRequestSchema = z.void();

export const NetworkSchema = z.object({
  available_liquidity: z.string(),
  name: z.string(),
  chain_id: z.number(),
  description: z.string(),
  is_cex: z.boolean(),
  min_deposit_usd: z.number(),
  min_withdraw_usd: z.number(),
  token_standard: z.string(),
  is_testnet: z.boolean(),
  token_min_deposit: z.number(),
  token_min_withdraw: z.number(),
  token_fee_percent: z.number(),
  processing_time_seconds: z.number(),
  confirmation_blocks: z.number(),
});

export const NetworksAPIResponseSchema = z.array(NetworkSchema);
