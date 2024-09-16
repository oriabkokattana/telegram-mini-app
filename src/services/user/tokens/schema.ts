import { z } from 'zod';

export const TokensAPIRequestSchema = z.void();

export const TokenSchema = z.object({
  name: z.string(),
  popular: z.boolean(),
  precision: z.number(),
  symbol: z.string(),
});

export const TokensAPIResponseSchema = z.array(TokenSchema);
